/**
 * Book Marketing inquiry endpoint tests. These use a MOCK mail transport and
 * dummy environment values: no SMTP connection is made and no email is sent.
 * Run with `npm test`.
 */
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, before, beforeEach, describe, test } from "node:test";
import { createInquiryHandler } from "../server/inquiry.js";
import { createRateLimiter } from "../server/mail.js";
import { emptyInquiry, MONTHLY_BUDGETS, PRIMARY_SERVICES, TARGET_MARKETS, validateInquiry } from "../src/lib/inquiry.js";

const DUMMY_ENV = {
  CONTACT_FROM_EMAIL: "no-reply@example.test",
  SMTP_HOST: "smtp.example.test",
  SMTP_USER: "dummy-user",
  SMTP_PASS: "dummy-password-not-real",
};

const valid = {
  authorOrPublisher: "Oxford Literary Press",
  contactName: "Jane Reader",
  email: "jane@example.com",
  amazonLinkOrAsin: "B0DKTKBY8N",
  targetMarket: TARGET_MARKETS[0],
  primaryService: PRIMARY_SERVICES[7],
  monthlyBudget: MONTHLY_BUDGETS[1],
  campaignNotes: "Literary fiction, launching in March.\nTarget ACoS 30%.",
  termsAccepted: true,
  website: "",
};

let sent;
let transportMode;
const mockTransport = () => ({
  async sendMail(message) {
    sent.push(message);
    if (transportMode === "throw") {
      const error = new Error(`Invalid login for ${DUMMY_ENV.SMTP_USER} with ${DUMMY_ENV.SMTP_PASS}`);
      error.code = "EAUTH";
      throw error;
    }
    if (transportMode === "reject") return { accepted: [], rejected: [message.to] };
    return { accepted: [message.to], rejected: [] };
  },
});

let server;
let base;
let limiter;
const handler = createInquiryHandler({ transport: mockTransport, rateLimited: (ip) => limiter(ip), log: () => {} });

const post = (body, headers = { "Content-Type": "application/json" }) =>
  fetch(`${base}/api/inquiry`, { method: "POST", headers, body: typeof body === "string" ? body : JSON.stringify(body) });

before(async () => {
  server = createServer((req, res) => handler(req, res));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));

beforeEach(() => {
  sent = [];
  transportMode = "accept";
  limiter = createRateLimiter(1000, 60_000);
  for (const name of ["CONTACT_RECIPIENT_EMAIL", ...Object.keys(DUMMY_ENV)]) delete process.env[name];
  Object.assign(process.env, DUMMY_ENV);
});

describe("shared validation", () => {
  test("every select starts empty and empty selects are accepted", () => {
    assert.equal(emptyInquiry.targetMarket, "");
    assert.equal(emptyInquiry.primaryService, "");
    assert.equal(emptyInquiry.monthlyBudget, "");
    assert.equal("genre" in emptyInquiry, false);
    const { errors } = validateInquiry({ ...valid, targetMarket: "", primaryService: "", monthlyBudget: "" });
    assert.deepEqual(errors, {});
  });

  test("required fields, email, select values and consent are enforced", () => {
    const { errors } = validateInquiry({ email: "not-an-email", targetMarket: "Amazon US and Global", termsAccepted: "true" });
    assert.deepEqual(Object.keys(errors).sort(), [
      "authorOrPublisher",
      "campaignNotes",
      "contactName",
      "email",
      "targetMarket",
      "termsAccepted",
    ]);
  });
});

