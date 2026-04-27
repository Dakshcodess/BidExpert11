const mongoose = require('mongoose')
const Player = require('../models/Player')

const run = async () => {
  await mongoose.connect('mongodb://localhost:27017/bidexpert11')
  await Player.deleteMany({})
  console.log('All players deleted!')
  process.exit()
}

run()