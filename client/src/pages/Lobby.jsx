import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Lobby = () => {
  const { roomCode } = useParams()
  const auth = useAuth()

  const user = auth.user || JSON.parse(localStorage.getItem('user'))
  const token = auth.token || localStorage.getItem('token')

  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchRoom = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/rooms/${roomCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setRoom(data)
    } catch (error) {
      toast.error('Room not found!')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoom()
  }, [roomCode])

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode)
    toast.success('Room code copied!')
  }

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=Join my BidExpert11 auction! Room code: ${roomCode}`,
      '_blank'
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#14532D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading room...</p>
        </div>
      </div>
    )
  }

  const isHost =
    room?.hostId?._id === user?._id ||
    room?.hostId === user?._id
console.log("USER", user)
console.log("ROOM HOST", room?.hostId)
console.log("ISHOST", isHost)
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="bg-[#141414] border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#14532D] rounded-lg flex items-center justify-center">
            <span className="text-sm">🏏</span>
          </div>

          <h1 className="text-xl font-bold text-white">
            BidExpert<span className="text-[#F59E0B]">11</span>
          </h1>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-500 hover:text-white text-sm transition"
        >
          Back to Dashboard
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                Auction Room
              </p>

              <h2 className="text-2xl font-bold text-white">
                {room?.name}
              </h2>

              <div className="flex items-center gap-4 mt-2">
                <span className="text-gray-500 text-sm">
                  Host:{' '}
                  <span className="text-gray-300 font-medium">
                    {room?.hostId?.name}
                  </span>
                </span>

                <span className="text-gray-500 text-sm">
                  Purse:{' '}
                  <span className="text-[#F59E0B] font-bold">
                    ₹{room?.pursePerTeam} Cr
                  </span>
                </span>

                <span className="text-gray-500 text-sm">
                  Timer:{' '}
                  <span className="text-white font-medium">
                    {room?.bidTimer || 15}s
                  </span>
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-gray-600 text-xs mb-1">Room Code</p>

              <p className="text-3xl font-bold tracking-widest text-[#F59E0B]">
                {roomCode}
              </p>

              <button
                onClick={copyCode}
                className="mt-2 bg-[#1a1a1a] border border-white/10 hover:border-white/20 text-gray-400 hover:text-white px-3 py-1 rounded-lg text-xs transition"
              >
                Copy Code
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold">Participants</h3>

            <span className="bg-[#14532D]/20 text-[#14532D] text-xs font-bold px-3 py-1 rounded-full border border-[#14532D]/30">
              {room?.participants?.length || 0} joined
            </span>
          </div>

          <div className="space-y-3">
            {room?.participants?.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-xl border border-white/5"
              >
                <div className="w-10 h-10 rounded-full bg-[#14532D] flex items-center justify-center text-white font-bold text-sm">
                  {p.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-white text-sm">
                    {p.name}
                  </p>

                  <p className="text-xs text-gray-600">
                    {p.email}
                  </p>
                </div>

                {room?.hostId?._id === p._id && (
                  <span className="bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-bold px-2 py-1 rounded-full border border-[#F59E0B]/20">
                    HOST
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-bold mb-1">
            Invite Friends
          </h3>

          <p className="text-gray-600 text-sm mb-4">
            Share the room code to invite others
          </p>

          <div className="flex gap-3">
            <button
              onClick={copyCode}
              className="flex-1 bg-[#1a1a1a] border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium py-3 rounded-xl transition text-sm"
            >
              Copy Room Code
            </button>

            <button
              onClick={shareWhatsApp}
              className="flex-1 bg-green-900/30 border border-green-800/30 hover:border-green-700/50 text-green-400 font-medium py-3 rounded-xl transition text-sm"
            >
              Share on WhatsApp
            </button>
          </div>
        </div>

        {isHost && (
          <button
            onClick={() => navigate(`/auction/${roomCode}`)}
            className="w-full bg-[#F59E0B] hover:bg-yellow-500 text-black font-bold py-4 rounded-2xl text-lg transition shadow-lg shadow-yellow-900/20"
          >
            🚀 Start Auction
          </button>
        )}

        {!isHost && (
          <div className="text-center py-4">
            <div className="w-2 h-2 bg-[#14532D] rounded-full animate-pulse inline-block mr-2" />

            <span className="text-gray-500 text-sm">
              Waiting for host to start the auction...
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lobby