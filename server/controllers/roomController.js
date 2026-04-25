const Room = require('../models/Room')
const Team = require('../models/Team')

// Generate random 6-char room code
const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

// @desc Create a room
const createRoom = async (req, res) => {
  const { name, pursePerTeam } = req.body
  try {
    let roomCode = generateRoomCode()

    // Make sure code is unique
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
    })

    // Create team for host
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

// @desc Join a room
const joinRoom = async (req, res) => {
  const { roomCode } = req.body
  try {
    const room = await Room.findOne({ roomCode: roomCode.toUpperCase() })
      .populate('participants', 'name email')
      .populate('hostId', 'name')

    if (!room) return res.status(404).json({ message: 'Room not found!' })
    if (room.status === 'ended') return res.status(400).json({ message: 'This auction has ended!' })

    // Check if already in room
    const alreadyIn = room.participants.some(p => p._id.toString() === req.user._id.toString())

    if (!alreadyIn) {
      room.participants.push(req.user._id)
      await room.save()

      // Create team for new participant
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

// @desc Get room by code
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