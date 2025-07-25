import React, { useState, useEffect, useRef } from "react";
import "./Product.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncaddToCart } from "../store/actions/userActions";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ModernLoader from "../components/ui/ModernLoader";
import NoProductsFound from "../components/ui/NoProductsFound";
gsap.registerPlugin(ScrollTrigger);

const safeAnimate = (target, animation, options = {}) => {
  if (!target) {
    if (options.onComplete) options.onComplete();
    return;
  }
  if (Array.isArray(target)) {
    const validElements = target.filter((el) => el && typeof el === "object");
    if (validElements.length === 0) {
      if (options.onComplete) options.onComplete();
      return;
    }
    gsap.to(validElements, { ...animation, ...options });
  } else {
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
  const productsFromStore = useSelector((state) => state.productReducer.products);
  const isProductsLoading = useSelector((state) => state.productReducer.loading);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (productsFromStore && productsFromStore.length > 0) {
      const timer = setTimeout(() => {
        if (window.lenisScroll) window.lenisScroll.start();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [productsFromStore]);

  useEffect(() => {
    setProducts(productsFromStore);
  }, [productsFromStore]);

  useEffect(() => {
    productCardsRef.current = productCardsRef.current.slice(0, products.length);
    if (window.lenisScroll) {
      setTimeout(() => {
        window.lenisScroll.start();
      }, 500);
    }
  }, [products]);

  useGSAP(() => {
    if (productGridRef.current && productCardsRef.current.length > 0) {
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
                if (window.lenisScroll) window.lenisScroll.start();
              },
            }
          );
        } else if (window.lenisScroll) {
          window.lenisScroll.start();
        }
      } catch (error) {
        if (window.lenisScroll) window.lenisScroll.start();
      }
      setTimeout(() => {
        if (window.lenisScroll) window.lenisScroll.start();
      }, 1200);
    }
  }, [products]);

  useEffect(() => {
    Object.keys(filterRefs).forEach((key) => {
      if (key === activeFilterPanel && filterRefs[key].current) {
        const contentEl = filterRefs[key].current;
        contentEl.classList.add("active");
      }
    });
  }, []);

  const toggleFilterPanel = (panelName) => {
    if (activeFilterPanel) {
      const currentContentEl = filterRefs[activeFilterPanel]?.current;
      if (currentContentEl) {
        currentContentEl.classList.remove("active");
      }
    }
    if (activeFilterPanel === panelName) {
      setActiveFilterPanel(null);
    } else {
      setActiveFilterPanel(panelName);
      setTimeout(() => {
        const newContentEl = filterRefs[panelName]?.current;
        if (newContentEl) {
          newContentEl.classList.add("active");
        }
      }, 50);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (activeCategory !== "all" && product.subcategory !== activeCategory) {
      return false;
    }
    if (
      product.price < filters.price.min ||
      product.price > filters.price.max
    ) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (productGridRef.current) {
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
                if (window.lenisScroll) window.lenisScroll.start();
              },
            });
          },
        });
      } catch (error) {
        if (window.lenisScroll) window.lenisScroll.start();
      }
      setTimeout(() => {
        if (window.lenisScroll) window.lenisScroll.start();
      }, 1000);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handlePriceChange = (type, value) => {
    const parsedValue = parseInt(value);
    if (type === "min") {
      if (isNaN(parsedValue)) {
        setFilters({
          ...filters,
          price: { ...filters.price, min: 0 },
        });
      } else {
        const newMin = Math.min(parsedValue, filters.price.max - 500);
        setFilters({
          ...filters,
          price: { ...filters.price, min: Math.max(0, newMin) },
        });
      }
    } else {
      if (isNaN(parsedValue)) {
        setFilters({
          ...filters,
          price: { ...filters.price, max: 50000 },
        });
      } else {
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
    if (productGridRef.current) {
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

  const addToRefs = (el, index) => {
    if (el && !productCardsRef.current[index]) {
      productCardsRef.current[index] = el;
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const firstColorKey = product.color && product.color.length > 0 
      ? Object.keys(product.color[0])[0] 
      : null;
    if (!firstColorKey) return;
    setLoadingProductId(product._id);
    try {
      await dispatch(asyncaddToCart(user, product, firstColorKey));
    } finally {
      setLoadingProductId(null);
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
