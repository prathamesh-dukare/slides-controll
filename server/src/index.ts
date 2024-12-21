import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import roomRoutes from './routes/roomRoutes'
import { initializeSocket } from './socket/socketHandler'
import dotenv from 'dotenv'
import path from 'path'
import morgan from 'morgan'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const app = express()
const httpServer = createServer(app)

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',')

const corsOptions = {
  origin: ALLOWED_ORIGINS,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
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

// strict limiter
app.use('/api/v1/room', strictLimiter, roomRoutes)

const io = new Server(httpServer, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true,
})

// init socket handler
initializeSocket(io)

const PORT = process.env.SERVER_PORT || 3002

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
