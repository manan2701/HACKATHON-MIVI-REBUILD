import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import { nanoid } from '@reduxjs/toolkit';
import { asyncLoginUser, asyncRegisterUser, asyncForgotPassword } from '../store/actions/userActions';
import { useDispatch } from 'react-redux';
import { toast } from '../components/CustomToast.jsx';
import ModernLoader from '../components/ModernLoader';

const Login = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  
  // React Hook Form setup for login
  const { 
    register: registerLogin, 
    handleSubmit: handleSubmitLogin, 
    formState: { errors: loginErrors }, 
    reset: resetLogin 
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      rememberMe: false
    }
  });
  
  // React Hook Form setup for forgot password
  const { 
    register: registerForgotPassword, 
    handleSubmit: handleSubmitForgotPassword, 
    formState: { errors: forgotPasswordErrors },
    reset: resetForgotPassword
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: ''
    }
  });
  
  // React Hook Form setup for registration
  const { 
    register: registerSignup, 
    handleSubmit: handleSubmitSignup, 
    formState: { errors: registerErrors }, 
    reset: resetRegister,
    watch: watchRegister
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    }
  });

  // Watch password to compare with confirmPassword
  const password = watchRegister('password');

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
    // Reset form fields when toggling
    resetLogin();
    resetRegister();
    // Reset password visibility states
    setShowLoginPassword(false);
    setShowRegisterPassword(false);
    setShowConfirmPassword(false);
  };
  
  // Form submission handlers
  const onLoginSubmit = async (data) => {
    // Get redirect path from location state (from protected route) or default to home
    const redirectPath = location.state?.from || '/';
    
    setIsLoginLoading(true);
    try {
      await dispatch(asyncLoginUser(data, navigate, redirectPath));
    } finally {
      setIsLoginLoading(false);
    }
  };
  
  const onRegisterSubmit = async (user) => {
    setIsRegisterLoading(true);
    try {
      user.id = nanoid();
      user.cart = [];
      user.orders = [];
      await dispatch(asyncRegisterUser(user));
      resetRegister();
    } finally {
      setIsRegisterLoading(false);
    }
  };

  const onForgotPasswordSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data);
    try {
      const success = await dispatch(asyncForgotPassword(data.email));
      if (success) {
        resetForgotPassword();
        setShowForgotPasswordModal(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Password visibility toggle handlers
  const toggleLoginPasswordVisibility = () => setShowLoginPassword(!showLoginPassword);
  const toggleRegisterPasswordVisibility = () => setShowRegisterPassword(!showRegisterPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  
  // Modal handlers
  const openForgotPasswordModal = (e) => {
    e.preventDefault();
    setShowForgotPasswordModal(true);
  };
  
  const closeForgotPasswordModal = () => {
    resetForgotPassword();
    setShowForgotPasswordModal(false);
  };

  return (
    <div className="auth-container">
      <div className={`auth-box ${!isLoginActive && !isMobile ? 'slide-animation' : ''}`}>
        <div className={`auth-form-side ${!isLoginActive && isMobile ? 'mobile-register-active' : ''}`}>
          <div className="auth-header">
            <h1>Welcome to <span>MIVI</span></h1>
            <p>Experience the future of sound</p>
          </div>
          <div className="form-container">
            <div className={`form-panel ${isLoginActive ? 'active' : ''}`}>
              <form className="login-form" onSubmit={handleSubmitLogin(onLoginSubmit)}>
                <div className="input-group">
                  <label>Email</label>
                  <div className={`input-with-icon ${loginErrors.email ? 'input-error' : ''}`}>
                    <i className="ri-mail-line"></i>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      {...registerLogin('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email address'
                        }
                      })}
                    />
                  </div>
                  {loginErrors.email && <span className="error-message">{loginErrors.email.message}</span>}
                </div>               
                <div className="input-group">
                  <label>Password</label>
                  <div className={`input-with-icon ${loginErrors.password ? 'input-error' : ''}`}>
                    <i className="ri-lock-line"></i>
                    <input 
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...registerLogin('password', {
                        required: 'Password is required'
                      })}
                    />
                    <button 
                      type="button" 
                      className="password-toggle" 
                      onClick={toggleLoginPasswordVisibility}
                      aria-label={showLoginPassword ? "Hide password" : "Show password"}
                    >
                      <i className={showLoginPassword ? "ri-eye-off-fill" : "ri-eye-fill"}></i>
                    </button>
                  </div>
                  {loginErrors.password && <span className="error-message">{loginErrors.password.message}</span>}
                </div>
                
                <div className="remember-forgot">
                  <div className="remember-me">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      {...registerLogin('rememberMe')}
                    />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <a href="#" onClick={openForgotPasswordModal} className="forgot-password">Forgot Password?</a>
                </div>
                
                <button 
                  className="auth-button" 
                  type="submit" 
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? (
                    <ModernLoader small={true} />
                  ) : (
                    <>
                      Login
                      <i className="ri-arrow-right-line"></i>
                    </>
                  )}
                </button>
                
                <div className="toggle-link">
                  <p>Don't have an account? <button type="button" onClick={toggleForm}>Register</button></p>
                </div>
              </form>
            </div>
            
            <div className={`form-panel ${!isLoginActive ? 'active' : ''}`}>
              <form className="register-form" onSubmit={handleSubmitSignup(onRegisterSubmit)}>
                <div className="input-group">
                  <label>Full Name</label>
                  <div className={`input-with-icon ${registerErrors.fullName ? 'input-error' : ''}`}>
                    <i className="ri-user-line"></i>
                    <input 
                      type="text" 
                      placeholder="Enter your full name"
                      {...registerSignup('fullName', {
                        required: 'Full name is required'
                      })}
                    />
                  </div>
                  {registerErrors.fullName && <span className="error-message">{registerErrors.fullName.message}</span>}
                </div>
                
                <div className="input-group">
                  <label>Email</label>
                  <div className={`input-with-icon ${registerErrors.email ? 'input-error' : ''}`}>
                    <i className="ri-mail-line"></i>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      {...registerSignup('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email address'
                        }
                      })}
                    />
                  </div>
                  {registerErrors.email && <span className="error-message">{registerErrors.email.message}</span>}
                </div>
                
                <div className="input-group">
                  <label>Phone Number</label>
                  <div className={`input-with-icon input-with-prefix ${registerErrors.phone ? 'input-error' : ''}`}>
                    <i className="ri-smartphone-line"></i>
                    <span className="input-prefix">+91</span>
                    <input 
                      type="tel" 
                      placeholder="10 digit number"
                      maxLength="10"
                      {...registerSignup('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]\d{9}$/,
                          message: 'Enter a valid 10 digit phone number'
                        }
                      })}
                    />
                  </div>
                  {registerErrors.phone && <span className="error-message">{registerErrors.phone.message}</span>}
                </div>
                
                <div className="input-group">
                  <label>Password</label>
                  <div className={`input-with-icon ${registerErrors.password ? 'input-error' : ''}`}>
                    <i className="ri-lock-line"></i>
                    <input 
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder="Create a password"
                      {...registerSignup('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        }
                      })}
                    />
                    <button 
                      type="button" 
                      className="password-toggle" 
                      onClick={toggleRegisterPasswordVisibility}
                      aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                    >
                      <i className={showRegisterPassword ? "ri-eye-off-fill" : "ri-eye-fill"}></i>
                    </button>
                  </div>
                  {registerErrors.password && <span className="error-message">{registerErrors.password.message}</span>}
                </div>
                
                <div className="input-group">
                  <label>Confirm Password</label>
                  <div className={`input-with-icon ${registerErrors.confirmPassword ? 'input-error' : ''}`}>
                    <i className="ri-lock-line"></i>
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...registerSignup('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: value => value === password || 'Passwords do not match'
                      })}
                    />
                    <button 
                      type="button" 
                      className="password-toggle" 
                      onClick={toggleConfirmPasswordVisibility}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      <i className={showConfirmPassword ? "ri-eye-off-fill" : "ri-eye-fill"}></i>
                    </button>
                  </div>
                  {registerErrors.confirmPassword && <span className="error-message">{registerErrors.confirmPassword.message}</span>}
                </div>
                
                <div className={`terms ${registerErrors.agreeTerms ? 'terms-error' : ''}`}>
                  <input 
                    type="checkbox" 
                    id="terms"
                    {...registerSignup('agreeTerms', {
                      required: 'You must agree to the Terms & Conditions'
                    })}
                  />
                  <label htmlFor="terms">I agree to the <a href="#">Terms & Conditions</a></label>
                  {registerErrors.agreeTerms && <span className="error-message">{registerErrors.agreeTerms.message}</span>}
                </div>
                
                <button 
                  className="auth-button" 
                  type="submit" 
                  disabled={isRegisterLoading}
                >
                  {isRegisterLoading ? (
                    <ModernLoader small />
                  ) : (
                    <>
                      Create Account
                      <i className="ri-arrow-right-line"></i>
                    </>
                  )}
                </button>
                
                <div className="toggle-link">
                  <p>Already have an account? <button type="button" onClick={toggleForm}>Login</button></p>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className={`auth-background-side ${!isLoginActive && isMobile ? 'mobile-bg-register' : ''}`}>
          <div className="circles">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
          <div className="auth-info">
            <h2>{isLoginActive ? 'Join Us Today!' : 'Welcome Back!' }</h2>
            <p>{isLoginActive ?  'Create an account to experience premium audio products and exclusive offers.' : 'Login to access your account and continue your audio journey with MIVI.'}</p>
            <button className="switch-btn" onClick={toggleForm}>
              {isLoginActive ? 'Register' : 'Login'}
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="modal-overlay">
          <div className="forgot-password-modal">
            <div className="modal-header">
              <h3>Forgot Password</h3>
              <button type="button" className="close-modal" onClick={closeForgotPasswordModal}>
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Enter your email address and we'll send you a link to reset your password.</p>
              <form onSubmit={handleSubmitForgotPassword(onForgotPasswordSubmit)}>
                <div className="forgot-password-group">
                  <label>Email</label>
                  <div className={`input-with-icon ${forgotPasswordErrors.email ? 'input-error' : ''}`}>
                    <i className="ri-mail-line"></i>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      {...registerForgotPassword('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email address'
                        }
                      })}
                    />
                  </div>
                  {forgotPasswordErrors.email && <span className="error-message">{forgotPasswordErrors.email.message}</span>}
                </div>
                <button 
                  className="auth-button" 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ModernLoader small />
                  ) : (
                    <>
                      Reset Password
                      <i className="ri-arrow-right-line"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;