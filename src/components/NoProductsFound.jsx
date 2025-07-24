import React from 'react';
import { Link } from 'react-router-dom';
import './NoProductsFound.css';

const NoProductsFound = ({ 
  title = "No Products Found", 
  message = "Try adjusting your filters or browse a different category.", 
  buttonText = "Back to Products",
  buttonLink = "/products",
  showButton = true,
  onButtonClick = null
}) => {
  return (
    <div className="no-products-container">
      <div className="no-products-content">
        <div className="no-products-icon">
          <div className="icon-circle">
            <i className="ri-shopping-bag-line"></i>
          </div>
        </div>
        <h2 className="no-products-title">{title}</h2>
        <p className="no-products-message">{message}</p>
        
        {showButton && (
          onButtonClick ? (
            <button onClick={onButtonClick} className="no-products-button">
              <i className="ri-arrow-left-line"></i>
              {buttonText}
            </button>
          ) : (
            <Link to={buttonLink} className="no-products-button">
              <i className="ri-arrow-left-line"></i>
              {buttonText}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default NoProductsFound; 