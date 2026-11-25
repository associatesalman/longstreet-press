import { CONSENT_STATEMENT, HONEYPOT_FIELD, validateInquiry } from "../src/lib/inquiry.js";
import {
  acceptedBy,
  clientIp,
  createLogger,
  createRateLimiter,
  createSmtpTransport,
  escapeHtml,
  missingEnv,
  recipients,
  sender,
  sendJson,
} from "./mail.js";

/**
 * POST /api/inquiry: validates a Book Marketing inquiry and emails it over SMTP to
 * every internal recipient (CONTACT_RECIPIENT_EMAIL), From "Longstreet Press" <CONTACT_FROM_EMAIL>, with the
 * visitor's validated address as Reply-To. Runs only on the server (Node), mounted
 * by server/index.js in production and by vite.config.js in dev/preview.
 *
 * Responses (JSON): 200 { ok: true } only after the provider accepted the message;
 * otherwise { ok: false, error } with 4xx/5xx. No provider details are returned.
 */

const MAX_BODY_BYTES = 16 * 1024;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;

/** Factory so tests can inject a mock transport; production uses SMTP. */
export function createInquiryHandler({
  transport = createSmtpTransport,
  rateLimited = createRateLimiter(RATE_MAX, RATE_WINDOW_MS),
  log = createLogger("inquiry"),
} = {}) {
  async function processRequest(req) {
    if (req.method !== "POST") return { status: 405, body: { ok: false, error: "method" }, headers: { Allow: "POST" } };
    if (!String(req.headers["content-type"] ?? "").startsWith("application/json")) {
      return { status: 415, body: { ok: false, error: "content-type" } };
    }

    const retryAfter = rateLimited(clientIp(req));
    if (retryAfter) {
      return { status: 429, body: { ok: false, error: "rate-limit" }, headers: { "Retry-After": String(retryAfter) } };
    }

    const raw = await readBody(req);
    if (raw === null) return { status: 413, body: { ok: false, error: "too-large" } };

    let input;
    try {
      input = JSON.parse(raw);
    } catch {
      return { status: 400, body: { ok: false, error: "invalid-json" } };
    }

    // Bots fill every field; people never see this one. Accept quietly and send nothing.
    const honeypot = input && typeof input === "object" ? input[HONEYPOT_FIELD] : undefined;
    if (typeof honeypot === "string" && honeypot.trim()) {
      log("honeypot triggered; inquiry discarded");
      return { status: 200, body: { ok: true } };
    }

    const { values, errors } = validateInquiry(input);
    if (Object.keys(errors).length) return { status: 422, body: { ok: false, error: "validation", errors } };

    const missing = missingEnv();
    if (missing.length) {
      log(`email is not configured; missing ${missing.join(", ")}`);
      return { status: 503, body: { ok: false, error: "unavailable" } };
    }

    const to = recipients();
    try {
      const info = await transport().sendMail({
        from: sender(),
        to,
        replyTo: { name: values.contactName, address: values.email },
        subject: `New Book Marketing inquiry: ${values.authorOrPublisher} (${values.contactName})`,
        text: emailText(values),
        html: emailHtml(values),
      });
      // Success only when the provider accepted the message for every recipient.
      if (!acceptedBy(info, to)) {
        log("provider did not accept the message");
        return { status: 502, body: { ok: false, error: "delivery" } };
      }
      return { status: 200, body: { ok: true } };
    } catch (error) {
      log("delivery failed", error);
      return { status: 502, body: { ok: false, error: "delivery" } };
    }
  }

  return async function handleInquiry(req, res) {
    const result = await processRequest(req).catch((error) => {
      log("unexpected error", error);
      return { status: 500, body: { ok: false, error: "server" } };
    });
    sendJson(res, result);
  };
}

export const handleInquiry = createInquiryHandler();

// ------------------------------------------------------------------ email

const NOT_SPECIFIED = "Not specified";

/** Every field on the form, labeled as it appears to the visitor. */
export function emailRows(v) {
  return [
    ["Author or Press Name", v.authorOrPublisher],
    ["Lead Contact Name", v.contactName],
    ["Email Address", v.email],
    ["Amazon ASIN, ISBN, or Book URL", v.amazonLinkOrAsin || "Not provided (optional)"],
    ["Target Marketplace", v.targetMarket || NOT_SPECIFIED],
    ["Primary Service Requirement", v.primaryService || NOT_SPECIFIED],
    ["Estimated Monthly Promotion Budget", v.monthlyBudget || NOT_SPECIFIED],
    ["Consent", v.termsAccepted ? `Confirmed: "${CONSENT_STATEMENT}"` : "Not confirmed"],
  ];
}

export function emailText(v, submitted = new Date()) {
  return [
    "New Book Marketing inquiry from the Longstreet Press website",
    "",
    ...emailRows(v).map(([label, value]) => `${label}: ${value}`),
    "",
    "Book Details and Campaign Objectives:",
    v.campaignNotes,
    "",
    `Submitted: ${submitted.toUTCString()}`,
    "Reply to this email to answer the visitor directly.",
  ].join("\n");
}

export function emailHtml(v, submitted = new Date()) {
  const cell = "padding:8px 12px;border-bottom:1px solid #e3d7c5;vertical-align:top;text-align:left";
  const table = emailRows(v)
    .map(
      ([label, value]) =>
        `<tr><th style="${cell};width:200px;color:#5a4a3f">${escapeHtml(label)}</th><td style="${cell}">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#241a15;max-width:680px">
<h1 style="font-size:20px;margin:0 0 16px">New Book Marketing inquiry from the Longstreet Press website</h1>
<table style="border-collapse:collapse;width:100%">${table}</table>
<h2 style="font-size:16px;margin:24px 0 8px">Book Details and Campaign Objectives</h2>
<p style="white-space:pre-wrap;margin:0;line-height:1.5">${escapeHtml(v.campaignNotes)}</p>
<p style="margin:24px 0 0;color:#5a4a3f;font-size:13px">Submitted ${escapeHtml(submitted.toUTCString())}. Reply to this email to answer the visitor directly.</p>
</div>`;
}

// ------------------------------------------------------------------ request helpers

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let tooLarge = false;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) tooLarge = true;
      else chunks.push(chunk);
    });
    req.on("end", () => resolve(tooLarge ? null : Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}
