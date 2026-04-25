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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-800 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">BidExpert11 🏏</h1>
        <div className="flex items-center gap-4">
          <span className="text-green-200">Welcome, {user?.name || 'Player'}!</span>
          <button
            onClick={handleLogout}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-16 px-4 text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-4">Welcome to BidExpert11! 🏏</h2>
        <p className="text-gray-500 text-lg mb-8">Your fantasy cricket auction platform</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow p-8 hover:shadow-lg transition cursor-pointer border-2 border-transparent hover:border-green-500">
            <div className="text-5xl mb-4">🏟️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Create Auction Room</h3>
            <p className="text-gray-500">Host a cricket auction and invite your friends</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8 hover:shadow-lg transition cursor-pointer border-2 border-transparent hover:border-green-500">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Join Auction Room</h3>
            <p className="text-gray-500">Enter a room code and start bidding!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard