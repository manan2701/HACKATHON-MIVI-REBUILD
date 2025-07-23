import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import ProductPage from '../pages/Product'
import ProductDetail from '../pages/ProductDetail'
import NavBar from '../components/NavBar'


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
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={""} />
        </Routes>
    </div>
  )
}

export default Mainroutes