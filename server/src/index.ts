import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import roomRoutes from './routes/roomRoutes'
import { initializeSocket } from './socket/socketHandler'

const app = express()
const httpServer = createServer(app)

// configure cors
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL // You'll need to set this in production
      : 'http://localhost:5173', // Development React frontend URL
  methods: ['GET', 'POST'],
  credentials: true, // If you're using cookies/sessions
}

// Move cors middleware before route handlers
app.use(cors(corsOptions))
app.use(express.json())

// rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: 'Too many requests for this specific route, please try again later.',
})

app.use(limiter)

// strict limiter to room routes
app.use('/api/v1/room', strictLimiter, roomRoutes)

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

// initializing socket handler
initializeSocket(io)

const PORT = process.env.PORT || 3002

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
