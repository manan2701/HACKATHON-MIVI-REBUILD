import React from 'react';
import { toast as toastOriginal, ToastContainer as ToastContainerOriginal, Bounce } from 'react-toastify';
import './CustomToast.css';

export const ToastContainer = (props) => {
  return (
    <ToastContainerOriginal
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      closeButton={CustomCloseButton}
      transition={Bounce}
      limit={3}
      {...props}
    />
  );
};

const CustomCloseButton = ({ closeToast }) => (
  <button onClick={closeToast} className="Toastify__close-button" aria-label="close">
    ✕
  </button>
);

const icons = {
  success: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 0C4.95 0 0 4.95 0 11C0 17.05 4.95 22 11 22C17.05 22 22 17.05 22 11C22 4.95 17.05 0 11 0ZM8.019 15.719L4.07 11.77C3.641 11.341 3.641 10.648 4.07 10.219C4.499 9.79 5.192 9.79 5.621 10.219L8.8 13.387L16.368 5.819C16.797 5.39 17.49 5.39 17.919 5.819C18.348 6.248 18.348 6.941 17.919 7.37L9.57 15.719C9.152 16.148 8.448 16.148 8.019 15.719Z" fill="#52fea2"/>
    </svg>
  ),
  error: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 0C4.95 0 0 4.95 0 11C0 17.05 4.95 22 11 22C17.05 22 22 17.05 22 11C22 4.95 17.05 0 11 0ZM12.1 16.5H9.9V14.3H12.1V16.5ZM12.1 12.1H9.9V5.5H12.1V12.1Z" fill="#ff6b6b"/>
    </svg>
  ),
  info: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 0C4.95 0 0 4.95 0 11C0 17.05 4.95 22 11 22C17.05 22 22 17.05 22 11C22 4.95 17.05 0 11 0ZM12.1 16.5H9.9V9.9H12.1V16.5ZM12.1 7.7H9.9V5.5H12.1V7.7Z" fill="#5bc0de"/>
    </svg>
  ),
  warning: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 0C4.95 0 0 4.95 0 11C0 17.05 4.95 22 11 22C17.05 22 22 17.05 22 11C22 4.95 17.05 0 11 0ZM12.1 16.5H9.9V14.3H12.1V16.5ZM12.1 12.1H9.9V5.5H12.1V12.1Z" fill="#ffb700"/>
    </svg>
  ),
};

const toast = {
  success: (message, options = {}) => {
    return toastOriginal.success(message, {
      icon: icons.success,
      className: 'custom-toast-success',
      progressClassName: 'custom-toast-progress-success',
      autoClose: 3000,
      ...options
    });
  },
  error: (message, options = {}) => {
    return toastOriginal.error(message, {
      icon: icons.error,
      className: 'custom-toast-error',
      progressClassName: 'custom-toast-progress-error',
      autoClose: 3000,
      ...options
    });
  },
  info: (message, options = {}) => {
    return toastOriginal.info(message, {
      icon: icons.info,
      className: 'custom-toast-info',
      progressClassName: 'custom-toast-progress-info',
      autoClose: 3000,
      ...options
    });
  },
  warning: (message, options = {}) => {
    return toastOriginal.warning(message, {
      icon: icons.warning,
      className: 'custom-toast-warning',
      progressClassName: 'custom-toast-progress-warning',
      autoClose: 3000,
      ...options
    });
  },
};

export { toast }; 