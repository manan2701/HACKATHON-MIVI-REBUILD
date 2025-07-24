import React, { useState, useEffect, useRef } from "react";
import "./Product.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncaddToCart } from "../store/actions/userActions";
import LoadingSpinner from "../components/LoadingSpinner";
import ModernLoader from "../components/ModernLoader";
import NoProductsFound from "../components/NoProductsFound";
gsap.registerPlugin(ScrollTrigger);

// Helper function to safely animate with GSAP
const safeAnimate = (target, animation, options = {}) => {
  // Only proceed if target exists and is a valid element or array of elements
  if (!target) {
    // If no target, immediately call onComplete if provided
    if (options.onComplete) options.onComplete();
    return;
  }

  // Check if it's an array-like object with valid elements
  if (Array.isArray(target)) {
    const validElements = target.filter((el) => el && typeof el === "object");
    if (validElements.length === 0) {
      // If no valid elements, immediately call onComplete if provided
      if (options.onComplete) options.onComplete();
      return;
    }
    gsap.to(validElements, { ...animation, ...options });
  } else {
    // For direct element references
    gsap.to(target, { ...animation, ...options });
  }
};

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    price: { min: 500, max: 50000 },
  });
  const [sortBy, setSortBy] = useState("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilterPanel, setActiveFilterPanel] = useState("sort");
  const [loadingProductId, setLoadingProductId] = useState(null);
  const productGridRef = useRef(null);
  const productCardsRef = useRef([]);
  const filterRefs = {
    sort: useRef(null),
    price: useRef(null),
  };

  const productsFromStore = useSelector(
    (state) => state.productReducer.products
  );
  const isProductsLoading = useSelector((state) => state.productReducer.loading);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ensure scrolling is always enabled after data loads
  useEffect(() => {
    if (productsFromStore && productsFromStore.length > 0) {
      // Force enable scrolling after data loads (with a delay to ensure rendering completes)
      const timer = setTimeout(() => {
        if (window.lenisScroll) window.lenisScroll.start();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [productsFromStore]);

  useEffect(() => {
    setProducts(productsFromStore);
  }, [productsFromStore]);

  // Reset product cards ref array when products change
  useEffect(() => {
    productCardsRef.current = productCardsRef.current.slice(0, products.length);

    // Always ensure scrolling is enabled when products change
    if (window.lenisScroll) {
      setTimeout(() => {
        window.lenisScroll.start();
      }, 500);
    }
  }, [products]);

  // GSAP animations for product cards
  useGSAP(() => {
    if (productGridRef.current && productCardsRef.current.length > 0) {
      // Temporarily stop smooth scrolling during animation
      if (window.lenisScroll) window.lenisScroll.stop();

      try {
        const validCards = productCardsRef.current.filter(
          (ref) => ref !== null
        );
        if (validCards.length > 0) {
          gsap.fromTo(
            validCards,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => {
                // Resume smooth scrolling after animation
                if (window.lenisScroll) window.lenisScroll.start();
              },
            }
          );
        } else if (window.lenisScroll) {
          // No valid elements but we need to restart scrolling
          window.lenisScroll.start();
        }
      } catch (error) {
        console.error("Animation error:", error);
        // Ensure scrolling is restored even if animation fails
        if (window.lenisScroll) window.lenisScroll.start();
      }

      // Safety timeout to ensure scrolling is always re-enabled
      setTimeout(() => {
        if (window.lenisScroll) window.lenisScroll.start();
      }, 1200); // Just after animation should complete
    }
  }, [products]);

  // Set up filter panel animations
  useEffect(() => {
    // Initial setup for filter panels
    Object.keys(filterRefs).forEach((key) => {
      if (key === activeFilterPanel && filterRefs[key].current) {
        const contentEl = filterRefs[key].current;
        contentEl.classList.add("active");
      }
    });
  }, []);

  // Toggle filter panel with smooth animation
  const toggleFilterPanel = (panelName) => {
    // Handle closing current panel
    if (activeFilterPanel) {
      const currentContentEl = filterRefs[activeFilterPanel]?.current;
      if (currentContentEl) {
        currentContentEl.classList.remove("active");
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
          newContentEl.classList.add("active");
        }
      }, 50); // Small delay to allow state to update
    }
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by subcategory
    if (activeCategory !== "all" && product.subcategory !== activeCategory) {
      return false;
    }

    // Filter by price
    if (
      product.price < filters.price.min ||
      product.price > filters.price.max
    ) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0; // Featured sorting
    }
  });

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    // Animation for category change - using ref instead of direct selector
    if (productGridRef.current) {
      // Temporarily stop smooth scrolling during animation
      if (window.lenisScroll) window.lenisScroll.stop();

      try {
        safeAnimate(productGridRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            safeAnimate(productGridRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.1,
              onComplete: () => {
                // Resume smooth scrolling after animation
                if (window.lenisScroll) window.lenisScroll.start();
              },
            });
          },
        });
      } catch (error) {
        console.error("Animation error:", error);
        // Ensure scrolling is restored even if animation fails
        if (window.lenisScroll) window.lenisScroll.start();
      }

      // Safety timeout to ensure scrolling is always re-enabled
      setTimeout(() => {
        if (window.lenisScroll) window.lenisScroll.start();
      }, 1000);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Fixed price filter handling
  const handlePriceChange = (type, value) => {
    const parsedValue = parseInt(value);

    if (type === "min") {
      // Handle min price changes
      if (isNaN(parsedValue)) {
        setFilters({
          ...filters,
          price: { ...filters.price, min: 0 },
        });
      } else {
        // Ensure min can't exceed max
        const newMin = Math.min(parsedValue, filters.price.max - 500);
        setFilters({
          ...filters,
          price: { ...filters.price, min: Math.max(0, newMin) },
        });
      }
    } else {
      // Handle max price changes
      if (isNaN(parsedValue)) {
        setFilters({
          ...filters,
          price: { ...filters.price, max: 50000 },
        });
      } else {
        // Ensure max is at least min + 500
        const newMax = Math.max(parsedValue, filters.price.min + 500);
        setFilters({
          ...filters,
          price: { ...filters.price, max: Math.min(50000, newMax) },
        });
      }
    }
  };

  const clearAllFilters = () => {
    setFilters({
      price: { min: 500, max: 50000 },
    });
    setSortBy("featured");

    // Animation for reset - using ref instead of direct selector
    if (productGridRef.current) {
      // Temporarily stop smooth scrolling during animation
      if (window.lenisScroll) window.lenisScroll.stop();

      safeAnimate(productGridRef.current, {
        opacity: 0.5,
        scale: 0.98,
        duration: 0.3,
        onComplete: () => {
          safeAnimate(productGridRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            onComplete: () => {
              // Resume smooth scrolling after animation
              if (window.lenisScroll) window.lenisScroll.start();
            },
          });
        },
      });
    }
  };

  const getTotalActiveFilters = () => {
    let count = 0;
    if (filters.price.min > 500 || filters.price.max < 50000) count += 1;
    if (sortBy !== "featured") count += 1;
    return count;
  };

  // Function to add reference to product card
  const addToRefs = (el, index) => {
    if (el && !productCardsRef.current[index]) {
      productCardsRef.current[index] = el;
    }
  };

  // Function to handle adding product to cart
  const handleAddToCart = async (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
  
    const firstColorKey = product.color && product.color.length > 0 
      ? Object.keys(product.color[0])[0] 
      : null;
  
    if (!firstColorKey) {
      console.error("No color available for this product");
      return;
    }
  
    setLoadingProductId(product._id); // Start loader
  
    try {
      await dispatch(asyncaddToCart(user, product, firstColorKey));
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setLoadingProductId(null); // Stop loader
    }
  };
  

  return (
    <div className="product-page">
      <div className="product-page__header">
        <h1 className="product-page__title">Our Products</h1>
        <p className="product-page__subtitle">
          Experience the next generation of audio with Mivi's cutting-edge
          products
        </p>
      </div>

      {/* Category Navigation */}
      <div className="product-page__categories">
        <button
          className={`category-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => handleCategoryClick("all")}
        >
          <span>All Products</span>
          <div className="category-indicator"></div>
        </button>

        <button
          className={`category-btn ${
            activeCategory === "gaming-pod" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("gaming-pod")}
        >
          <span>Gaming Pods</span>
          <div className="category-indicator"></div>
        </button>

        <button
          className={`category-btn ${
            activeCategory === "duopods" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("duopods")}
        >
          <span>DuoPods</span>
          <div className="category-indicator"></div>
        </button>

        <button
          className={`category-btn ${
            activeCategory === "superpods" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("superpods")}
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
        <div
          className={`product-filters ${
            showMobileFilters ? "show-mobile" : ""
          }`}
        >
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
              onClick={() => toggleFilterPanel("sort")}
            >
              <h4>Sort By</h4>
              <i
                className={`ri-arrow-${
                  activeFilterPanel === "sort" ? "up" : "down"
                }-s-line`}
              ></i>
            </div>

            <div ref={filterRefs.sort} className="filter-section__content">
              <div className="filter-option">
                <input
                  type="radio"
                  id="sort-featured"
                  name="sort"
                  checked={sortBy === "featured"}
                  onChange={() => handleSortChange("featured")}
                />
                <label htmlFor="sort-featured">Featured</label>
              </div>

              <div className="filter-option">
                <input
                  type="radio"
                  id="sort-price-low"
                  name="sort"
                  checked={sortBy === "price-low"}
                  onChange={() => handleSortChange("price-low")}
                />
                <label htmlFor="sort-price-low">Price: Low to High</label>
              </div>

              <div className="filter-option">
                <input
                  type="radio"
                  id="sort-price-high"
                  name="sort"
                  checked={sortBy === "price-high"}
                  onChange={() => handleSortChange("price-high")}
                />
                <label htmlFor="sort-price-high">Price: High to Low</label>
              </div>
            </div>
          </div>

          {/* Price Filter */}
          <div className="filter-section">
            <div
              className="filter-section__header"
              onClick={() => toggleFilterPanel("price")}
            >
              <h4>Price Range</h4>
              <i
                className={`ri-arrow-${
                  activeFilterPanel === "price" ? "up" : "down"
                }-s-line`}
              ></i>
            </div>

            <div ref={filterRefs.price} className="filter-section__content">
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
                      onChange={(e) => handlePriceChange("min", e.target.value)}
                    />
                  </div>

                  <div className="price-field">
                    <label htmlFor="max-price">Max (₹)</label>
                    <input
                      type="number"
                      id="max-price"
                      value={filters.price.max}
                      min={filters.price.min + 1}
                      onChange={(e) => handlePriceChange("max", e.target.value)}
                    />
                  </div>
                </div>

                <div className="price-slider">
                  <div className="price-range-track">
                    <div
                      className="price-range-fill"
                      style={{
                        left: `${(filters.price.min / 50000) * 100}%`,
                        width: `${
                          ((filters.price.max - filters.price.min) / 50000) *
                          100
                        }%`,
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
          {isProductsLoading ? (
            <div className="products-loading-container">
              <ModernLoader />
            </div>
          ) : products.length === 0 ? (
            <NoProductsFound 
              title="No Products Available" 
              message="Please try again later or check your connection."
              buttonText="Refresh Page"
              onButtonClick={() => window.location.reload()}
            />
          ) : sortedProducts.length > 0 ? (
            sortedProducts.map((product, index) => (
              <div
                key={product._id}
                className="product-card"
                ref={(el) => addToRefs(el, index)}
              >
                <Link to={`/products/${product._id}`} className="product-link">
                  <div className="product-image-container">
                    <img
                      className="product-image"
                      src={Object.values(product.color[0])[0]}
                      alt={product.name}
                    />
                  </div>
                </Link>

                <div className="product-info">
                  <Link
                    to={`/products/${product._id}`}
                    className="product-name-link"
                  >
                    <h3 className="product-name">{product.name}</h3>
                  </Link>
                  <p className="product-description">{product.tagline}</p>

                  <div className="product-meta">
                    <div className="product-rating">
                      <span className="rating-stars">
                        {Array(5)
                          .fill()
                          .map((_, index) => (
                            <i
                              key={index}
                              className={`ri-star-${
                                index < Math.floor(product.rating)
                                  ? "fill"
                                  : index < product.rating
                                  ? "half-fill"
                                  : "line"
                              }`}
                            ></i>
                          ))}
                      </span>
                      <span className="rating-count">({product.reviews})</span>
                    </div>

                    <div className="product-price-container">
                      <span className="product-price">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="product-original-price">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="product-features">
                    {product.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="product-cta">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                      disabled={loadingProductId === product._id}
                    >
                      {loadingProductId === product._id ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          <i className="ri-shopping-cart-line"></i> Add to Cart
                        </>
                      )}
                    </button>
                    <Link
                      to={`/products/${product._id}`}
                      className="quick-view-btn"
                    >
                      <i className="ri-eye-line"></i>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoProductsFound 
              title="No Products Found" 
              message="Try adjusting your filters or browse a different category."
              buttonText="Reset Filters"
              onButtonClick={clearAllFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
