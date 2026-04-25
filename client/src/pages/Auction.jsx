import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { io } from 'socket.io-client'
import toast from 'react-hot-toast'
import axios from 'axios'

const Auction = () => {
  const { roomCode } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const socketRef = useRef(null)

  const [room, setRoom] = useState(null)
  const [auctionStatus, setAuctionStatus] = useState('waiting')
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [currentBid, setCurrentBid] = useState(0)
  const [currentLeader, setCurrentLeader] = useState(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const [bidAmount, setBidAmount] = useState(0)
  const [soldPlayers, setSoldPlayers] = useState([])
  const [lastSold, setLastSold] = useState(null)
  const [showSold, setShowSold] = useState(false)

  useEffect(() => {
    fetchRoom()
    connectSocket()
    return () => {
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [])

  const fetchRoom = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/rooms/${roomCode}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRoom(data)
    } catch {
      toast.error('Room not found!')
      navigate('/dashboard')
    }
  }

  const connectSocket = () => {
    const socket = io('http://localhost:5000')
    socketRef.current = socket

    socket.on('connect', () => {
      socket.emit('join_room', { roomCode, user })
    })

    socket.on('auction_started', (state) => {
      setAuctionStatus('active')
      toast.success('Auction started! 🏏')
    })

    socket.on('player_up', ({ player, currentBid, timeLeft }) => {
      setCurrentPlayer(player)
      setCurrentBid(currentBid)
      setCurrentLeader(null)
      setTimeLeft(timeLeft)
      setBidAmount(currentBid + 1)
      setShowSold(false)
    })

    socket.on('new_bid', ({ amount, bidder, timeLeft }) => {
      setCurrentBid(amount)
      setCurrentLeader(bidder)
      setTimeLeft(timeLeft)
      setBidAmount(amount + 1)
      if (bidder._id !== user._id) {
        toast(`${bidder.name} bid ₹${amount} Cr!`, { icon: '🔥' })
      }
    })

    socket.on('time_tick', ({ timeLeft }) => {
      setTimeLeft(timeLeft)
    })

    socket.on('player_sold', ({ player, soldTo, soldPrice }) => {
      setLastSold({ player, soldTo, soldPrice })
      setShowSold(true)
      setSoldPlayers(prev => [...prev, { player, soldTo, soldPrice }])
      if (soldTo._id === user._id) {
        toast.success(`You won ${player.name} for ₹${soldPrice} Cr! 🎉`)
      } else {
        toast(`${player.name} sold to ${soldTo.name} for ₹${soldPrice} Cr`, { icon: '🏏' })
      }
    })

    socket.on('player_unsold', ({ player }) => {
      toast(`${player.name} went unsold`, { icon: '❌' })
    })

    socket.on('bid_error', ({ message }) => {
      toast.error(message)
    })

    socket.on('auction_ended', () => {
      setAuctionStatus('ended')
      toast.success('Auction ended! 🎉')
    })

    socket.on('user_joined', ({ user, message }) => {
      toast(message, { icon: '👋' })
    })
  }

  const startAuction = () => {
    socketRef.current?.emit('start_auction', { roomCode })
  }

  const placeBid = () => {
    if (bidAmount <= currentBid) return toast.error('Bid must be higher than current bid!')
    socketRef.current?.emit('place_bid', { roomCode, amount: bidAmount, user })
  }

  const markUnsold = () => {
    socketRef.current?.emit('mark_unsold', { roomCode })
  }

  const nextPlayer = () => {
    socketRef.current?.emit('next_player', { roomCode })
  }

  const isHost = room?.hostId?._id === user?._id || room?.hostId === user?._id

  const getTimerColor = () => {
    if (timeLeft > 15) return 'text-green-600'
    if (timeLeft > 8) return 'text-yellow-500'
    return 'text-red-500'
  }

  const renderStats = (player) => {
    if (!player) return null
    if (player.role === 'Batsman') return (
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[['Innings', player.battingStats?.innings], ['Runs', player.battingStats?.runs],
          ['SR', player.battingStats?.strikeRate], ['Avg', player.battingStats?.average],
          ['HS', player.battingStats?.highScore], ['50s/100s', `${player.battingStats?.fifties}/${player.battingStats?.hundreds}`]
        ].map(([label, val]) => (
          <div key={label} className="bg-green-50 rounded-xl p-2 text-center">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-bold text-[#14532D]">{val}</p>
          </div>
        ))}
      </div>
    )
    if (player.role === 'Bowler') return (
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[['Innings', player.bowlingStats?.innings], ['Wickets', player.bowlingStats?.wickets],
          ['Economy', player.bowlingStats?.economy], ['Average', player.bowlingStats?.average],
          ['Best', player.bowlingStats?.bestFigures], ['4W', player.bowlingStats?.fourWickets]
        ].map(([label, val]) => (
          <div key={label} className="bg-green-50 rounded-xl p-2 text-center">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-bold text-[#14532D]">{val}</p>
          </div>
        ))}
      </div>
    )
    if (player.role === 'All-rounder') return (
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[['Innings', player.allRounderStats?.innings], ['Runs', player.allRounderStats?.runs],
          ['SR', player.allRounderStats?.strikeRate], ['Wickets', player.allRounderStats?.wickets],
          ['Economy', player.allRounderStats?.economy]
        ].map(([label, val]) => (
          <div key={label} className="bg-green-50 rounded-xl p-2 text-center">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-bold text-[#14532D]">{val}</p>
          </div>
        ))}
      </div>
    )
    if (player.role === 'Wicket-keeper') return (
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[['Innings', player.keeperStats?.innings], ['Runs', player.keeperStats?.runs],
          ['SR', player.keeperStats?.strikeRate], ['Average', player.keeperStats?.average],
          ['Dismissals', player.keeperStats?.dismissals]
        ].map(([label, val]) => (
          <div key={label} className="bg-green-50 rounded-xl p-2 text-center">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-bold text-[#14532D]">{val}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navbar */}
      <nav className="bg-[#14532D] text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">BidExpert11 🏏</h1>
        <div className="flex items-center gap-4">
          <span className="text-green-200 text-sm">Room: <span className="font-bold text-white">{roomCode}</span></span>
          {auctionStatus === 'active' && (
            <span className={`text-2xl font-bold ${getTimerColor()}`}>{timeLeft}s</span>
          )}
        </div>
      </nav>

      {/* Waiting state */}
      {auctionStatus === 'waiting' && (
        <div className="max-w-2xl mx-auto mt-20 text-center px-4">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-[#14532D] mb-2">Waiting for auction to start...</h2>
          <p className="text-gray-500 mb-8">The host will start the auction shortly</p>
          {isHost && (
            <button onClick={startAuction}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-10 py-4 rounded-2xl text-lg transition shadow-lg">
              🚀 Start Auction
            </button>
          )}
        </div>
      )}

      {/* Active auction */}
      {auctionStatus === 'active' && (
        <div className="max-w-5xl mx-auto px-4 py-6">
          {showSold && lastSold ? (
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-8 text-center mb-6 animate-pulse">
              <p className="text-4xl mb-2">🎉 SOLD!</p>
              <p className="text-2xl font-bold text-[#14532D]">{lastSold.player.name}</p>
              <p className="text-gray-600">sold to <span className="font-bold">{lastSold.soldTo.name}</span> for</p>
              <p className="text-3xl font-bold text-green-600">₹{lastSold.soldPrice} Cr</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Player Card */}
              {currentPlayer && (
                <div className="bg-white rounded-2xl shadow p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#14532D] flex items-center justify-center text-white text-2xl font-bold">
                      {currentPlayer.name?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{currentPlayer.name}</h3>
                      <p className="text-gray-500">{currentPlayer.country} • {currentPlayer.age} yrs</p>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                        {currentPlayer.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Base Price</p>
                  <p className="text-lg font-bold text-[#14532D]">₹{currentPlayer.basePrice} Cr</p>
                  {renderStats(currentPlayer)}
                </div>
              )}

              {/* Bid Panel */}
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="text-center mb-6">
                  <p className="text-gray-500 text-sm">Current Bid</p>
                  <p className="text-5xl font-bold text-[#14532D]">₹{currentBid} Cr</p>
                  {currentLeader && (
                    <p className="text-gray-500 mt-1">by <span className="font-bold text-green-700">{currentLeader.name}</span></p>
                  )}
                </div>

                {/* Timer */}
                <div className="text-center mb-6">
                  <p className={`text-4xl font-bold ${getTimerColor()}`}>{timeLeft}s</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full transition-all ${timeLeft > 15 ? 'bg-green-500' : timeLeft > 8 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${(timeLeft / 30) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Bid Input */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Quick bid buttons */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1, 2, 5].map(inc => (
                    <button key={inc} onClick={() => setBidAmount(currentBid + inc)}
                      className="bg-green-50 hover:bg-green-100 text-green-800 font-bold py-2 rounded-xl transition text-sm">
                      +{inc} Cr
                    </button>
                  ))}
                </div>

                <button onClick={placeBid}
                  className="w-full bg-[#14532D] hover:bg-green-900 text-white font-bold py-4 rounded-xl text-lg transition">
                  🏏 Place Bid
                </button>

                {/* Host controls */}
                {isHost && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button onClick={markUnsold}
                      className="bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 rounded-xl transition text-sm">
                      ❌ Unsold
                    </button>
                    <button onClick={nextPlayer}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 rounded-xl transition text-sm">
                      ⏭️ Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sold players list */}
          {soldPlayers.length > 0 && (
            <div className="bg-white rounded-2xl shadow p-6 mt-6">
              <h3 className="font-bold text-gray-800 mb-3">Sold Players ({soldPlayers.length})</h3>
              <div className="space-y-2">
                {soldPlayers.map((s, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-800">{s.player.name}</span>
                    <span className="text-sm text-gray-500">{s.soldTo.name}</span>
                    <span className="font-bold text-green-700">₹{s.soldPrice} Cr</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Auction ended */}
      {auctionStatus === 'ended' && (
        <div className="max-w-2xl mx-auto mt-20 text-center px-4">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-[#14532D] mb-2">Auction Complete!</h2>
          <p className="text-gray-500 mb-4">{soldPlayers.length} players sold</p>
          <button onClick={() => navigate('/dashboard')}
            className="bg-[#14532D] text-white font-bold px-8 py-3 rounded-xl">
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  )
}

export default Auction