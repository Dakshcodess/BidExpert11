import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateRoom = () => {
  const [form, setForm] = useState({ name: '', pursePerTeam: 100, bidTimer: 15 })
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/rooms/create`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success(`Room created! Code: ${data.roomCode}`)
      navigate(`/room/${data.roomCode}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create room')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#14532D] opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#14532D] rounded-2xl mb-4 shadow-lg shadow-green-900/50">
            <span className="text-3xl">🏟️</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Create Auction Room</h1>
          <p className="text-gray-500 mt-1 text-sm">Set up your cricket auction</p>
        </div>

        {/* Card */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Room Name */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Room Name</label>
              <input
                type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. IPL Auction 2025" required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#14532D] focus:ring-1 focus:ring-[#14532D] transition"
              />
            </div>

            {/* Purse */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Purse per Team</label>
              <select
                name="pursePerTeam" value={form.pursePerTeam} onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#14532D] focus:ring-1 focus:ring-[#14532D] transition"
              >
                <option value="100">₹ 100 Crores</option>
                <option value="125">₹ 125 Crores</option>
                <option value="150">₹ 150 Crores</option>
                <option value="175">₹ 175 Crores</option>
                <option value="200">₹ 200 Crores</option>
                <option value="225">₹ 225 Crores</option>
                <option value="250">₹ 250 Crores</option>
              </select>
            </div>

            {/* Bid Timer */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Bid Timer</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '10', label: '⚡ 10 Seconds', sub: 'Fast' },
                  { value: '15', label: '⏱️ 15 Seconds', sub: 'Standard' },
                ].map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => setForm({ ...form, bidTimer: opt.value })}
                    className={`cursor-pointer rounded-xl p-4 border-2 text-center transition ${
                      form.bidTimer == opt.value
                        ? 'border-[#14532D] bg-[#14532D]/10'
                        : 'border-white/10 bg-[#1a1a1a] hover:border-white/20'
                    }`}
                  >
                    <p className="text-white font-bold text-sm">{opt.label}</p>
                    <p className="text-gray-500 text-xs mt-1">{opt.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Room Summary</p>
              <div className="space-y-2">
                {[
                  ['Purse per team', `₹${form.pursePerTeam} Cr`],
                  ['Bid timer', `${form.bidTimer} seconds`],
                  ['Bid increments', '₹25L / ₹50L / ₹75L'],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="text-white font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-[#14532D] hover:bg-green-800 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-green-900/30"
            >
              {loading ? 'Creating...' : '🏟️ Create Room'}
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

export default CreateRoom