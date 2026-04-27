const Room = require('./models/Room')
const Player = require('./models/Player')
const Team = require('./models/Team')
const Bid = require('./models/Bid')

const auctionStates = {}
const skipVotes = {}
const withdrawVotes = {}

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    socket.on('join_room', ({ roomCode, user }) => {
      socket.join(roomCode)
      socket.data.user = user
      socket.data.roomCode = roomCode

      if (auctionStates[roomCode]) {
        socket.emit('auction_state', auctionStates[roomCode])
      }

      io.to(roomCode).emit('user_joined', { user, message: `${user.name} joined the room` })
    })

    socket.on('start_auction', async ({ roomCode }) => {
      try {
        const room = await Room.findOne({ roomCode })
        const bidTimer = room.bidTimer || 15

        // Fetch players categorically
        const batsmen = await Player.find({ role: 'Batsman' })
        const bowlers = await Player.find({ role: 'Bowler' })
        const allRounders = await Player.find({ role: 'All-rounder' })
        const keepers = await Player.find({ role: 'Wicket-keeper' })

        // Shuffle within each category
        const shuffle = (arr) => arr.sort(() => Math.random() - 0.5)
        const players = [
          ...shuffle(batsmen),
          ...shuffle(bowlers),
          ...shuffle(allRounders),
          ...shuffle(keepers),
        ]

        auctionStates[roomCode] = {
          status: 'active',
          players,
          currentIndex: 0,
          currentPlayer: players[0],
          currentBid: players[0].basePrice,
          currentLeader: null,
          timeLeft: bidTimer,
          bidTimer,
          soldPlayers: [],
          unsoldPlayers: [],
          totalParticipants: room.participants.length,
        }

        skipVotes[roomCode] = new Set()
        withdrawVotes[roomCode] = new Set()

        await Room.findOneAndUpdate({ roomCode }, { status: 'active' })

        io.to(roomCode).emit('auction_started', auctionStates[roomCode])
        io.to(roomCode).emit('player_up', {
          player: players[0],
          currentBid: players[0].basePrice,
          timeLeft: bidTimer,
          category: players[0].role,
        })

        startTimer(io, roomCode)
      } catch (error) {
        console.error('Start auction error:', error)
      }
    })

    socket.on('place_bid', ({ roomCode, amount, user }) => {
      const state = auctionStates[roomCode]
      if (!state || state.status !== 'active') return

      if (amount <= state.currentBid) {
        socket.emit('bid_error', { message: 'Bid must be higher than current bid!' })
        return
      }

      if (state.currentLeader?._id === user._id) {
        socket.emit('bid_error', { message: 'You are already the highest bidder!' })
        return
      }

      state.currentBid = amount
      state.currentLeader = user
      state.timeLeft = state.bidTimer

      // Reset votes on new bid
      skipVotes[roomCode] = new Set()
      withdrawVotes[roomCode] = new Set()

      io.to(roomCode).emit('new_bid', {
        amount,
        bidder: user,
        timeLeft: state.bidTimer,
      })

      io.to(roomCode).emit('votes_reset')
    })

    // SKIP vote — when no one has bid, everyone can skip
    socket.on('vote_skip', ({ roomCode, userId }) => {
      const state = auctionStates[roomCode]
     if (!state || state.currentLeader) return // can't skip if someone bid

      if (!skipVotes[roomCode]) skipVotes[roomCode] = new Set()
      skipVotes[roomCode].add(userId)

      const totalNeeded = state.totalParticipants
      const votesIn = skipVotes[roomCode].size

      io.to(roomCode).emit('skip_vote_update', {
        votes: votesIn,
        needed: totalNeeded,
      })

      if (votesIn >= totalNeeded) {
        // All voted skip — instant unsold
        clearInterval(timers[roomCode])
        state.unsoldPlayers.push(state.currentPlayer)
        io.to(roomCode).emit('player_unsold', { player: state.currentPlayer, reason: 'skipped' })
        skipVotes[roomCode] = new Set()
        setTimeout(() => moveToNextPlayer(io, roomCode), 1500)
      }
    })

    // WITHDRAW vote — when someone has bid, others can withdraw
    socket.on('vote_withdraw', ({ roomCode, userId }) => {
      const state = auctionStates[roomCode]
      if (!state || !state.currentLeader) return // can't withdraw if no one bid

      if (!withdrawVotes[roomCode]) withdrawVotes[roomCode] = new Set()
      withdrawVotes[roomCode].add(userId)

      const totalNeeded = state.totalParticipants - 1 // everyone except leader
      const votesIn = withdrawVotes[roomCode].size

      io.to(roomCode).emit('withdraw_vote_update', {
        votes: votesIn,
        needed: totalNeeded,
        leader: state.currentLeader,
      })

      if (votesIn >= totalNeeded) {
        // All others withdrew — instant sold to leader
        clearInterval(timers[roomCode])
        sellPlayer(io, roomCode)
      }
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })
}

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
        await sellPlayer(io, roomCode)
      } else {
        state.unsoldPlayers.push(state.currentPlayer)
        io.to(roomCode).emit('player_unsold', { player: state.currentPlayer })
        setTimeout(() => moveToNextPlayer(io, roomCode), 2000)
      }
    }
  }, 1000)
}

const sellPlayer = async (io, roomCode) => {
  const state = auctionStates[roomCode]
  if (!state || !state.currentLeader) return

  try {
    const roomDoc = await Room.findOne({ roomCode })

    await Bid.create({
      roomId: roomDoc._id,
      playerId: state.currentPlayer._id,
      soldTo: state.currentLeader._id,
      soldPrice: state.currentBid,
      status: 'sold',
    })

    await Team.findOneAndUpdate(
      { roomId: roomDoc._id, userId: state.currentLeader._id },
      {
        $push: { players: state.currentPlayer._id },
        $inc: { remainingPurse: -state.currentBid }
      }
    )

    state.soldPlayers.push({
      player: state.currentPlayer,
      soldTo: state.currentLeader,
      soldPrice: state.currentBid,
    })

    io.to(roomCode).emit('player_sold', {
      player: state.currentPlayer,
      soldTo: state.currentLeader,
      soldPrice: state.currentBid,
    })

    skipVotes[roomCode] = new Set()
    withdrawVotes[roomCode] = new Set()

    setTimeout(() => moveToNextPlayer(io, roomCode), 3000)
  } catch (error) {
    console.error('Sell player error:', error)
  }
}

const moveToNextPlayer = (io, roomCode) => {
  const state = auctionStates[roomCode]
  if (!state) return

  state.currentIndex += 1
  skipVotes[roomCode] = new Set()
  withdrawVotes[roomCode] = new Set()

  if (state.currentIndex >= state.players.length) {
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
  state.timeLeft = state.bidTimer

  io.to(roomCode).emit('player_up', {
    player: nextPlayer,
    currentBid: nextPlayer.basePrice,
    timeLeft: state.bidTimer,
    category: nextPlayer.role,
  })

  startTimer(io, roomCode)
}

module.exports = initSocket