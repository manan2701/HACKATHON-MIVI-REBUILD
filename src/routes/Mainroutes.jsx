import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import ProductPage from '../pages/Product'
import ProductDetail from '../pages/ProductDetail'
import NavBar from '../components/NavBar'
import Cart from '../pages/Cart'
import Footer from '../components/Footer'
import { useState } from 'react'

const Mainroutes = () => {
  const location = useLocation()
  const [isLoginPage, setisLoginPage] = useState(false)
  useEffect(() => {
    if(location.pathname === '/login'){
      setisLoginPage(true)
    }else{
      setisLoginPage(false)
    }
  }, [location.pathname])
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
            <Route path="/cart" element={<Cart />} />
        </Routes>
      {isLoginPage ? "" : <Footer />}
    </div>
  )
}

export default Mainroutes