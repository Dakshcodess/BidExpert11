const express = require('express')
const router = express.Router()
const { createRoom, joinRoom, getRoom } = require('../controllers/roomController')
const { protect } = require('../middleware/authMiddleware')

router.post('/create', protect, createRoom)
router.post('/join', protect, joinRoom)
router.get('/:code', protect, getRoom)

module.exports = router