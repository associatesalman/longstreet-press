import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { handleInquiry } from './server/inquiry.js'

// Serves POST /api/inquiry from the dev and preview servers with the same handler as server/index.js,
// so the Book Marketing form behaves identically in development and production.
function inquiryApi() {
  return {
    name: 'inquiry-api',
    configureServer(server) {
      server.middlewares.use('/api/inquiry', (req, res) => void handleInquiry(req, res))
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/inquiry', (req, res) => void handleInquiry(req, res))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Copy the server-only email settings from .env into process.env for the dev/preview API.
  // Only VITE_ variables ever reach the browser bundle, and none are used here, so the SMTP
  // credentials stay on the server. Variables already set in the real environment win.
  const env = loadEnv(mode, process.cwd(), ['CONTACT_', 'SMTP_', 'TRUST_PROXY'])
  for (const [name, value] of Object.entries(env)) {
    if (process.env[name] === undefined || process.env[name] === '') process.env[name] = value
  }

  return {
    plugins: [react(), inquiryApi()],
  }
})