describe("POST /api/inquiry", () => {
  test("success: emails every field to the server-side recipient", async () => {
    const response = await post({ ...valid, to: "attacker@example.com", recipient: "attacker@example.com" });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(sent.length, 1);
    const [mail] = sent;
    assert.equal(mail.to, "associatesalman@gmail.com");
    assert.deepEqual(mail.from, { name: "Longstreet Press", address: DUMMY_ENV.CONTACT_FROM_EMAIL });
    assert.deepEqual(mail.replyTo, { name: valid.contactName, address: valid.email });
    for (const value of [valid.authorOrPublisher, valid.contactName, valid.email, valid.amazonLinkOrAsin, valid.targetMarket, valid.primaryService, valid.monthlyBudget, "Target ACoS 30%"]) {
      assert.ok(mail.text.includes(value), `text missing ${value}`);
    }
    for (const label of ["Author or Press Name", "Lead Contact Name", "Email Address", "Amazon ASIN, ISBN, or Book URL", "Target Marketplace", "Primary Service Requirement", "Estimated Monthly Promotion Budget", "Book Details and Campaign Objectives", "Consent"]) {
      assert.ok(mail.text.includes(label) && mail.html.includes(label), `label missing ${label}`);
    }
  });

  test("CONTACT_RECIPIENT_EMAIL overrides the default recipient", async () => {
    process.env.CONTACT_RECIPIENT_EMAIL = "desk@example.test";
    const response = await post(valid);
    assert.equal(response.status, 200);
    assert.equal(sent[0].to, "desk@example.test");
  });

  test("HTML body escapes user content and header fields cannot be injected", async () => {
    const response = await post({
      ...valid,
      authorOrPublisher: "Evil <script>alert(1)</script>",
      contactName: "Mallory\r\nBcc: victim@example.com",
      campaignNotes: "<img src=x onerror=alert(1)> & more",
    });
    assert.equal(response.status, 200);
    const [mail] = sent;
    assert.ok(!mail.html.includes("<script>"));
    assert.ok(!mail.html.includes("<img"));
    assert.ok(mail.html.includes("&#60;script&#62;"));
    assert.ok(!/[\r\n]/.test(mail.subject), "subject contains a line break");
    assert.ok(!/[\r\n]/.test(mail.replyTo.name), "reply-to name contains a line break");
  });

  test("invalid input: 422 with field errors, nothing sent", async () => {
    const response = await post({ ...valid, email: "bad@", primaryService: "Free money", termsAccepted: false });
    assert.equal(response.status, 422);
    const body = await response.json();
    assert.equal(body.error, "validation");
    assert.deepEqual(Object.keys(body.errors).sort(), ["email", "primaryService", "termsAccepted"]);
    assert.equal(sent.length, 0);
  });

  test("spam honeypot: looks successful to the bot, nothing sent", async () => {
    const response = await post({ ...valid, website: "http://spam.example" });
    assert.equal(response.status, 200);
    assert.equal(sent.length, 0);
  });

  test("missing environment: 503 unavailable, nothing sent, no false success", async () => {
    delete process.env.SMTP_PASS;
    process.env.CONTACT_FROM_EMAIL = "   ";
    const response = await post(valid);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { ok: false, error: "unavailable" });
    assert.equal(sent.length, 0);
  });

  test("provider error: 502 without leaking credentials or provider details", async () => {
    transportMode = "throw";
    const response = await post(valid);
    assert.equal(response.status, 502);
    const raw = await response.text();
    assert.deepEqual(JSON.parse(raw), { ok: false, error: "delivery" });
    for (const secret of [DUMMY_ENV.SMTP_PASS, DUMMY_ENV.SMTP_USER, "EAUTH", "Invalid login"]) assert.ok(!raw.includes(secret));
  });

  test("provider did not accept the recipient: 502, not success", async () => {
    transportMode = "reject";
    const response = await post(valid);
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, false);
  });

  test("method, content type, size and JSON are checked", async () => {
    assert.equal((await fetch(`${base}/api/inquiry`)).status, 405);
    assert.equal((await post(JSON.stringify(valid), { "Content-Type": "text/plain" })).status, 415);
    assert.equal((await post("{not json")).status, 400);
    assert.equal((await post({ ...valid, campaignNotes: "x".repeat(20_000) })).status, 413);
    assert.equal(sent.length, 0);
  });

  test("rate limiting: 429 with Retry-After after repeated submissions", async () => {
    limiter = createRateLimiter(2, 60_000);
    assert.equal((await post(valid)).status, 200);
    assert.equal((await post(valid)).status, 200);
    const third = await post(valid);
    assert.equal(third.status, 429);
    assert.ok(Number(third.headers.get("retry-after")) > 0);
    assert.equal(sent.length, 2);
  });
});

describe("real nodemailer MIME output (offline stream transport, nothing sent)", () => {
  test("From, Reply-To and Subject headers are correct and not injectable", async () => {
    const nodemailer = (await import("nodemailer")).default;
    const stream = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: "unix" });
    let mime = "";
    const offline = createInquiryHandler({
      transport: () => ({
        async sendMail(message) {
          const info = await stream.sendMail(message);
          mime = info.message.toString("utf8");
          return { accepted: [message.to], rejected: [] };
        },
      }),
      rateLimited: () => 0,
      log: () => {},
    });
    const offlineServer = createServer((req, res) => offline(req, res));
    await new Promise((resolve) => offlineServer.listen(0, "127.0.0.1", resolve));
    try {
      const response = await fetch(`http://127.0.0.1:${offlineServer.address().port}/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...valid, contactName: "Mallory\r\nBcc: victim@example.com" }),
      });
      assert.equal(response.status, 200);
    } finally {
      await new Promise((resolve) => offlineServer.close(resolve));
    }
    const headers = mime.split("\n\n")[0];
    assert.match(headers, /^From: Longstreet Press <no-reply@example\.test>$/m);
    assert.match(headers, /^To: associatesalman@gmail\.com$/m);
    assert.match(headers, /^Reply-To: .*<jane@example\.com>$/m);
    assert.doesNotMatch(headers, /^Bcc:/im);
    assert.match(mime, /Content-Type: text\/plain/);
    assert.match(mime, /Content-Type: text\/html/);
  });
});
