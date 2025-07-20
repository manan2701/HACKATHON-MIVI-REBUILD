import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../components/Login'
import NavBar from '../components/NavBar'

const Mainroutes = () => {
  
  return (
    <div>
       <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/about" element={""} />
            <Route path="/contact" element={""} />
            <Route path="/products" element={""} />
            <Route path="/cart" element={""} />
        </Routes>
    </div>
  )
}

export default Mainroutes