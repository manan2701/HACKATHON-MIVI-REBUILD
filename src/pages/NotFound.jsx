import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="back-home-btn">
          <span>Back to Home</span>
          <i className="ri-arrow-right-line"></i>
        </Link>
      </div>
      <div className="not-found-animation">
        <div className="circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
        <div className="headphones-container">
          <div className="headphone-icon">
            <i className="ri-headphone-line"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 