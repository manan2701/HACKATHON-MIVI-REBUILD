import React, { useEffect, useState } from "react";
import "./NavBar.css";

const FloatingNavbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0 && isNavVisible) {
        setIsNavVisible(false);
        setMenuOpen(false); // Close menu when hiding navbar
      }
      if (currentScrollY === 0 && !isNavVisible) {
        setIsNavVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isNavVisible]);

  return (
    <>
      {!isNavVisible && (
        <button className="nav-toggle" onClick={toggleNav}>
          <i className="ri-arrow-up-s-line"></i>
        </button>
      )}
      <nav className={`navbar ${isNavVisible ? "navbar-visible" : ""} `}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <img
              src="https://www.mivi.in/cdn/shop/files/WhatsApp_Image_2024-09-25_at_14.24.21_1.avif?v=1750936057&width=113"
              alt="logo"
            />
          </div>
          <div className="navbar-separator"></div>

          <div 
            className={`hamburger-menu ${menuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <a href="#"><p>Products</p></a>
            <a href="#"><p>About Us</p></a>
            <a href="#"><p>Contact Us</p></a>
          </div>
        </div>
        <div className="navbar-profile">
          <i className="ri-shopping-cart-line"></i>
          <i className="ri-user-line"></i>
        </div>
      </nav>
    </>
  );
};

export default FloatingNavbar;
