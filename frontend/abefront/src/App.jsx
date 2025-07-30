import React from 'react'
import AddEmployee from './pages/AddEmployee'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div>
<Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-employee" element={<AddEmployee />} />
</Routes>

    </div>
  )
}

export default App