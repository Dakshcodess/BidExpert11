const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  roomCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  pursePerTeam: { type: Number, default: 100 },
  bidTimer: { type: Number, default: 15 },
  status: { type: String, enum: ['waiting', 'active', 'ended'], default: 'waiting' },
}, { timestamps: true })

module.exports = mongoose.model('Room', roomSchema)