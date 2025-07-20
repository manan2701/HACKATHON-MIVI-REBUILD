import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

const FloatingNavbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    
    // If already on home page, scroll to top
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      // Navigate to home page and then scroll to top
      navigate("/");
      // The scroll to top will happen automatically due to the LenisWrapper
    }
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
            <a href="/" onClick={handleLogoClick}>
              <img
                src="https://www.mivi.in/cdn/shop/files/WhatsApp_Image_2024-09-25_at_14.24.21_1.avif?v=1750936057&width=113"
                alt="logo"
              />
            </a>
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
            <a className="navbar-link" href="#"><p>Products</p></a>
            <a className="navbar-link" href="#"><p>About Us</p></a>
            <a className="navbar-link" href="#"><p>Contact Us</p></a>
          </div>
        </div>
        <div className="navbar-profile">
          <i className="ri-shopping-cart-line"></i>
          <Link to="/login">
            <i className="ri-user-line"></i>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default FloatingNavbar;
