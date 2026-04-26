import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navbar */}
      <nav className="bg-[#141414] border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#14532D] rounded-lg flex items-center justify-center">
            <span className="text-sm">🏏</span>
          </div>
          <h1 className="text-xl font-bold text-white">
            BidExpert<span className="text-[#F59E0B]">11</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#14532D] flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-300 text-sm hidden md:block">{user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="border border-white/10 text-gray-400 hover:text-white hover:border-white/30 px-4 py-2 rounded-lg text-sm transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Welcome */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white">
            Welcome back, <span className="text-[#F59E0B]">{user?.name}</span> 👋
          </h2>
          <p className="text-gray-500 mt-1">Ready to start your fantasy cricket auction?</p>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Create Room */}
          <div
            onClick={() => navigate('/create-room')}
            className="bg-[#141414] border border-white/10 rounded-2xl p-8 cursor-pointer hover:border-[#14532D] hover:shadow-lg hover:shadow-green-900/20 transition-all group"
          >
            <div className="w-14 h-14 bg-[#14532D]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#14532D]/40 transition">
              <span className="text-3xl">🏟️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Create Auction Room</h3>
            <p className="text-gray-500 text-sm">Host a cricket auction and invite your friends to bid</p>
            <div className="mt-5 flex items-center gap-2 text-[#14532D] font-medium text-sm group-hover:gap-3 transition-all">
              <span>Get Started</span>
              <span>→</span>
            </div>
          </div>

          {/* Join Room */}
          <div
            onClick={() => navigate('/join-room')}
            className="bg-[#141414] border border-white/10 rounded-2xl p-8 cursor-pointer hover:border-[#F59E0B] hover:shadow-lg hover:shadow-yellow-900/20 transition-all group"
          >
            <div className="w-14 h-14 bg-[#F59E0B]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#F59E0B]/20 transition">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Join Auction Room</h3>
            <p className="text-gray-500 text-sm">Enter a room code and start bidding on your favourite players</p>
            <div className="mt-5 flex items-center gap-2 text-[#F59E0B] font-medium text-sm group-hover:gap-3 transition-all">
              <span>Join Now</span>
              <span>→</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Bid Increments', value: '25L / 50L / 75L', icon: '💰' },
            { label: 'Max Purse', value: '₹250 Cr', icon: '👛' },
            { label: 'Players Available', value: '30+', icon: '🏏' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#141414] border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p className="text-white font-bold text-sm">{stat.value}</p>
              <p className="text-gray-600 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard