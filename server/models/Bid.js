const mongoose = require('mongoose')

const bidSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  soldTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  soldPrice: { type: Number },
  status: { type: String, enum: ['sold', 'unsold'], default: 'sold' },
}, { timestamps: true })

module.exports = mongoose.model('Bid', bidSchema)