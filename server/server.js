const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const http = require('http')
const { Server } = require('socket.io')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const roomRoutes = require('./routes/roomRoutes')
const pdfRoutes = require('./routes/pdfRoutes')
const initSocket = require('./socket')
const path = require('path')
dotenv.config()

connectDB()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'https://bid-expert11.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }
})

initSocket(io)

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://bid-expert11.vercel.app'
  ],
  credentials: true
}))
app.use(express.json())
app.use('/players', (req, res, next) => {
  req.url = decodeURIComponent(req.url)
  next()
}, express.static(path.join(__dirname, 'public/players')))
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/pdf', pdfRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'BidExpert11 server is running! 🏏' })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})