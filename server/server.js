const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'BidExpert11 server is running! 🏏' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})