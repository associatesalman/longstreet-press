import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { handleInquiry } from "./inquiry.js";

/**
 * Production server for Longstreet Press: serves the built site from dist/, falls
 * back to index.html for client-side routes (/about, /bookstores, ...), and handles
 * POST /api/inquiry for the Book Marketing form.
 *
 * Start with `npm run build && npm start` (Node 22.9+). `npm start` loads .env when
 * present; on a host, set the variables from .env.example in its dashboard instead.
 */

const root = resolve("dist");
const port = Number(process.env.PORT) || 3000;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

const baseHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
};

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");

  if (pathname === "/api/inquiry") {
    for (const [name, value] of Object.entries(baseHeaders)) res.setHeader(name, value);
    return handleInquiry(req, res);
  }
  if (pathname.startsWith("/api/")) return send(res, 404, "Not found");
  if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Method not allowed");

  // Resolve inside dist/ only.
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return send(res, 400, "Bad request");
  }
  const file = normalize(join(root, decoded));
  if (file !== root && !file.startsWith(root + sep)) return send(res, 404, "Not found");

  const found = await stat(file).then((s) => (s.isFile() ? file : null), () => null);
  // Unknown page routes get the app shell, which renders the 404 page; missing files with an extension get a real 404.
  const target = found ?? (extname(pathname) ? null : join(root, "index.html"));
  if (!target) return send(res, 404, "Not found");

  const { size } = await stat(target);
  res.writeHead(200, {
    ...baseHeaders,
    "Content-Type": types[extname(target).toLowerCase()] ?? "application/octet-stream",
    // Hashed build assets never change; pages must always be fresh.
    "Cache-Control": target.includes(`${sep}assets${sep}`) ? "public, max-age=31536000, immutable" : "no-cache",
    "Content-Length": size,
  });
  if (req.method === "HEAD") return res.end();
  createReadStream(target).pipe(res);
});

function send(res, status, message) {
  res.writeHead(status, { ...baseHeaders, "Content-Type": "text/plain; charset=utf-8" });
  res.end(message);
}

server.listen(port, () => console.log(`Longstreet Press running on http://localhost:${port}`));
