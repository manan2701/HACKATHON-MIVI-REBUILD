import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./ProductDetail.css";
import { asyncaddToCart } from "../store/actions/userActions";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetail = () => {
  const { productId } = useParams();
  const products = useSelector((state) => state.productReducer.products);
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const users = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length > 0 && productId) {
      const foundProduct = products.find((p) => p._id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        // Set default selected color to first color
        if (foundProduct.color && foundProduct.color.length > 0) {
          const firstColorKey = Object.keys(foundProduct.color[0])[0];

          setSelectedColor(firstColorKey);
        }
        setIsLoading(false);
      }
    }
  }, [products, productId]);

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const addToCart = async (user, product) => {
    setLoadingProductId(product._id);
    await dispatch(asyncaddToCart(user, product, selectedColor));
    setLoadingProductId(null);
  };

  if (isLoading || !product) {
    return (
      <div className="product-detail-loading">
        <div className="product-detail-loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  // Extract colors from product
  const colors = product.color.map((colorObj) => {
    const colorName = Object.keys(colorObj)[0];
    return {
      name: colorName,
      image: colorObj[colorName],
    };
  });

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Product Images Section */}
        <div className="product-detail__images">
          <div className="product-detail__main-image">
            <img
              src={
                colors.find((c) => c.name === selectedColor)?.image ||
                colors[0]?.image ||
                "/assets/product-placeholder.jpg"
              }
              alt={product.name}
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-detail__info-wrapper">
          <div className="product-detail__info-container">
            <div className="product-detail__title">
              <h1>{product.name}</h1>
            </div>

            <p className="product-detail__text">{product.subcategory}</p>

            <div className="product-detail__description">
              <strong>{product.tagline}</strong>
              <p>{product.description}</p>
            </div>

            {/* Color Variant Selection */}
            <div className="product-detail-form__input Color">
              <legend className="product-detail-form__label">
                Color: <span id="selected-color-name">{selectedColor}</span>
              </legend>
              <div className="product-detail-values-container">
                {colors.map((color, index) => (
                  <div key={index} className="product-detail__thumbnails">
                    <div
                      className={`product-detail-thumbnail-item ${
                        selectedColor === color.name ? "active" : ""
                      }`}
                      key={index}
                      onClick={() => handleColorSelect(color.name)}
                    >
                      <img
                        src={color.image}
                        alt={`${product.name} in ${color.name}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div className="product-detail-ratings">
              <div className="product-detail-stars-container">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <span
                      key={i}
                      className={`product-detail-star ${
                        i < Math.floor(product.rating)
                          ? "full"
                          : i < product.rating
                          ? "half"
                          : "empty"
                      }`}
                    ></span>
                  ))}
              </div>
              <span className="product-detail-rating-text">
                {product.reviews} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="product-detail-price-content">
              <div className="product-detail-price product-detail-price--large product-detail-price--on-sale">
                <div className="product-detail-price__container">
                  <div className="product-detail-price__sale">
                    <span className="product-detail-price-item product-detail-price-item--sale">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span>
                      <s className="product-detail-price-item product-detail-price-item--regular">
                        ₹{product.originalPrice.toLocaleString()}
                      </s>
                    </span>
                  </div>
                </div>
                <div className="product-detail-website-info">
                  <span className="product-detail-coupon">
                    EXCLUSIVE OFFER: Just for Today
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="product-detail-form__buttons">
              <button
                type="button"
                className="product-detail-form__submit button button--primary"
                onClick={() => addToCart(users, product)}
                disabled={loadingProductId === product._id}
              >
                {loadingProductId === product._id ? (
                  <LoadingSpinner />
                ) : (
                  <span className="product-detail-add-to-cart-button">
                    Add to Cart
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Add to Cart Sticky */}
            <div className="product-detail-mobile-add-to-cart-snippet">
              <div className="product-detail-mobile-add-cart-sticky-container">
                <div className="product-detail-price product-detail-mobile__add-to-cart-price">
                  <div className="product-detail-price__container product-detail-mobile-add-to-cart-sticky-container">
                    <div className="product-detail-price__sale">
                      <s className="product-detail-price-item product-detail-price-item--regular">
                        ₹{product.originalPrice.toLocaleString()}
                      </s>
                      <span className="product-detail-price-item product-detail-price-item--sale">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="product-detail-website-info product-detail-mobile-add-to-cart-sticky-info">
                    <span className="product-detail-coupon">
                      EXCLUSIVE OFFER: Just for Today
                    </span>
                  </div>
                  <div className="product-detail-mobile-add-to-cart-sticky-button">
                    <button
                      type="button"
                      className="font-body-text"
                      onClick={() => addToCart(users, product)}
                      disabled={loadingProductId === product._id}
                    >
                      {loadingProductId === product._id ? (
                        <LoadingSpinner />
                      ) : (
                        "ADD TO CART"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product USP */}
            <ul className="product-detail-usp flexbox product_featured_tags">
              <li className="product-detail-usp--item">
                <div className="product-detail-usp-icon">
                  <i className="ri-truck-line"></i>
                </div>
                <span className="product-detail-usp__icon__text">
                  Free Shipping
                </span>
              </li>
              <li className="product-detail-usp--item">
                <div className="product-detail-usp-icon">
                  <i className="ri-shield-check-line"></i>
                </div>
                <span className="product-detail-usp__icon__text">
                  1 year Warranty
                </span>
              </li>
              <li className="product-detail-usp--item">
                <div className="product-detail-usp-icon">
                  <i className="ri-time-line"></i>
                </div>
                <span className="product-detail-usp__icon__text">
                  Ships Today
                </span>
              </li>
            </ul>

            <div className="product-detail__tax">
              <a href="/shipping">Shipping</a> calculated at checkout.
            </div>
          </div>
        </div>
      </div>

      {/* Product Features Section */}
      <div className="product-detail-features-section">
        <h2>Features</h2>
        <ul className="product-detail-features-list">
          {product.features &&
            product.features.map((feature, index) => (
              <li key={index} className="product-detail-feature-item">
                <i className="ri-check-line"></i>
                <span>{feature}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;
