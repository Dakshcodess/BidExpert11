const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  role: { type: String, enum: ['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'] },
  basePrice: { type: Number, required: true },
  isCapped: { type: Boolean, default: true },
  imageUrl: { type: String, default: '' },

  // Shown for: Batsman
  battingStats: {
    innings: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    highScore: { type: Number, default: 0 },
    fifties: { type: Number, default: 0 },
    hundreds: { type: Number, default: 0 },
  },

  // Shown for: Bowler
  bowlingStats: {
    innings: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    economy: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    bestFigures: { type: String, default: '-' },
    fourWickets: { type: Number, default: 0 },
  },

  // Shown for: All-rounder
  allRounderStats: {
    innings: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    economy: { type: Number, default: 0 },
  },

  // Shown for: Wicket-keeper
  keeperStats: {
    innings: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    dismissals: { type: Number, default: 0 },
  },

}, { timestamps: true })

module.exports = mongoose.model('Player', playerSchema)