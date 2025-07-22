import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../components/Login'
import NavBar from '../components/NavBar'
import Profile from '../components/Profile'
import ProductPage from '../components/ProductListing'

const Mainroutes = () => {
  
  return (
    <div>
       <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/about" element={""} />
            <Route path="/contact" element={""} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/cart" element={""} />
        </Routes>
    </div>
  )
}

export default Mainroutes