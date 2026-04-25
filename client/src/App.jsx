import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="text-3xl font-bold text-center mt-20 text-green-600">BidExpert11 🏏</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App