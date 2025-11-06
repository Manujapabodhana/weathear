// Load environment variables as early as possible
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

/**
 * 1) Read env
 */
const PORT = process.env.PORT || 4000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN
const MONGO_URI = process.env.MONGO_URI

if (!CLIENT_ORIGIN) {
  console.warn('[WARN] CLIENT_ORIGIN not set. CORS will be wide-open in dev.')
}
if (!MONGO_URI) {
  console.error('[ERROR] MONGO_URI is required')
  process.exit(1)
}

/**
 * 2) Create app & core middleware
 */
const app = express()

// CORS: allow only your frontend origin in production.
// In dev, if CLIENT_ORIGIN is missing, allow localhost just to boot.
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow tools like curl/Postman (no origin)
      if (!origin) return cb(null, true)
      if (!CLIENT_ORIGIN) {
        // Dev fallback: allow http://localhost:5173
        return /^http:\/\/localhost:5173$/.test(origin)
          ? cb(null, true)
          : cb(new Error('Not allowed by CORS'))
      }
      // Strict: must match env
      return origin === CLIENT_ORIGIN
        ? cb(null, true)
        : cb(new Error('Not allowed by CORS'))
    },
    credentials: true
  })
)

app.use(express.json())

/**
 * 3) Connect to MongoDB once on startup
 */
async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI, {
      // You can add options here if needed
    })
    console.log('[DB] Connected to MongoDB')
  } catch (err) {
    console.error('[DB] Connection error:', err.message)
    console.warn('[WARN] Continuing without DB connection (development fallback).')
    // Do NOT exit the process here. Keep the server running so health checks and
    // non-db endpoints stay available during development or if DNS/network fails.
  }
}

/**
 * 4) Routes
 */

// Health-check route: quick sanity check for uptime, CORS, routing.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    ok: true,
    time: new Date().toISOString(),
    env: 'development', // flip to 'production' when you deploy
  })
})

/**
 * 5) 404 handler (for unknown routes)
 */
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl
  })
})

/**
 * 6) Centralized error handler
 * If any route/middleware calls next(err), it ends up here.
 */
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message)
  const status = err.status || 500
  res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : err.message
  })
})

/**
 * 7) Boot sequence: connect DB → start server
 */
async function start() {
  console.log('[BOOT] Starting server...')
  console.log(`[BOOT] ENV: PORT=${PORT}`)
  console.log(`[BOOT] ENV: CLIENT_ORIGIN=${CLIENT_ORIGIN || '(not set, dev fallback)'}`)

  await connectMongo()

  app.listen(PORT, () => {
    console.log(`[BOOT] API running on http://localhost:${PORT}`)
  })
}

start()
