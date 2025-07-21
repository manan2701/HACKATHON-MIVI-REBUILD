import React, { useState, useEffect } from 'react';
import './Footer.css';
import { toggleDropdownContent, initFooter } from './FooterScript';

const Footer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  
  useEffect(() => {
    // Initialize footer functionality after component mounts
    initFooter();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log({ name, email, message });
    // Show success message
    setSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
      setShowContactForm(false);
    }, 3000);
  };
  
  return (
    <div className="mivi-footer">
      <div className="mivi-footer-container">
        <div className="mivi-footer-block">
          <div className="mivi-footer-block-heading">
            <span className="mivi-footer-block-heading">Customer Support</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_444_5251" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <rect width="20" height="20" fill="#D9D9D9"></rect>
              </mask>
              <g mask="url(#mask0_444_5251)">
                <path d="M10 12.8327L5 7.83268L6.16667 6.66602L10 10.4993L13.8333 6.66602L15 7.83268L10 12.8327Z" fill="#646B66"></path>
              </g>
            </svg>
          </div>
          <ul className="dropdown-content">
            <li><a href="https://www.mivi.in/account">Track your Mivi</a></li>
            <li><a href="/pages/return-and-cancellation">Shipping &amp; Return Policy</a></li>
            <li><a href="https://www.mivi.in/pages/return-and-cancellation">Return &amp; Replacement</a></li>
            <li><a href="/pages/warranty-guidelines">Warranty Repairs</a></li>
            <li><a href="https://miviindia.zohodesk.in/portal/en/home">Help Centre</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowContactForm(true); }}>Contact Us</a></li>
          </ul>
        </div>
          
        <div className="mivi-footer-block">
          <div className="mivi-footer-block-heading">
            <span className="mivi-footer-block-heading">Shop Categories</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_444_5252" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <rect width="20" height="20" fill="#D9D9D9"></rect>
              </mask>
              <g mask="url(#mask0_444_5252)">
                <path d="M10 12.8327L5 7.83268L6.16667 6.66602L10 10.4993L13.8333 6.66602L15 7.83268L10 12.8327Z" fill="#646B66"></path>
              </g>
            </svg>
          </div>
          <ul className="dropdown-content">
            <li><a href="/products/ai-buds">AI Buds</a></li>
            <li><a href="https://www.mivi.in/collections/earbuds-collection?sort_by=best-selling&amp;filter.p.m.custom.subcategory_filter=superpods">Superpods</a></li>
            <li><a href="https://www.mivi.in/collections/earbuds-collection?sort_by=best-selling&amp;filter.p.m.custom.subcategory_filter=duopods">Duopods</a></li>
            <li><a href="/collections/speakers-collections">Speaker</a></li>
            <li><a href="/collections/soundbars-collection">Soundbars</a></li>
          </ul>
        </div>
          
        <div className="mivi-footer-block">
          <div className="mivi-footer-block-heading">
            <span className="mivi-footer-block-heading">Corporate Gifting</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_444_5253" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <rect width="20" height="20" fill="#D9D9D9"></rect>
              </mask>
              <g mask="url(#mask0_444_5253)">
                <path d="M10 12.8327L5 7.83268L6.16667 6.66602L10 10.4993L13.8333 6.66602L15 7.83268L10 12.8327Z" fill="#646B66"></path>
              </g>
            </svg>
          </div>
          <ul className="dropdown-content">
            <li><a href="https://www.mivi.in/pages/corporate">Corporate Gifting / Bulk Order</a></li>
          </ul>
        </div>
          
        <div className="mivi-footer-block">
          <div className="mivi-footer-block-heading">
            <span className="mivi-footer-block-heading">About Mivi</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_444_5254" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <rect width="20" height="20" fill="#D9D9D9"></rect>
              </mask>
              <g mask="url(#mask0_444_5254)">
                <path d="M10 12.8327L5 7.83268L6.16667 6.66602L10 10.4993L13.8333 6.66602L15 7.83268L10 12.8327Z" fill="#646B66"></path>
              </g>
            </svg>
          </div>
          <ul className="dropdown-content">
            <li><a href="/pages/about">Our Story</a></li>
            <li><a href="https://mivi.tapfiliate.com/">Affiliate Program</a></li>
            <li><a href="/blogs/earbuds">Blogs &amp; Articles</a></li>
          </ul>
        </div>
          
        <div className="mivi-footer-block">
          <div className="mivi-footer-block-heading">
            <span className="mivi-footer-block-heading">Choose Earbuds</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_444_5255" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <rect width="20" height="20" fill="#D9D9D9"></rect>
              </mask>
              <g mask="url(#mask0_444_5255)">
                <path d="M10 12.8327L5 7.83268L6.16667 6.66602L10 10.4993L13.8333 6.66602L15 7.83268L10 12.8327Z" fill="#646B66"></path>
              </g>
            </svg>
          </div>
          <ul className="dropdown-content">
            <li><a href="/collections/earbuds-under-1000">TWS Under 1000</a></li>
            <li><a href="/collections/earbuds-under-3000">TWS Under 3000</a></li>
            <li><a href="/collections/earbuds-under-4000">TWS Under 4000</a></li>
            <li><a href="/collections/earbuds-under-5000">TWS Under 5000</a></li>
          </ul>
        </div>
          
        <div className="mivi-footer-block">
          <div className="mivi-footer-block-heading">
            <span className="mivi-footer-block-heading">Choose Soundbars</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_444_5256" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <rect width="20" height="20" fill="#D9D9D9"></rect>
              </mask>
              <g mask="url(#mask0_444_5256)">
                <path d="M10 12.8327L5 7.83268L6.16667 6.66602L10 10.4993L13.8333 6.66602L15 7.83268L10 12.8327Z" fill="#646B66"></path>
              </g>
            </svg>
          </div>
          <ul className="dropdown-content">
            <li><a href="/collections/soundbars-under-5000">Under 5000</a></li>
            <li><a href="/collections/soundbars-under-10000">Under 10000</a></li>
            <li><a href="/collections/soundbars-under-15000">Under 15000</a></li>
            <li><a href="/collections/soundbars-under-20000">Under 20000</a></li>
          </ul>
        </div>

        <div className="social-section">
          <div className="social-heading-text mivi-footer-block-heading">Social</div>
          <ul className="social-links">
            <li>
              <a href="https://www.facebook.com/mivi.official/">
                <img width="40" height="40" src="https://cdn.shopify.com/s/files/1/0828/1391/1317/files/FB.png?v=1750934540" alt="Facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/mivi/">
                <img width="40" height="40" src="https://cdn.shopify.com/s/files/1/0828/1391/1317/files/IN.png?v=1750934540" alt="Instagram" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/Mivi_Official">
                <img width="40" height="40" src="https://cdn.shopify.com/s/files/1/0828/1391/1317/files/X.png?v=1750934541" alt="Twitter" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCHLJIjWSbFicL72lprhzmbw">
                <img width="40" height="40" src="https://cdn.shopify.com/s/files/1/0828/1391/1317/files/YT.png?v=1750934540" alt="YouTube" />
              </a>
            </li>
            <li>
              <a href="https://in.linkedin.com/company/mivi">
                <img width="40" height="40" src="https://cdn.shopify.com/s/files/1/0828/1391/1317/files/LN.png?v=1750934540" alt="LinkedIn" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mivi-footer-policy-block">
          <ul>
            <li>
              <a href="/pages/privacy-policy">Privacy Policy </a>
            </li>
            <svg width="1" height="20" viewBox="0 0 1 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0.5" y1="0" x2="0.5" y2="20" stroke="white" strokeOpacity="0.4"></line>
            </svg>
            <li>
              <a href="/pages/terms-and-conditions">Terms of Service </a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="">All Right Reserved. 2024 </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mivi-footer-bottom-block">
        <div className="mivi-footer-bottom-block-inner-1">
          <img className="mivi_footer_desktop_visible" src="https://cdn.shopify.com/s/files/1/0828/1391/1317/files/Group_1686556641_1.jpg?v=1739026529" alt="Payment methods" />
          <img className="mivi_footer_mobile_visible" src="https://cdn.shopify.com/s/files/1/0828/1391/1317/files/Frame_2147225024.jpg?v=1739026552" alt="Payment methods mobile" />
        </div>
        <div className="mivi-footer-bottom-block-inner-2">
          <ul>
            <li>
              <a href="/pages/privacy-policy">Privacy Policy </a>
            </li>
            <svg width="1" height="20" viewBox="0 0 1 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0.5" y1="0" x2="0.5" y2="20" stroke="white" strokeOpacity="0.4"></line>
            </svg>
            <li>
              <a href="/pages/terms-and-conditions">Terms of Service </a>
            </li>
            <svg width="1" height="20" viewBox="0 0 1 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0.5" y1="0" x2="0.5" y2="20" stroke="white" strokeOpacity="0.4"></line>
            </svg>
            <li>
              <a href="">All Right Reserved. 2024 </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Us Form Modal */}
      {showContactForm && (
        <div className="contact-form-modal">
          <div className="contact-form-container">
            <button className="close-button" onClick={() => setShowContactForm(false)}>×</button>
            <h2>Contact Us</h2>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">Submit</button>
              </form>
            ) : (
              <div className="success-message">
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer; 