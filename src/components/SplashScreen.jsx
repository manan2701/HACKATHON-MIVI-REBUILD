import React from 'react';
import './SplashScreen.css';

const SplashScreen = ({ visible }) => (
  <div className={`splash-overlay${visible ? ' visible' : ''}`}>
    <div className="splash-content">
      <img src="https://www.mivi.in/cdn/shop/files/WhatsApp_Image_2024-09-25_at_14.24.21_1.avif?v=1750936057&width=113" alt="Mivi Logo" className="splash-logo" />
      <div className="splash-spinner"></div>
      <div className="splash-text">Loading...</div>
    </div>
  </div>
);

export default SplashScreen; 