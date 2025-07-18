import React from 'react'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <img src="https://www.mivi.in/cdn/shop/files/WhatsApp_Image_2024-09-25_at_14.24.21_1.avif?v=1750936057&width=113" alt="logo" />
      </div>
      <div className='navbar-links'>
        <a href="#">Products</a>
        <a href="#">About Us</a>
      </div>
      <div className='navbar-profile'>
        <div className="profile">
          <i className="ri-shopping-cart-line"></i>
          <i className="ri-user-line"></i>
        </div>
      </div>
    </nav>
  )
}

export default NavBar