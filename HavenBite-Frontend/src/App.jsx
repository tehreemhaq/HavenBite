import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import GeneratedRecipeResult from './pages/Recipe'
import Profile from './pages/Profile'

const App = () => {
  return (
      <Routes>

      {/* Pages WITH navbar + footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path = "/recipe" element={<GeneratedRecipeResult />} />
        
      </Route>

      {/* Pages WITHOUT navbar + footer */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/profile" element={<Profile />} />
      </Route>

    </Routes>




  )
}

export default App