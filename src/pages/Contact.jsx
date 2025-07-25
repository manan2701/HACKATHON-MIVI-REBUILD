import React, { useState, useEffect } from 'react';
import './Contact.css';
import { toast } from '../components/ui/CustomToast.jsx';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  useEffect(() => {
    if (window.lenisScroll) window.lenisScroll.start();
  }, []);

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-form-section">
            <div className="contact-card">
              <h2 className="section-title">Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? 'error' : ''}
                    placeholder="Enter your name"
                  />
                  {formErrors.name && <p className="error-message">{formErrors.name}</p>}
                </div>
                <div className="contact-form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? 'error' : ''}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                </div>
                <div className="contact-form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={formErrors.subject ? 'error' : ''}
                    placeholder="What's this about?"
                  />
                  {formErrors.subject && <p className="error-message">{formErrors.subject}</p>}
                </div>
                <div className="contact-form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={formErrors.message ? 'error' : ''}
                    placeholder="Tell us what you need help with..."
                    rows="6"
                  ></textarea>
                  {formErrors.message && <p className="error-message">{formErrors.message}</p>}
                </div>
                <button 
                  type="submit" 
                  className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="btn-spinner"></span>
                  ) : submitSuccess ? (
                    'Message Sent!'
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="contact-info-section">
            <div className="contact-card">
              <h2 className="section-title">Contact Information</h2>
              <div className="contact-info-item">
                <div className="info-icon">
                  <i className="ri-map-pin-line"></i>
                </div>
                <div className="info-content">
                  <h3>Our Address</h3>
                  <p>123 Tech Park, Innovation Street</p>
                  <p>Hyderabad, 500081</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="info-icon">
                  <i className="ri-mail-line"></i>
                </div>
                <div className="info-content">
                  <h3>Email Us</h3>
                  <p>support@mivi.in</p>
                  <p>info@mivi.in</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="info-icon">
                  <i className="ri-phone-line"></i>
                </div>
                <div className="info-content">
                  <h3>Call Us</h3>
                  <p>+91 1234 567 890</p>
                  <p>+91 0987 654 321</p>
                </div>
              </div>
              <div className="social-links">
                <h3>Connect With Us</h3>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="ri-twitter-fill"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="ri-instagram-fill"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="ri-linkedin-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="map-section">
        <iframe 
          title="Mivi Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6243711253313!2d78.38381527465367!3d17.42708080578464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96f00db3b9b9%3A0xd6d5c028987c5189!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sus!4v1688716226276!5m2!1sen!2sus" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
      <div className="faq-section">
        <div className="faq-container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-content">
            <div className="faq-item">
              <h3>What is Mivi's return policy?</h3>
              <p>Our return policy allows returns within 7 days of delivery for products that are unused, in original packaging, with all accessories and documentation intact.</p>
            </div>
            <div className="faq-item">
              <h3>How long does shipping take?</h3>
              <p>Standard shipping typically takes 3-5 business days. Express shipping options are available for faster delivery within 1-2 business days.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer international shipping?</h3>
              <p>Yes, we ship to select international destinations. Shipping times and costs vary by location.</p>
            </div>
            <div className="faq-item">
              <h3>What warranty do your products come with?</h3>
              <p>All Mivi products come with a standard 1-year warranty against manufacturing defects.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 