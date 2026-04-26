import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(form.email, form.password)
    if (result.success) {
      toast.success('Welcome back!')
      navigate('/dashboard')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#14532D] opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#14532D] rounded-2xl mb-4 shadow-lg shadow-green-900/50">
            <span className="text-3xl">🏏</span>
          </div>
          <h1 className="text-3xl font-bold text-white">BidExpert<span className="text-[#F59E0B]">11</span></h1>
          <p className="text-gray-400 mt-1 text-sm">Fantasy Cricket Auction Platform</p>
        </div>

        {/* Card */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Sign in to your account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="Enter your email" required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#14532D] focus:ring-1 focus:ring-[#14532D] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <input
                type="password" name="password" value={form.password} onChange={handleChange}
                placeholder="Enter your password" required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#14532D] focus:ring-1 focus:ring-[#14532D] transition"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-[#14532D] hover:bg-green-800 text-white font-bold py-3 rounded-xl transition duration-200 mt-2 shadow-lg shadow-green-900/30"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#F59E0B] font-semibold hover:text-yellow-400 transition">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login