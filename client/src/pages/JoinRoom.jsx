import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState('')
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (roomCode.length !== 6) return toast.error('Room code must be 6 characters!')
    setLoading(true)
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/rooms/join`,
        { roomCode: roomCode.toUpperCase() },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success('Joined room successfully!')
      navigate(`/room/${data.roomCode}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to join room')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F59E0B] opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl mb-4">
            <span className="text-3xl">🎯</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Join Auction Room</h1>
          <p className="text-gray-500 mt-1 text-sm">Enter the 6-character room code</p>
        </div>

        {/* Card */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3 text-center">Room Code</label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="AB12CD"
                maxLength={6}
                required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 text-center text-3xl font-bold tracking-[0.5em] text-[#F59E0B] placeholder-gray-700 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition uppercase"
              />
              <p className="text-center text-gray-600 text-xs mt-2">{roomCode.length}/6 characters</p>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-[#F59E0B] hover:bg-yellow-500 text-black font-bold py-3 rounded-xl transition shadow-lg shadow-yellow-900/20"
            >
              {loading ? 'Joining...' : '🎯 Join Room'}
            </button>

            <button
              type="button" onClick={() => navigate('/dashboard')}
              className="w-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 font-medium py-3 rounded-xl transition"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JoinRoom