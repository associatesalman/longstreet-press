# Longstreet Press

Website for **Longstreet Press** (`longstreetpress`): a curated showcase of rare, antiquarian and collectible
books, with each title linked to its Amazon listing, plus a Book Marketing page where authors and publishers
can request a publishing or marketing proposal.

Built with React 19, Vite, Tailwind CSS 3 and React Router. A small Node server (`server/`) serves the built
site and handles the Book Marketing inquiry form.

## Scripts

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Development server with hot reload (includes the `/api/inquiry` endpoint) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally (includes `/api/inquiry`) |
| `npm start` | Production server: serves `dist/` and `/api/inquiry` (run `npm run build` first) |
| `npm test` | Inquiry endpoint tests (mock mail transport; never sends email) |
| `npm run lint` | ESLint |

Node.js 22.9 or newer is required (`npm start` uses `--env-file-if-exists`).

## Book Marketing inquiry email

The form on `/book-marketing` posts JSON to `POST /api/inquiry`. The server validates it with the same rules as
the browser (`src/lib/inquiry.js`) and emails it over SMTP with
[nodemailer](https://nodemailer.com/) (`server/inquiry.js`, `server/mail.js`):

- **To:** `associatesalman@gmail.com`, fixed on the server (override with `CONTACT_RECIPIENT_EMAIL`). The browser
  never sends or sees the recipient.
- **From:** `"Longstreet Press" <CONTACT_FROM_EMAIL>`, a sender address verified with your SMTP provider.
- **Reply-To:** the visitor's validated email address.
- Plain-text and HTML bodies listing every form field; user content is HTML-escaped and control characters are
  stripped from single-line fields (no header injection).
- Abuse protection: hidden honeypot field, per-IP rate limit (5 per 15 minutes), 16 KB body limit, JSON-only.
- The visitor sees success only after the SMTP provider accepts the message. If configuration is missing the
  endpoint answers `503` and the form shows a friendly error with the visitor's entries intact.

### Configuration

Copy `.env.example` to `.env` (gitignored) for local use, or set the same variables in your host's environment
settings. **Never prefix them with `VITE_`.**

| Variable | Required | Where to get it |
| --- | --- | --- |
| `CONTACT_FROM_EMAIL` | Yes | A sender address/domain you have verified with your SMTP provider |
| `SMTP_HOST` | Yes | Your provider's SMTP settings (e.g. `smtp.example.com`) |
| `SMTP_USER` | Yes | SMTP username from your provider |
| `SMTP_PASS` | Yes | SMTP password / API key from your provider |
| `SMTP_PORT` | No | `587` (default, STARTTLS) or `465` |
| `SMTP_SECURE` | No | `true` only for port 465 |
| `CONTACT_RECIPIENT_EMAIL` | No | Overrides the default recipient |
| `TRUST_PROXY` | No | `true` behind a reverse proxy/load balancer so rate limiting sees visitor IPs |
| `PORT` | No | Port for `npm start` (default 3000; most hosts set it) |

## Deployment

The site needs a Node host because the inquiry endpoint runs on the server (a static-only host cannot send the
email). On any Node host (Render, Railway, Fly.io, a VPS, etc.):

1. Build command: `npm ci && npm run build`
2. Start command: `npm start`
3. Set the environment variables above in the host's dashboard.
4. If the host puts a proxy in front of the app (most do), set `TRUST_PROXY=true`.

The server serves `dist/`, falls back to `index.html` for client-side routes (unknown routes render the 404 page),
and handles `POST /api/inquiry`.

## Project layout

- `src/components/`: Navbar (with mobile menu), Footer, homepage sections
- `src/pages/`, `src/pages2/`: category pages; `src/pages/site/`: About, Contact, Privacy, Terms, Advanced Search, 404
- `src/bookstores/`: Bookstores page; its catalogue lives in `src/data/bookstoresCatalog.js`
- `src/bookmarketing/`: Book Marketing page and inquiry form
- `src/lib/`: shared inquiry validation and `?book=` search highlighting
- `server/`: production server and inquiry email endpoint
- `public/`: book covers, favicons (generated from the Longstreet Press logo emblem) and web manifest
