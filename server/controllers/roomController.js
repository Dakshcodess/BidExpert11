const Room = require('../models/Room')
const Team = require('../models/Team')

const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

const createRoom = async (req, res) => {
  const { name, pursePerTeam, bidTimer } = req.body
  try {
    let roomCode = generateRoomCode()
    let exists = await Room.findOne({ roomCode })
    while (exists) {
      roomCode = generateRoomCode()
      exists = await Room.findOne({ roomCode })
    }

    const room = await Room.create({
      roomCode,
      name,
      hostId: req.user._id,
      participants: [req.user._id],
      pursePerTeam: pursePerTeam || 100,
      bidTimer: bidTimer || 15,
    })

    await Team.create({
      roomId: room._id,
      userId: req.user._id,
      teamName: `${req.user.name}'s Team`,
      remainingPurse: pursePerTeam || 100,
    })

    res.status(201).json(room)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const joinRoom = async (req, res) => {
  const { roomCode } = req.body
  try {
    const room = await Room.findOne({ roomCode: roomCode.toUpperCase() })
      .populate('participants', 'name email')
      .populate('hostId', 'name')

    if (!room) return res.status(404).json({ message: 'Room not found!' })
    if (room.status === 'ended') return res.status(400).json({ message: 'This auction has ended!' })

    const alreadyIn = room.participants.some(p => p._id.toString() === req.user._id.toString())

    if (!alreadyIn) {
      room.participants.push(req.user._id)
      await room.save()

      await Team.create({
        roomId: room._id,
        userId: req.user._id,
        teamName: `${req.user.name}'s Team`,
        remainingPurse: room.pursePerTeam,
      })
    }

    res.json(room)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.code })
      .populate('participants', 'name email')
      .populate('hostId', 'name')

    if (!room) return res.status(404).json({ message: 'Room not found!' })
    res.json(room)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createRoom, joinRoom, getRoom }