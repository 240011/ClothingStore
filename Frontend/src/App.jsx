"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./components/Homepage"
import UserLogin from "./components/UserLogin"
import Signup from "./components/Signup"
import Cart from "./components/Cart"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
