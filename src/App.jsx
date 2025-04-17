import { Route, Routes } from 'react-router-dom'
import Crypto from './pages/Crypto'
import GainerLoser from './pages/GainerLoser'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Crypto />} />
      <Route path='/gainlose' element={<GainerLoser />} />
    </Routes>

  )
}

export default App
