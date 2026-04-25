const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Player = require('../models/Player')
const players = require('./players')

dotenv.config({ path: '../.env' })

const seedDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bidexpert11')
    console.log('MongoDB Connected')
    await Player.deleteMany()
    console.log('Old players deleted')
    await Player.insertMany(players)
    console.log(`${players.length} players seeded successfully!`)
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seedDB()