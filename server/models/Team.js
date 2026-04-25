const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teamName: { type: String, required: true },
  color: { type: String, default: '#1B5E20' },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  remainingPurse: { type: Number },
}, { timestamps: true })

module.exports = mongoose.model('Team', teamSchema)