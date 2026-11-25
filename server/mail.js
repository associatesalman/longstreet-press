import nodemailer from "nodemailer";

/**
 * Server-only email helpers: SMTP transport, sender, JSON responses, client IP,
 * rate limiting and privacy-safe logging. SMTP credentials come from environment
 * variables and never reach the browser (they are never VITE_ prefixed and this
 * folder is never imported by src/).
 */

/** Sender display name on every inquiry email. */
export const SENDER_NAME = "Longstreet Press";

/**
 * Internal inbox for Book Marketing inquiries. Fixed on the server; the browser
 * never supplies or sees it. CONTACT_RECIPIENT_EMAIL may override it per deployment
 * with one address or a comma-separated list.
 */
export const DEFAULT_RECIPIENT = "associatesalman@gmail.com";

/** Variables that must be set before an email can be sent. */
export const REQUIRED_ENV = ["CONTACT_FROM_EMAIL", "SMTP_HOST", "SMTP_USER", "SMTP_PASS"];

/** Recipient addresses from CONTACT_RECIPIENT_EMAIL (comma/semicolon separated, de-duplicated), or the default. */
export function recipients() {
  const seen = new Set();
  const list = String(process.env.CONTACT_RECIPIENT_EMAIL ?? "")
    .split(/[,;]/)
    .map((address) => address.trim())
    .filter((address) => address && !seen.has(address.toLowerCase()) && seen.add(address.toLowerCase()));
  return list.length ? list : [DEFAULT_RECIPIENT];
}

export function sender() {
  return { name: SENDER_NAME, address: process.env.CONTACT_FROM_EMAIL.trim() };
}

/** Names of the given variables that are missing or blank. */
export const missingEnv = (names = REQUIRED_ENV) => names.filter((name) => !process.env[name]?.trim());

export function sendJson(res, { status, body, headers }) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });
  res.end(JSON.stringify(body));
}

/** True only when the provider accepted the message for every recipient and rejected no one. */
export function acceptedBy(info, addresses) {
  const accepted = (info?.accepted ?? []).map((entry) =>
    (typeof entry === "string" ? entry : entry.address).toLowerCase(),
  );
  const wanted = [addresses].flat();
  return wanted.every((address) => accepted.includes(address.toLowerCase())) && !(info?.rejected ?? []).length;
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

let cached = null;

/** Builds (and reuses) the SMTP transport from the current environment. */
export function createSmtpTransport() {
  const env = process.env;
  const port = Number(env.SMTP_PORT) || 587;
  const secure = env.SMTP_SECURE ? env.SMTP_SECURE === "true" : port === 465;
  const key = [env.SMTP_HOST, port, secure, env.SMTP_USER, env.SMTP_PASS].join("|");
  if (cached?.key !== key) {
    cached = {
      key,
      transporter: nodemailer.createTransport({
        host: env.SMTP_HOST.trim(),
        port,
        secure,
        auth: { user: env.SMTP_USER.trim(), pass: env.SMTP_PASS },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
      }),
    };
  }
  return cached.transporter;
}

export function clientIp(req) {
  if (process.env.TRUST_PROXY === "true") {
    const forwarded = String(req.headers["x-forwarded-for"] ?? "").split(",")[0].trim();
    if (forwarded) return forwarded;
  }
  return req.socket?.remoteAddress ?? "unknown";
}

/** Per-IP sliding-window limiter. The returned function gives seconds to wait, or 0 after recording the attempt. */
export function createRateLimiter(max, windowMs) {
  const attempts = new Map();
  return (ip) => {
    const now = Date.now();
    const recent = (attempts.get(ip) ?? []).filter((time) => now - time < windowMs);
    if (recent.length >= max) {
      attempts.set(ip, recent);
      return Math.ceil((recent[0] + windowMs - now) / 1000);
    }
    recent.push(now);
    attempts.set(ip, recent);
    if (attempts.size > 5000) {
      for (const [key, times] of attempts) if (times.every((time) => now - time >= windowMs)) attempts.delete(key);
    }
    return 0;
  };
}

/** Logs without personal data or secrets: only an error's code, never its message or the addresses involved. */
export function createLogger(scope) {
  return (message, error) => {
    const detail = error && typeof error === "object" ? error : null;
    const suffix = detail ? ` (${[detail.code, detail.responseCode].filter(Boolean).join(" ") || "no code"})` : "";
    console.warn(`[${scope}] ${message}${suffix}`);
  };
}
