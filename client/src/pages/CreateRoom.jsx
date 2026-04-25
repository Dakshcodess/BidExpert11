import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateRoom = () => {
  const [form, setForm] = useState({ name: '', pursePerTeam: 100 })
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:5000/api/rooms/create', form, {
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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-[#14532D] mb-2 text-center">Create Auction Room</h2>
        <p className="text-gray-500 text-center mb-6">Set up your cricket auction</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
            <input
              type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="e.g. IPL Auction 2025" required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

         <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Purse per Team (₹ Crores)
  </label>
  <select
    name="pursePerTeam"
    value={form.pursePerTeam}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
  >
    <option value="100">₹ 100 Crores</option>
    <option value="125">₹ 125 Crores</option>
    <option value="150">₹ 150 Crores</option>
    <option value="175">₹ 175 Crores</option>
    <option value="200">₹ 200 Crores</option>
    <option value="225">₹ 225 Crores</option>
    <option value="250">₹ 250 Crores</option>
  </select>
  <p className="text-xs text-gray-400 mt-1">Each team gets this virtual budget to bid</p>
</div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-[#14532D] hover:bg-green-900 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            {loading ? 'Creating...' : '🏟️ Create Room'}
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

export default CreateRoom