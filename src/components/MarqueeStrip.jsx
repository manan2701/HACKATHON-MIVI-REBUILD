import React from 'react';
import './MarqueeStrip.css';

const MarqueeStrip = ({ texts = ["Proudly Made in India", "Premium Audio", "Best-in-class Sound", "2 Year Warranty", "Free Shipping"], repeat = 3 }) => {
  // Create an array with repeated text items
  const allItems = [];
  
  // Repeat the array of texts 'repeat' times
  for (let i = 0; i < repeat; i++) {
    texts.forEach((text, index) => {
      allItems.push(
        <span key={`${i}-${index}`} className="marquee-item">{text}</span>
      );
    });
  }
  
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {allItems}
        {/* Duplicate all items for seamless looping */}
        {allItems}
      </div>
    </div>
  );
};

export default MarqueeStrip; 