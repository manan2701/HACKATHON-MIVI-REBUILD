import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import ProductPage from '../pages/Product'
import ProductDetail from '../pages/ProductDetail'
import Contact from '../pages/Contact'
import NavBar from '../components/NavBar'
import Cart from '../pages/Cart'
import Footer from '../components/Footer'
import NotFound from '../pages/NotFound'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import MarqueeStrip from '../components/MarqueeStrip'
import OurStory from '../pages/OurStory'

const Mainroutes = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  
  return (
    <div>
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<OurStory />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        
        {/* Protected routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        
        {/* Auth routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {!isLoginPage && (
        <>
          <MarqueeStrip texts={[
            "Proudly Made in India", 
            "Premium Audio Experience", 
            "30-Day Money-Back Guarantee", 
            "Free Shipping on All Orders", 
            "2 Year Warranty", 
            "24/7 Customer Support"
          ]} />
          <Footer />
        </>
      )}
    </div>
  )
}

export default Mainroutes