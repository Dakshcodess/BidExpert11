import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateRoom from './pages/CreateRoom'
import JoinRoom from './pages/JoinRoom'
import Lobby from './pages/Lobby'
import Auction from './pages/Auction'
import { useState, useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/create-room" element={<ProtectedRoute><CreateRoom /></ProtectedRoute>} />
      <Route path="/join-room" element={<ProtectedRoute><JoinRoom /></ProtectedRoute>} />
      <Route path="/room/:roomCode" element={<ProtectedRoute><Lobby /></ProtectedRoute>} />
      <Route path="/auction/:roomCode" element={<ProtectedRoute><Auction /></ProtectedRoute>} />
    </Routes>
  )
}

function App() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
      setShowInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') setShowInstall(false)
    setInstallPrompt(null)
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppRoutes />

        {showInstall && (
          <button
            onClick={handleInstall}
            className="fixed bottom-4 right-4 z-50 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 transition-all"
          >
            📲 Install App
          </button>
        )}
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App