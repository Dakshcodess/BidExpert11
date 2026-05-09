import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { io } from 'socket.io-client'
import toast from 'react-hot-toast'
import axios from 'axios'

const formatPrice = (val) => {
  if (!val && val !== 0) return '0'
  if (val < 1) return `₹${(val * 100).toFixed(0)} L`
  if (val % 1 === 0) return `₹${val} Cr`
  return `₹${val.toFixed(2)} Cr`
}

const roleBadge = (role) => {
  const styles = {
    'Batsman': 'bg-blue-900/20 text-blue-400 border-blue-800/30',
    'Bowler': 'bg-red-900/20 text-red-400 border-red-800/30',
    'All-rounder': 'bg-purple-900/20 text-purple-400 border-purple-800/30',
    'Wicket-keeper': 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30',
  }
  return styles[role] || 'bg-gray-900/20 text-gray-400 border-gray-800/30'
}

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
  const [timeLeft, setTimeLeft] = useState(15)
  const [maxTime, setMaxTime] = useState(15)
  const [bidAmount, setBidAmount] = useState(0)
  const [soldPlayers, setSoldPlayers] = useState([])
  const [soldNotif, setSoldNotif] = useState(null)
  const [showSoldNotif, setShowSoldNotif] = useState(false)
  const [showSidePanel, setShowSidePanel] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('')
  const [skipVotes, setSkipVotes] = useState(0)
  const [skipNeeded, setSkipNeeded] = useState(0)
  const [withdrawVotes, setWithdrawVotes] = useState(0)
  const [withdrawNeeded, setWithdrawNeeded] = useState(0)
  const [hasVotedSkip, setHasVotedSkip] = useState(false)
  const [hasVotedWithdraw, setHasVotedWithdraw] = useState(false)

  useEffect(() => {
    fetchRoom()
    connectSocket()
    return () => { if (socketRef.current) socketRef.current.disconnect() }
  }, [])

  const fetchRoom = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/rooms/${roomCode}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRoom(data)
      setMaxTime(data.bidTimer || 15)
      setTimeLeft(data.bidTimer || 15)
    } catch {
      toast.error('Room not found!')
      navigate('/dashboard')
    }
  }

  const connectSocket = () => {
    const socket = io(import.meta.env.VITE_API_URL)
    socketRef.current = socket

    socket.on('connect', () => {
      socket.emit('join_room', { roomCode, user })
    })

    socket.on('auction_started', (state) => {
      setAuctionStatus('active')
      setMaxTime(state.bidTimer || 15)
      toast.success('Auction started! 🏏')

       navigate(`/auction/${roomCode}`)
    })

    socket.on('player_up', ({ player, currentBid, timeLeft, category }) => {
      setCurrentPlayer(player)
      setCurrentBid(currentBid)
      setCurrentLeader(null)
      setTimeLeft(timeLeft)
      setMaxTime(timeLeft)
      setBidAmount(Number((currentBid + 0.25).toFixed(2)))
      setShowSoldNotif(false)
      setCurrentCategory(category || player.role)
      setSkipVotes(0)
      setWithdrawVotes(0)
      setHasVotedSkip(false)
      setHasVotedWithdraw(false)
    })

    socket.on('new_bid', ({ amount, bidder, timeLeft }) => {
      setCurrentBid(amount)
      setCurrentLeader(bidder)
      setTimeLeft(timeLeft)
      setBidAmount(Number((amount + 0.25).toFixed(2)))
      setSkipVotes(0)
      setWithdrawVotes(0)
      setHasVotedSkip(false)
      setHasVotedWithdraw(false)
      if (bidder._id !== user._id) {
        toast(`${bidder.name} bid ${formatPrice(amount)}!`, { icon: '🔥' })
      }
    })

    socket.on('votes_reset', () => {
      setSkipVotes(0)
      setWithdrawVotes(0)
      setHasVotedSkip(false)
      setHasVotedWithdraw(false)
    })

    socket.on('skip_vote_update', ({ votes, needed }) => {
      setSkipVotes(votes)
      setSkipNeeded(needed)
    })

    socket.on('withdraw_vote_update', ({ votes, needed }) => {
      setWithdrawVotes(votes)
      setWithdrawNeeded(needed)
    })

    socket.on('time_tick', ({ timeLeft }) => setTimeLeft(timeLeft))

    socket.on('player_sold', ({ player, soldTo, soldPrice }) => {
      setSoldNotif({ player, soldTo, soldPrice })
      setShowSoldNotif(true)
      setSoldPlayers(prev => [...prev, { player, soldTo, soldPrice }])
      setTimeout(() => setShowSoldNotif(false), 4000)
      if (soldTo._id === user._id) {
        toast.success(`🎉 You won ${player.name} for ${formatPrice(soldPrice)}!`)
      } else {
        toast(`${player.name} → ${soldTo.name} for ${formatPrice(soldPrice)}`, { icon: '🏏' })
      }
    })

    socket.on('player_unsold', ({ player, reason }) => {
      if (reason === 'skipped') {
        toast(`${player.name} skipped by all`, { icon: '⏭️' })
      } else {
        toast(`${player.name} went unsold`, { icon: '❌' })
      }
    })

    socket.on('bid_error', ({ message }) => toast.error(message))

    socket.on('auction_ended', () => {
      setAuctionStatus('ended')
      toast.success('Auction ended! 🎉')
    })

    socket.on('user_joined', ({ message }) => {
      toast(message, { icon: '👋' })
    })
  }

  const startAuction = () => socketRef.current?.emit('start_auction', { roomCode })

  const placeBid = () => {
    if (bidAmount <= currentBid) return toast.error('Bid must be higher than current bid!')
    socketRef.current?.emit('place_bid', { roomCode, amount: bidAmount, user })
  }

  const voteSkip = () => {
    if (hasVotedSkip) return toast.error('Already voted to skip!')
    if (currentLeader) return toast.error('Cannot skip — someone has already bid!')
    setHasVotedSkip(true)
    socketRef.current?.emit('vote_skip', { roomCode, userId: user._id })
    toast('Voted to skip ⏭️', { icon: '👍' })
  }

  const voteWithdraw = () => {
    if (hasVotedWithdraw) return toast.error('Already voted to withdraw!')
    if (!currentLeader) return toast.error('No one has bid yet!')
    if (currentLeader._id === user._id) return toast.error('You are the leader — cannot withdraw!')
    setHasVotedWithdraw(true)
    socketRef.current?.emit('vote_withdraw', { roomCode, userId: user._id })
    toast('Voted to withdraw 🏳️', { icon: '👍' })
  }

  const isHost = room?.hostId?._id === user?._id || room?.hostId === user?._id
  const isLeader = currentLeader?._id === user?._id
  const timerPercent = maxTime > 0 ? (timeLeft / maxTime) * 100 : 0
  const timerColor = timeLeft > maxTime * 0.5 ? '#14532D' : timeLeft > maxTime * 0.25 ? '#F59E0B' : '#EF4444'

  const renderStats = (player) => {
    if (!player) return null
    let stats = []
    if (player.role === 'Batsman') {
      stats = [
        ['Innings', player.battingStats?.innings],
        ['Runs', player.battingStats?.runs],
        ['SR', player.battingStats?.strikeRate],
        ['Avg', player.battingStats?.average],
        ['HS', player.battingStats?.highScore],
        ['50s/100s', `${player.battingStats?.fifties}/${player.battingStats?.hundreds}`],
      ]
    } else if (player.role === 'Bowler') {
      stats = [
        ['Innings', player.bowlingStats?.innings],
        ['Wickets', player.bowlingStats?.wickets],
        ['Economy', player.bowlingStats?.economy],
        ['Average', player.bowlingStats?.average],
        ['Best', player.bowlingStats?.bestFigures],
        ['4W', player.bowlingStats?.fourWickets],
      ]
    } else if (player.role === 'All-rounder') {
      stats = [
        ['Innings', player.allRounderStats?.innings],
        ['Runs', player.allRounderStats?.runs],
        ['SR', player.allRounderStats?.strikeRate],
        ['Wickets', player.allRounderStats?.wickets],
        ['Economy', player.allRounderStats?.economy],
      ]
    } else if (player.role === 'Wicket-keeper') {
      stats = [
        ['Innings', player.keeperStats?.innings],
        ['Runs', player.keeperStats?.runs],
        ['SR', player.keeperStats?.strikeRate],
        ['Average', player.keeperStats?.average],
        ['Dismissals', player.keeperStats?.dismissals],
      ]
    }
    return (
      <div className="grid grid-cols-3 gap-2 mt-4">
        {stats.map(([label, val]) => (
          <div key={label} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-2 text-center">
            <p className="text-xs text-gray-600">{label}</p>
            <p className="font-bold text-white text-sm">{val}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="bg-[#141414] border-b border-white/10 px-6 py-3 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#14532D] rounded-lg flex items-center justify-center">
            <span className="text-sm">🏏</span>
          </div>
          <h1 className="text-lg font-bold text-white">
            BidExpert<span className="text-[#F59E0B]">11</span>
          </h1>
          <span className="text-gray-600 text-sm hidden md:block">• {roomCode}</span>
          {currentCategory && auctionStatus === 'active' && (
            <span className={`text-xs font-bold px-2 py-1 rounded-full border ${roleBadge(currentCategory)}`}>
              {currentCategory}s
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {auctionStatus === 'active' && (
            <div className="text-2xl font-bold tabular-nums" style={{ color: timerColor }}>
              {timeLeft}s
            </div>
          )}
          <button
            onClick={() => setShowSidePanel(!showSidePanel)}
            className="bg-[#1a1a1a] border border-white/10 hover:border-white/20 text-gray-400 hover:text-white px-3 py-2 rounded-lg text-sm transition"
          >
            {showSidePanel ? '✕ Close' : '📊 Teams'}
          </button>
        </div>
      </nav>

      {showSoldNotif && soldNotif && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#141414] border border-[#F59E0B]/30 rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-4">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="text-white font-bold">{soldNotif.player.name} — SOLD!</p>
            <p className="text-gray-400 text-sm">
              to <span className="text-[#F59E0B] font-medium">{soldNotif.soldTo.name}</span> for{' '}
              <span className="text-green-400 font-bold">{formatPrice(soldNotif.soldPrice)}</span>
            </p>
          </div>
        </div>
      )}

      <div className="flex">
        <div className={`flex-1 transition-all ${showSidePanel ? 'mr-80' : ''}`}>

          {auctionStatus === 'waiting' && (
            <div className="max-w-lg mx-auto mt-24 text-center px-4">
              <div className="w-20 h-20 bg-[#14532D]/10 border border-[#14532D]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⏳</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Waiting for auction to start</h2>
              <p className="text-gray-500 mb-8">The host will start the auction shortly</p>
              {isHost && (
                <button
                  onClick={startAuction}
                  className="bg-[#F59E0B] hover:bg-yellow-500 text-black font-bold px-12 py-4 rounded-2xl text-lg transition shadow-lg shadow-yellow-900/20"
                >
                  🚀 Start Auction
                </button>
              )}
            </div>
          )}

          {auctionStatus === 'active' && (
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPlayer && (
                  <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${roleBadge(currentPlayer.role)}`}>
                        {currentPlayer.role}
                      </span>
                      <span className="text-gray-600 text-xs">{currentPlayer.country}</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#14532D] flex items-center justify-center text-white text-2xl font-bold">
                        {currentPlayer.name?.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{currentPlayer.name}</h3>
                        <p className="text-gray-500 text-sm">{currentPlayer.age} years old</p>
                        <p className="text-[#F59E0B] text-sm font-medium mt-1">
                          Base: {formatPrice(currentPlayer.basePrice)}
                        </p>
                      </div>
                    </div>
                    {renderStats(currentPlayer)}

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      {!currentLeader && (
                        <button
                          onClick={voteSkip}
                          disabled={hasVotedSkip}
                          className={`py-2 rounded-xl text-sm font-bold border transition ${
                            hasVotedSkip
                              ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
                              : 'bg-red-900/20 border-red-800/30 text-red-400 hover:bg-red-900/40'
                          }`}
                        >
                          ⏭️ Skip ({skipVotes}/{skipNeeded || room?.participants?.length || '?'})
                        </button>
                      )}
                      {currentLeader && !isLeader && (
                        <button
                          onClick={voteWithdraw}
                          disabled={hasVotedWithdraw}
                          className={`py-2 rounded-xl text-sm font-bold border transition col-span-2 ${
                            hasVotedWithdraw
                              ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
                              : 'bg-orange-900/20 border-orange-800/30 text-orange-400 hover:bg-orange-900/40'
                          }`}
                        >
                          🏳️ Withdraw ({withdrawVotes}/{withdrawNeeded || (room?.participants?.length - 1) || '?'})
                        </button>
                      )}
                      {currentLeader && isLeader && (
                        <div className="col-span-2 text-center py-2 bg-[#14532D]/10 border border-[#14532D]/20 rounded-xl">
                          <p className="text-[#14532D] text-sm font-bold">✅ You are leading — others can withdraw</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                  <div className="text-center mb-5">
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Current Bid</p>
                    <p className="text-5xl font-bold text-white">{formatPrice(currentBid)}</p>
                    {currentLeader ? (
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#14532D] flex items-center justify-center text-white text-xs font-bold">
                          {currentLeader.name?.charAt(0)}
                        </div>
                        <p className="text-gray-400 text-sm">
                          <span className="text-[#F59E0B] font-medium">{currentLeader.name}</span> is leading
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-600 text-sm mt-2">No bids yet</p>
                    )}
                  </div>

                  <div className="mb-5">
                    <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${timerPercent}%`, backgroundColor: timerColor }}
                      />
                    </div>
                    <p className="text-center text-xs text-gray-600 mt-1">{timeLeft} seconds remaining</p>
                  </div>

                  <div className="bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-center mb-3">
                    <p className="text-xs text-gray-600 mb-1">Your Bid</p>
                    <p className="text-2xl font-bold text-[#F59E0B]">{formatPrice(bidAmount)}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[0.25, 0.50, 0.75].map(inc => (
                      <button
                        key={inc}
                        onClick={() => setBidAmount(Number((currentBid + inc).toFixed(2)))}
                        className="bg-[#1a1a1a] hover:bg-[#14532D]/20 border border-white/10 hover:border-[#14532D]/30 text-gray-300 hover:text-white font-bold py-2 rounded-xl transition text-sm"
                      >
                        +{inc < 1 ? `${inc * 100}L` : `${inc}Cr`}
                      </button>
                    ))}
                  </div>

                  {!isLeader ? (
                    <button
                      onClick={placeBid}
                      className="w-full bg-[#14532D] hover:bg-green-800 text-white font-bold py-4 rounded-xl text-lg transition shadow-lg shadow-green-900/30"
                    >
                      🏏 Place Bid — {formatPrice(bidAmount)}
                    </button>
                  ) : (
                    <div className="w-full bg-[#14532D]/10 border border-[#14532D]/30 text-[#14532D] font-bold py-4 rounded-xl text-center">
                      ✅ You are leading!
                    </div>
                  )}
                </div>
              </div>

              {soldPlayers.length > 0 && (
                <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 mt-6">
                  <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                    <span>Sold Players</span>
                    <span className="bg-[#14532D]/20 text-[#14532D] text-xs px-2 py-0.5 rounded-full border border-[#14532D]/30">
                      {soldPlayers.length}
                    </span>
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {soldPlayers.map((s, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl border border-white/5">
                        <span className="font-medium text-white text-sm">{s.player.name}</span>
                        <span className="text-gray-500 text-xs">{s.soldTo.name}</span>
                        <span className="font-bold text-[#F59E0B] text-sm">{formatPrice(s.soldPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {auctionStatus === 'ended' && (
            <div className="max-w-lg mx-auto mt-24 text-center px-4">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-2xl font-bold text-white mb-2">Auction Complete!</h2>
              <p className="text-gray-500 mb-6">{soldPlayers.length} players sold</p>
              <div className="space-y-3">
                <button
                  onClick={() => window.open(`${import.meta.env.VITE_API_URL}/api/pdf/${roomCode}`, '_blank')}
                  className="w-full bg-[#F59E0B] hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition shadow-lg"
                >
                  📄 Download Auction Results PDF
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-[#14532D] hover:bg-green-800 text-white font-bold py-4 rounded-xl transition"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

        {showSidePanel && (
          <div className="fixed right-0 top-[57px] bottom-0 w-80 bg-[#141414] border-l border-white/10 overflow-y-auto z-30">
            <div className="p-4">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span>Teams & Squads</span>
                <span className="text-gray-600 text-xs font-normal">({room?.participants?.length} teams)</span>
              </h3>
              {room?.participants?.map((p, i) => {
                const teamPlayers = soldPlayers.filter(s => s.soldTo._id === p._id)
                const totalSpent = teamPlayers.reduce((sum, s) => sum + s.soldPrice, 0)
                return (
                  <div key={i} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#14532D] flex items-center justify-center text-white text-xs font-bold">
                        {p.name?.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-bold">
                          {p.name} {p._id === user._id && <span className="text-[#F59E0B] text-xs">(you)</span>}
                        </p>
                        <p className="text-gray-600 text-xs">
                          {teamPlayers.length} players • Spent: {formatPrice(totalSpent)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1 mt-2">
                      {teamPlayers.map((s, j) => (
                        <div key={j} className="flex justify-between items-center">
                          <span className="text-gray-400 text-xs">{s.player.name}</span>
                          <span className={`text-xs font-bold px-1 rounded ${roleBadge(s.player.role)}`}>
                            {s.player.role?.charAt(0)}
                          </span>
                          <span className="text-[#F59E0B] text-xs font-medium">{formatPrice(s.soldPrice)}</span>
                        </div>
                      ))}
                      {teamPlayers.length === 0 && (
                        <p className="text-gray-700 text-xs text-center py-1">No players yet</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Auction