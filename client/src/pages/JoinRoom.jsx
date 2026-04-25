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
      const { data } = await axios.post('http://localhost:5000/api/rooms/join',
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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-[#14532D] mb-2 text-center">Join Auction Room</h2>
        <p className="text-gray-500 text-center mb-6">Enter the 6-character room code</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Code</label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="e.g. AB12CD"
              maxLength={6}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 uppercase"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-[#14532D] hover:bg-green-900 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            {loading ? 'Joining...' : '🎯 Join Room'}
          </button>

          <button
            type="button" onClick={() => navigate('/dashboard')}
            className="w-full border border-gray-300 text-gray-600 font-medium py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default JoinRoom