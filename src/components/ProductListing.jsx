import React, { useState, useEffect, useRef } from 'react';
import './ProductListing.css';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    price: { min: 500, max: 50000 }
  });
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilterPanel, setActiveFilterPanel] = useState('sort');
  const productGridRef = useRef(null);
  const filterRefs = {
    sort: useRef(null),
    price: useRef(null)
  };
  
  // Dummy product data with more realistic information
  useEffect(() => {
    const dummyProducts = [
      {
        id: 1,
        name: "AI Buds Pro 700",
        description: "AI-powered earbuds with superior sound quality",
        price: 4999,
        originalPrice: 6999,
        discount: 29,
        color: "Black",
        subcategory: "gaming-pods",
        availability: true,
        rating: 4.8,
        reviews: 127,
        features: ["AI Voice Assistant", "40h Battery", "Noise Cancellation"],
        image: "/assets/ai-buds-1.webp"
      },
      {
        id: 2,
        name: "AI Buds Pro 600",
        description: "Smart earbuds with voice controls",
        price: 3999,
        originalPrice: 5999,
        discount: 33,
        color: "White",
        subcategory: "gaming-pods",
        availability: true,
        rating: 4.5,
        reviews: 98,
        features: ["Hi Mivi Wake", "30h Battery", "Low Latency"],
        image: "/assets/ai-buds-2.webp"
      },
      {
        id: 3,
        name: "AI Buds X",
        description: "Premium AI earbuds with immersive sound",
        price: 6999,
        originalPrice: 9999,
        discount: 30,
        color: "Red",
        subcategory: "gaming-pods",
        availability: false,
        rating: 4.9,
        reviews: 74,
        features: ["Neural Voice", "50h Battery", "Pro Gaming Mode"],
        image: "/assets/ai-buds-3.webp"
      },
      {
        id: 4,
        name: "DuoPods 500",
        description: "Dual driver earbuds for balanced sound",
        price: 2999,
        originalPrice: 4499,
        discount: 33,
        color: "Blue",
        subcategory: "duopods",
        availability: true,
        rating: 4.3,
        reviews: 156,
        features: ["Dual Drivers", "25h Battery", "IPX7 Water Resistant"],
        image: "/assets/ai-buds-4.webp"
      },
      {
        id: 5,
        name: "SuperPods Ultra",
        description: "Ultra premium sound experience",
        price: 9999,
        originalPrice: 12999,
        discount: 23,
        color: "White",
        subcategory: "superpods",
        availability: false,
        rating: 4.7,
        reviews: 62,
        features: ["Studio Sound", "45h Battery", "Ambient Mode"],
        image: "/assets/ai-buds-5.webp"
      },
      {
        id: 6,
        name: "SuperPods Max",
        description: "Maximum audio performance with AI",
        price: 12999,
        originalPrice: 15999,
        discount: 19,
        color: "Grey",
        subcategory: "superpods",
        availability: true,
        rating: 4.6,
        reviews: 43,
        features: ["Premium Sound", "60h Battery", "Gesture Controls"],
        image: "/assets/ai-buds-6.webp"
      },
      {
        id: 7,
        name: "AI Buds Lite",
        description: "Lightweight AI earbuds for everyday use",
        price: 2499,
        originalPrice: 3999,
        discount: 38,
        color: "Black",
        subcategory: "gaming-pods",
        availability: true,
        rating: 4.2,
        reviews: 89,
        features: ["Voice Control", "20h Battery", "Compact Design"],
        image: "/assets/ai-buds-7.webp"
      },
      {
        id: 8,
        name: "DuoPods Pro",
        description: "Professional grade dual driver earbuds",
        price: 5999,
        originalPrice: 7999,
        discount: 25,
        color: "Blue",
        subcategory: "duopods",
        availability: true,
        rating: 4.4,
        reviews: 112,
        features: ["Pro Audio", "35h Battery", "Fast Charge"],
        image: "/assets/ai-buds-8.webp"
      }
    ];
    setProducts(dummyProducts);
  }, []);

  // GSAP animations for product cards
  useGSAP(() => {
    if (productGridRef.current) {
      const productCards = document.querySelectorAll('.product-card');
      gsap.fromTo(
        productCards,
        { 
          opacity: 0,
          y: 20
        },
        { 
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }
  }, [products]);

  // Set up filter panel animations
  useEffect(() => {
    // Initial setup for filter panels
    Object.keys(filterRefs).forEach(key => {
      if (key === activeFilterPanel && filterRefs[key].current) {
        const contentEl = filterRefs[key].current;
        contentEl.classList.add('active');
      }
    });
  }, []);

  // Toggle filter panel with smooth animation
  const toggleFilterPanel = (panelName) => {
    // Handle closing current panel
    if (activeFilterPanel) {
      const currentContentEl = filterRefs[activeFilterPanel]?.current;
      if (currentContentEl) {
        currentContentEl.classList.remove('active');
      }
    }
    
    // Set new active panel or close if clicking same panel
    if (activeFilterPanel === panelName) {
      setActiveFilterPanel(null);
    } else {
      setActiveFilterPanel(panelName);
      setTimeout(() => {
        const newContentEl = filterRefs[panelName]?.current;
        if (newContentEl) {
          newContentEl.classList.add('active');
        }
      }, 50); // Small delay to allow state to update
    }
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Filter by subcategory
    if (activeCategory !== 'all' && product.subcategory !== activeCategory) {
      return false;
    }
    
    // Filter by price
    if (product.price < filters.price.min || product.price > filters.price.max) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0; // Featured sorting
    }
  });

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    
    // Animation for category change
    if (productGridRef.current) {
      gsap.to('.product-grid', {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
          gsap.to('.product-grid', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1
          });
        }
      });
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Fixed price filter handling
  const handlePriceChange = (type, value) => {
    const parsedValue = parseInt(value);
    
    if (type === 'min') {
      // Handle min price changes
      if (isNaN(parsedValue)) {
        setFilters({
          ...filters,
          price: { ...filters.price, min: 0 }
        });
      } else {
        // Ensure min can't exceed max
        const newMin = Math.min(parsedValue, filters.price.max - 500);
        setFilters({
          ...filters,
          price: { ...filters.price, min: Math.max(0, newMin) }
        });
      }
    } else {
      // Handle max price changes
      if (isNaN(parsedValue)) {
        setFilters({
          ...filters,
          price: { ...filters.price, max: 50000 }
        });
      } else {
        // Ensure max is at least min + 500
        const newMax = Math.max(parsedValue, filters.price.min + 500);
        setFilters({
          ...filters,
          price: { ...filters.price, max: Math.min(50000, newMax) }
        });
      }
    }
  };

  const clearAllFilters = () => {
    setFilters({
      price: { min: 500, max: 50000 }
    });
    setSortBy('featured');
    
    // Animation for reset
    gsap.to('.product-grid', {
      opacity: 0.5,
      scale: 0.98,
      duration: 0.3,
      onComplete: () => {
        gsap.to('.product-grid', {
          opacity: 1,
          scale: 1,
          duration: 0.5
        });
      }
    });
  };

  const getTotalActiveFilters = () => {
    let count = 0;
    if (filters.price.min > 500 || filters.price.max < 50000) count += 1;
    if (sortBy !== 'featured') count += 1;
    return count;
  };

  return (
    <div className="product-page">
      <div className="product-page__header">
        <h1 className="product-page__title">Our Products</h1>
        <p className="product-page__subtitle">Experience the next generation of audio with Mivi's cutting-edge products</p>
      </div>
      
      {/* Category Navigation */}
      <div className="product-page__categories">
        <button 
          className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('all')}
        >
          <span>All Products</span>
          <div className="category-indicator"></div>
        </button>
        
        <button 
          className={`category-btn ${activeCategory === 'gaming-pods' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('gaming-pods')}
        >
          <span>Gaming Pods</span>
          <div className="category-indicator"></div>
        </button>
        
        <button 
          className={`category-btn ${activeCategory === 'duopods' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('duopods')}
        >
          <span>DuoPods</span>
          <div className="category-indicator"></div>
        </button>
        
        <button 
          className={`category-btn ${activeCategory === 'superpods' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('superpods')}
        >
          <span>SuperPods</span>
          <div className="category-indicator"></div>
        </button>
      </div>

      {/* Mobile Filter Toggle */}
      <button 
        className="filter-toggle-btn"
        onClick={() => setShowMobileFilters(!showMobileFilters)}
      >
        <i className="ri-filter-line"></i>
        <span>Filters & Sort</span>
        {getTotalActiveFilters() > 0 && (
          <div className="filter-badge">{getTotalActiveFilters()}</div>
        )}
      </button>

      <div className="product-page__content">
        {/* Filter Sidebar */}
        <div className={`product-filters ${showMobileFilters ? 'show-mobile' : ''}`}>
          <div className="filter-header">
            <div className="filter-title">
              <i className="ri-filter-line"></i>
              <h3>Filters & Sort</h3>
              {getTotalActiveFilters() > 0 && (
                <div className="filter-count">{getTotalActiveFilters()}</div>
              )}
            </div>
            
            {showMobileFilters && (
              <button 
                className="close-filters-btn"
                onClick={() => setShowMobileFilters(false)}
              >
                <i className="ri-close-line"></i>
              </button>
            )}
          </div>
          
          {getTotalActiveFilters() > 0 && (
            <button className="clear-filters-btn" onClick={clearAllFilters}>
              Clear All
            </button>
          )}
          
          {/* Sort Options */}
          <div className="filter-section">
            <div 
              className="filter-section__header"
              onClick={() => toggleFilterPanel('sort')}
            >
              <h4>Sort By</h4>
              <i className={`ri-arrow-${activeFilterPanel === 'sort' ? 'up' : 'down'}-s-line`}></i>
            </div>
            
            <div 
              ref={filterRefs.sort}
              className="filter-section__content"
            >
              <div className="filter-option">
                <input 
                  type="radio"
                  id="sort-featured"
                  name="sort"
                  checked={sortBy === 'featured'}
                  onChange={() => handleSortChange('featured')}
                />
                <label htmlFor="sort-featured">Featured</label>
              </div>
              
              <div className="filter-option">
                <input 
                  type="radio"
                  id="sort-price-low"
                  name="sort"
                  checked={sortBy === 'price-low'}
                  onChange={() => handleSortChange('price-low')}
                />
                <label htmlFor="sort-price-low">Price: Low to High</label>
              </div>
              
              <div className="filter-option">
                <input 
                  type="radio"
                  id="sort-price-high"
                  name="sort"
                  checked={sortBy === 'price-high'}
                  onChange={() => handleSortChange('price-high')}
                />
                <label htmlFor="sort-price-high">Price: High to Low</label>
              </div>
            </div>
          </div>
          
          {/* Price Filter */}
          <div className="filter-section">
            <div 
              className="filter-section__header"
              onClick={() => toggleFilterPanel('price')}
            >
              <h4>Price Range</h4>
              <i className={`ri-arrow-${activeFilterPanel === 'price' ? 'up' : 'down'}-s-line`}></i>
            </div>
            
            <div 
              ref={filterRefs.price}
              className="filter-section__content"
            >
              <div className="price-range">
                <div className="price-inputs">
                  <div className="price-field">
                    <label htmlFor="min-price">Min (₹)</label>
                    <input 
                      type="number"
                      id="min-price"
                      value={filters.price.min}
                      min="0"
                      max={filters.price.max - 1}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                    />
                  </div>
                  
                  <div className="price-field">
                    <label htmlFor="max-price">Max (₹)</label>
                    <input 
                      type="number"
                      id="max-price"
                      value={filters.price.max}
                      min={filters.price.min + 1}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="price-slider">
                  <div className="price-range-track">
                    <div 
                      className="price-range-fill"
                      style={{
                        left: `${(filters.price.min / 50000) * 100}%`,
                        width: `${((filters.price.max - filters.price.min) / 50000) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid" ref={productGridRef}>
          {sortedProducts.length > 0 ? (
            sortedProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img 
                    className="product-image" 
                    src={product.image} 
                    alt={product.name} 
                  />
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-meta">
                    <div className="product-rating">
                      <span className="rating-stars">
                        {Array(5).fill().map((_, index) => (
                          <i 
                            key={index}
                            className={`ri-star-${index < Math.floor(product.rating) ? 'fill' : index < product.rating ? 'half-fill' : 'line'}`}
                          ></i>
                        ))}
                      </span>
                      <span className="rating-count">({product.reviews})</span>
                    </div>
                    
                    <div className="product-price-container">
                      <span className="product-price">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="product-original-price">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="product-features">
                    {product.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  
                  <div className="product-cta">
                    <button className="add-to-cart-btn">
                      <i className="ri-shopping-cart-line"></i>
                      Add to Cart
                    </button>
                    <button className="quick-view-btn">
                      <i className="ri-eye-line"></i>
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <i className="ri-emotion-sad-line"></i>
              <h3>No Products Found</h3>
              <p>Try adjusting your filters or browse a different category.</p>
              <button className="reset-filters-btn" onClick={clearAllFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get color codes
const getColorCode = (color) => {
  const colorMap = {
    'black': '#000000',
    'white': '#FFFFFF',
    'red': '#FF0000',
    'blue': '#0000FF',
    'grey': '#808080',
    'yellow': '#FFFF00'
  };
  return colorMap[color] || '#CCCCCC';
};

export default ProductPage; 