import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Lobby = () => {
  const { roomCode } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchRoom = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/rooms/${roomCode}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
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

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <p className="text-gray-500 text-lg">Loading room...</p>
    </div>
  )

  const isHost = room?.hostId?._id === user?._id || room?.hostId === user?._id

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navbar */}
      <nav className="bg-[#14532D] text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">BidExpert11 🏏</h1>
        <button onClick={() => navigate('/dashboard')} className="text-green-200 hover:text-white text-sm">
          ← Back to Dashboard
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Room Info */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#14532D]">{room?.name}</h2>
              <p className="text-gray-500 mt-1">Hosted by <span className="font-medium">{room?.hostId?.name}</span></p>
              <p className="text-gray-500">Purse per team: <span className="font-bold text-green-700">₹{room?.pursePerTeam} Cr</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Room Code</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold tracking-widest text-[#14532D]">{roomCode}</span>
                <button onClick={copyCode} className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-lg text-sm font-medium transition">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Participants ({room?.participants?.length || 0})
          </h3>
          <div className="space-y-3">
            {room?.participants?.map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#14532D] flex items-center justify-center text-white font-bold">
                  {p.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.email}</p>
                </div>
                {room?.hostId?._id === p._id && (
                  <span className="ml-auto bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full">HOST</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Invite Friends</h3>
          <p className="text-gray-500 text-sm mb-3">Share this code with your friends to join the auction</p>
          <div className="flex gap-3">
            <button onClick={copyCode}
              className="flex-1 bg-[#14532D] text-white font-medium py-3 rounded-xl hover:bg-green-900 transition">
              📋 Copy Room Code
            </button>
            <a href={`https://wa.me/?text=Join my BidExpert11 auction! Room code: ${roomCode}`}
              target="_blank" rel="noreferrer"
              className="flex-1 bg-green-500 text-white font-medium py-3 rounded-xl hover:bg-green-600 transition text-center">
              💬 Share on WhatsApp
            </a>
          </div>
        </div>

        {/* Host Start Button */}
        {isHost && (
          <button
            onClick={() => toast.success('Auction starting soon! (Coming in Week 5)')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-2xl text-lg transition shadow-lg"
          >
            🚀 Start Auction
          </button>
        )}
      </div>
    </div>
  )
}

export default Lobby