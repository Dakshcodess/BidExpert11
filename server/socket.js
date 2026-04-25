const Room = require('./models/Room')
const Player = require('./models/Player')
const Team = require('./models/Team')
const Bid = require('./models/Bid')

// Store auction state for each room
const auctionStates = {}

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    // Join a room
    socket.on('join_room', ({ roomCode, user }) => {
      socket.join(roomCode)
      socket.data.user = user
      socket.data.roomCode = roomCode
      console.log(`${user.name} joined room ${roomCode}`)

      // Send current auction state if exists
      if (auctionStates[roomCode]) {
        socket.emit('auction_state', auctionStates[roomCode])
      }

      io.to(roomCode).emit('user_joined', { user, message: `${user.name} joined the room` })
    })

    // Start auction (host only)
    socket.on('start_auction', async ({ roomCode }) => {
      try {
        const players = await Player.find({})
        const shuffled = players.sort(() => Math.random() - 0.5)

        auctionStates[roomCode] = {
          status: 'active',
          players: shuffled,
          currentIndex: 0,
          currentPlayer: shuffled[0],
          currentBid: shuffled[0].basePrice,
          currentLeader: null,
          timeLeft: 30,
          soldPlayers: [],
          unsoldPlayers: [],
        }

        await Room.findOneAndUpdate({ roomCode }, { status: 'active' })

        io.to(roomCode).emit('auction_started', auctionStates[roomCode])
        io.to(roomCode).emit('player_up', {
          player: shuffled[0],
          currentBid: shuffled[0].basePrice,
          timeLeft: 30,
        })

        startTimer(io, roomCode)
      } catch (error) {
        console.error('Start auction error:', error)
      }
    })

    // Place a bid
    socket.on('place_bid', async ({ roomCode, amount, user }) => {
      const state = auctionStates[roomCode]
      if (!state || state.status !== 'active') return

      // Validate bid
      if (amount <= state.currentBid) {
        socket.emit('bid_error', { message: 'Bid must be higher than current bid!' })
        return
      }

      // Check if same person bidding again
      if (state.currentLeader?._id === user._id) {
        socket.emit('bid_error', { message: 'You are already the highest bidder!' })
        return
      }

      // Update state
      state.currentBid = amount
      state.currentLeader = user
      state.timeLeft = 15 // reset timer on new bid

      io.to(roomCode).emit('new_bid', {
        amount,
        bidder: user,
        timeLeft: 15,
      })
    })

    // Next player (host only)
    socket.on('next_player', ({ roomCode }) => {
      moveToNextPlayer(io, roomCode)
    })

    // Mark unsold (host only)
    socket.on('mark_unsold', ({ roomCode }) => {
      const state = auctionStates[roomCode]
      if (!state) return
      state.unsoldPlayers.push(state.currentPlayer)
      io.to(roomCode).emit('player_unsold', { player: state.currentPlayer })
      moveToNextPlayer(io, roomCode)
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })
}

// Timer logic
const timers = {}

const startTimer = (io, roomCode) => {
  if (timers[roomCode]) clearInterval(timers[roomCode])

  timers[roomCode] = setInterval(async () => {
    const state = auctionStates[roomCode]
    if (!state) return

    state.timeLeft -= 1
    io.to(roomCode).emit('time_tick', { timeLeft: state.timeLeft })

    if (state.timeLeft <= 0) {
      clearInterval(timers[roomCode])

      if (state.currentLeader) {
        // Player sold!
        const bid = await Bid.create({
          roomId: (await Room.findOne({ roomCode }))._id,
          playerId: state.currentPlayer._id,
          soldTo: state.currentLeader._id,
          soldPrice: state.currentBid,
          status: 'sold',
        })

        // Update team
        await Team.findOneAndUpdate(
          { roomId: (await Room.findOne({ roomCode }))._id, userId: state.currentLeader._id },
          {
            $push: { players: state.currentPlayer._id },
            $inc: { remainingPurse: -state.currentBid }
          }
        )

        state.soldPlayers.push({ player: state.currentPlayer, soldTo: state.currentLeader, soldPrice: state.currentBid })

        io.to(roomCode).emit('player_sold', {
          player: state.currentPlayer,
          soldTo: state.currentLeader,
          soldPrice: state.currentBid,
        })

        setTimeout(() => moveToNextPlayer(io, roomCode), 3000)
      } else {
        // No bids - unsold
        state.unsoldPlayers.push(state.currentPlayer)
        io.to(roomCode).emit('player_unsold', { player: state.currentPlayer })
        setTimeout(() => moveToNextPlayer(io, roomCode), 2000)
      }
    }
  }, 1000)
}

const moveToNextPlayer = (io, roomCode) => {
  const state = auctionStates[roomCode]
  if (!state) return

  state.currentIndex += 1

  if (state.currentIndex >= state.players.length) {
    // Auction ended
    state.status = 'ended'
    Room.findOneAndUpdate({ roomCode }, { status: 'ended' })
    io.to(roomCode).emit('auction_ended', {
      soldPlayers: state.soldPlayers,
      unsoldPlayers: state.unsoldPlayers,
    })
    if (timers[roomCode]) clearInterval(timers[roomCode])
    return
  }

  const nextPlayer = state.players[state.currentIndex]
  state.currentPlayer = nextPlayer
  state.currentBid = nextPlayer.basePrice
  state.currentLeader = null
  state.timeLeft = 30

  io.to(roomCode).emit('player_up', {
    player: nextPlayer,
    currentBid: nextPlayer.basePrice,
    timeLeft: 30,
  })

  startTimer(io, roomCode)
}

module.exports = initSocket