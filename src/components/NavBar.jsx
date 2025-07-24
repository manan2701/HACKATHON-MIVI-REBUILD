import React, { useEffect, useState, useRef } from "react";
import "./NavBar.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const FloatingNavbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navbarRef = useRef(null);
  const user = useSelector((state) => state.userReducer.user);
  
  // Toggle navbar visibility on button click
  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
    if (!isNavVisible) {
      setMenuOpen(false); // Close menu when hiding navbar
    }
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

  const handleNavLinkClick = () => {
    if (isMobile || isTablet) {
      setMenuOpen(false);
    }
  };

  // Check device screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 480 && width < 992);
      
      // Show navbar for desktop, hide for mobile/tablet by default
      if (width >= 992) {
        setIsNavVisible(true);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Control navbar visibility based on scroll direction
  useEffect(() => {
    const controlNavbar = () => {
      if (isMobile || isTablet) return; // Don't control navbar visibility on mobile/tablet
      
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down - hide navbar
        setIsNavVisible(false);
        // Also close mobile menu when hiding navbar
        if (menuOpen) setMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsNavVisible(true);
      }
      
      // Always show navbar at the top of the page
      if (currentScrollY === 0) {
        setIsNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, menuOpen, isMobile, isTablet]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <button 
        className={`nav-toggle ${isNavVisible ? 'nav-toggle-hide' : 'nav-toggle-show'}`}
        onClick={toggleNav} 
      >
        <i className={`ri-arrow-${isNavVisible ? 'left' : 'right'}-s-line`}></i>
      </button>

      <nav 
        ref={navbarRef}
        className={`navbar ${isNavVisible ? "navbar-visible" : ""}`}
      >
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="/" onClick={handleLogoClick} className="logo-link">
              <img
                src="https://www.mivi.in/cdn/shop/files/WhatsApp_Image_2024-09-25_at_14.24.21_1.avif?v=1750936057&width=113"
                alt="Mivi logo"
              />
            </a>
          </div>
          <div className="navbar-separator"></div>

          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <NavLink 
              to="/products/68811f5d6d73fd0ed63ec56d" 
              className={({isActive}) => isActive ? "navbar-link navbar-link-active Ai-buds-link" : "navbar-link Ai-buds-link"} 
              onClick={handleNavLinkClick} 
              style={{"--i": 1}}
            >
              <p>Ai-Buds</p>
            </NavLink>
            <NavLink 
              to="/products" 
              className="navbar-link products-link" 
              onClick={handleNavLinkClick} 
              style={{"--i": 2}}
            >
              <p>Products</p>
            </NavLink>
            <NavLink to="/about" className="navbar-link about-link" onClick={handleNavLinkClick} style={{"--i": 3}}>
              <p>About Us</p>
            </NavLink>
            <NavLink to="/contact" className="navbar-link contact-link" onClick={handleNavLinkClick} style={{"--i": 4}}>
              <p>Contact Us</p>
            </NavLink>
          </div>
        </div>
        
        <div className="navbar-profile">
          <Link to="/cart" className="cart-icon">
            <i className="ri-shopping-cart-line"></i>
          </Link>
          <Link to={user ? "/profile" : "/login"} className="user-icon">
            <i className="ri-user-line"></i>
          </Link>
        </div>
        
        <div 
          className={`hamburger-menu ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </>
  );
};

export default FloatingNavbar;
