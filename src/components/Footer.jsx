import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
      setShowContactForm(false);
    }, 3000);
  };

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const footerSections = [
    {
      title: "Customer Support",
      links: [
        { text: "Track your Mivi", url: "/profile" },
        { text: "Shipping & Return Policy", url: "#" },
        { text: "Return & Replacement", url: "#" },
        { text: "Warranty Repairs", url: "#" },
        { text: "Help Centre", url: "#" },
        { text: "Contact Us", url: "/contact" }
      ]
    },
    {
      title: "Shop Categories",
      links: [
        { text: "AI Buds", url: "/products" },
        { text: "Superpods", url: "/products" },
        { text: "Duopods", url: "/products" }
      ]
    },
    {
      title: "Corporate Gifting",
      links: [
        { text: "Corporate Gifting / Bulk Order", url: "#" }
      ]
    },
    {
      title: "About Mivi",
      links: [
        { text: "Our Story", url: "/about" },
        { text: "Affiliate Program", url: "https://mivi.tapfiliate.com/" },
        { text: "Blogs & Articles", url: "/blogs/earbuds" }
      ]
    }
  ];

  const socialLinks = [
    { url: "https://www.facebook.com/mivi.official/", icon: "https://cdn.shopify.com/s/files/1/0828/1391/1317/files/FB.png?v=1750934540", alt: "Facebook" },
    { url: "https://www.instagram.com/mivi/", icon: "https://cdn.shopify.com/s/files/1/0828/1391/1317/files/IN.png?v=1750934540", alt: "Instagram" },
    { url: "https://twitter.com/Mivi_Official", icon: "https://cdn.shopify.com/s/files/1/0828/1391/1317/files/X.png?v=1750934541", alt: "Twitter" },
    { url: "https://www.youtube.com/channel/UCHLJIjWSbFicL72lprhzmbw", icon: "https://cdn.shopify.com/s/files/1/0828/1391/1317/files/YT.png?v=1750934540", alt: "YouTube" },
    { url: "https://in.linkedin.com/company/mivi", icon: "https://cdn.shopify.com/s/files/1/0828/1391/1317/files/LN.png?v=1750934540", alt: "LinkedIn" }
  ];

  return (
    <footer className="mivi-footer">
      <div className="mivi-footer-container">
        {footerSections.map((section, index) => (
          <div className="mivi-footer-block" key={index}>
            <div 
              className={`mivi-footer-block-heading ${activeDropdown === index ? 'active' : ''}`}
              onClick={() => toggleDropdown(index)}
            >
              <span>{section.title}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.8327L5 7.83268L6.16667 6.66602L10 10.4993L13.8333 6.66602L15 7.83268L10 12.8327Z" fill="#646B66"></path>
              </svg>
            </div>
            <ul className={`dropdown-content ${activeDropdown === index ? 'active' : ''}`}>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a 
                    href={link.url} 
                    onClick={link.onClick || undefined}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="social-section">
          <div className="social-heading-text mivi-footer-block-heading">Social</div>
          <ul className="social-links">
            {socialLinks.map((social, index) => (
              <li key={index}>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  <img width="40" height="40" src={social.icon} alt={social.alt} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mivi-footer-bottom-block">
        <div className="mivi-footer-bottom-block-inner-1">
          <img 
            className="mivi_footer_desktop_visible" 
            src="https://cdn.shopify.com/s/files/1/0828/1391/1317/files/Group_1686556641_1.jpg?v=1739026529" 
            alt="Payment methods" 
          />
          <img 
            className="mivi_footer_mobile_visible" 
            src="https://cdn.shopify.com/s/files/1/0828/1391/1317/files/Frame_2147225024.jpg?v=1739026552" 
            alt="Payment methods mobile" 
          />
        </div>
        <div className="footer-legal">
          <ul className="legal-links">
            <li>
              <a href="/pages/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/pages/terms-and-conditions">Terms of Service</a>
            </li>
            <li>
              <span>All Rights Reserved. 2024</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 