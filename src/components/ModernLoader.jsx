import React from 'react';
import './ModernLoader.css';

const ModernLoader = ({ overlay = false, small = false }) => {
  return (
    <div className={`loader-wrapper ${overlay ? 'overlay' : ''} ${small ? 'small' : ''}`}>
      <div className="loader-bounce"></div>
    </div>
  );
};

export default ModernLoader;
