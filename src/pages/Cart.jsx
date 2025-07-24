import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import { asyncupdateuser, asyncPlaceOrder } from '../store/actions/userActions';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);  
  const [cartItems, setCartItems] = useState([]);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi'
  });
  const [useProfileAddress, setUseProfileAddress] = useState(false);
  
  useEffect(() => {
    setCartItems(user?.cart);
    // Initialize checkout form with user's address if available
    if (user) {
      setCheckoutData({
        address: user?.address,
        city: user?.city,
        state: user?.state,
        pincode: user?.pincode,
        paymentMethod: 'upi'
      });
    }
  }, [user]);
  
  // Calculate totals
  const subtotal = cartItems?.reduce((acc, item) => acc + item?.product?.price * item?.quantity, 0) || 0;
  const totalMRP = cartItems?.reduce((acc, item) => acc + item?.product?.originalPrice * item?.quantity, 0) || 0;
  const discount = totalMRP - subtotal;
  
  // Handle quantity changes - updated to check both ID and color and persist to database
  const handleQuantityChange = (id, color, change) => {
    const updatedCartItems = cartItems?.map(item => {
      if (item?.product?._id === id && item?.product?.color[0]?.name === color) {
        const newQuantity = Math.max(1, item.quantity + change);
        return {...item, quantity: newQuantity};
      }
      return item;
    });
    
    // Update local state
    setCartItems(updatedCartItems);
    
    // Update database
    if (user) {
      const updatedUser = {
        ...user,
        cart: updatedCartItems
      };
      dispatch(asyncupdateuser(user._id, updatedUser));
    }
  };
  
  // Remove item from cart - updated to check both ID and color and persist to database
  const removeItem = (id, color) => {
    const updatedCartItems = cartItems?.filter(item => 
      !(item?.product?._id === id && item?.product?.color[0]?.name === color)
    );
    
    // Update local state
    setCartItems(updatedCartItems);
    
    // Update database
    if (user) {
      const updatedUser = {
        ...user,
        cart: updatedCartItems
      };
      dispatch(asyncupdateuser(user._id, updatedUser));
    }
  };

  // Toggle checkout form
  const toggleCheckoutForm = () => {
    setShowCheckoutForm(!showCheckoutForm);
    
    // Toggle body scroll when modal is open/closed
    if (!showCheckoutForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Close the modal when clicking outside
  const handleModalClick = (e) => {
    if (e.target.className === 'checkout-modal') {
      toggleCheckoutForm();
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData({
      ...checkoutData,
      [name]: value
    });
  };

  // Toggle using profile address
  const handleUseProfileAddress = () => {
    setUseProfileAddress(!useProfileAddress);
    if (!useProfileAddress) {
      // Restore profile address
      setCheckoutData({
        ...checkoutData,
        address: user?.address,
        city: user?.city,
        state: user?.state,
        pincode: user?.pincode
      });
    }
  };

  const placeOrder = async () => {
    const orderData = {
      items: cartItems,
      totalAmount: subtotal,
      shippingAddress: {
        address: checkoutData.address,
        city: checkoutData.city,
        state: checkoutData.state,
        pincode: checkoutData.pincode
      },
      paymentMethod: checkoutData.paymentMethod,
    };
  
    const updatedUserData = {
      ...user,
      address: checkoutData.address,
      city: checkoutData.city,
      state: checkoutData.state,
      pincode: checkoutData.pincode
    };
  
    // ✅ Await user update and check result
    const userUpdated = dispatch(asyncupdateuser(user._id, updatedUserData));
  
    if (!userUpdated) {
      console.error("User update failed.");
      return; // Stop here if update failed
    }
  
    // ✅ Await order placement
    const orderSuccess = await dispatch(asyncPlaceOrder(user, orderData));
  
    if (orderSuccess) {
      setCartItems([]);
      setShowCheckoutForm(false);
      navigate('/profile');
    } else {
      console.error("Order placement failed.");
    }
  };
  

  return (
    <div className="cart-page">
      <div className="page-width cart_main__container">
        <div className="cart-items-container">
          {cartItems?.length === 0 ? (
            // Empty cart state
            <div className="cart__warnings">
              <div className="empty-cart-empty">
                <h2 className="cart-empty-heading">Your Shopping Bag</h2>
                <h1 className="cart__empty-text">You have no items in your bag right now</h1>
                <Link to="/products" className="button shop-now-btn">SHOP NOW</Link>
              </div>
            </div>
          ) : (
            // Populated cart state
            <>
              <div className="cart-info-heading">
                <h2 className="cart-items-heading">
                  Your Bag
                  <sup>({cartItems?.reduce((acc, item) => acc + item.quantity, 0)})</sup>
                </h2>
                <p className="bag-text">Confirm your items before checking out</p>
              </div>
              
              <div className="cart-items-list">
                {cartItems?.map((item) => (
                  <div key={`${item?.product?._id}-${item?.product?.color[0]?.name}`} className="cart-item">
                    <div className="cart-item-media">
                      <Link to={`/products/${item?.product?._id}`} className="cart-item-link">
                        <div className="cart-item-image-container">
                          <img src={item?.product?.color[0]?.image} alt={item?.product?.name} className="cart-item-image" />
                        </div>
                      </Link>
                    </div>
                    
                    <div className="cart-item-details">
                      <div className="price-title-container">
                        <Link to={`/products/${item?.product?._id}`} className="cart-item-name">{item?.product?.name}</Link>
                        <div className="product-option">
                          <h4 className="cart-swatches-title">Color:</h4>
                          <span className="item-option-value">{item?.product?.color[0]?.name}</span>
                        </div>
                      </div>
                      
                      <div className="cart-item-prices">
                        <div className="cart-original-price">₹{item?.product?.price?.toLocaleString()}</div>
                        <span className="item-comp-price">₹{item.product?.originalPrice?.toLocaleString()}</span>
                      </div>
                      
                      <div className="cart-item-quantity">
                        <div className="quantity">
                          <button 
                            className="quantity-button minus" 
                            onClick={() => handleQuantityChange(
                              item?.product?._id, 
                              item?.product?.color[0]?.name,
                              -1
                            )}
                            disabled={item?.quantity <= 1}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M12.6668 8.66536H3.3335V7.33203H12.6668V8.66536Z" fill="#343B36"></path>
                            </svg>
                          </button>
                          
                          <input 
                            className="quantity-input"
                            type="number"
                            id={`quantity-${item?.product?._id}-${item?.product?.color[0]?.name}`}
                            name={`updates[${item?.product?._id}-${item?.product?.color[0]?.name}]`}
                            value={item?.quantity}
                            min="1"
                            readOnly
                          />  
                          <button 
                            className="quantity-button plus"
                            onClick={() => handleQuantityChange(
                              item?.product?._id, 
                              item?.product?.color[0]?.name,
                              1
                            )}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <g mask="url(#mask0_1988_1723)">
                                <path d="M7.33325 8.66671H3.33325V7.33337H7.33325V3.33337H8.66658V7.33337H12.6666V8.66671H8.66658V12.6667H7.33325V8.66671Z" fill="#343B36"></path>
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="cart-item-totals">
                      <span className="price">₹{(item?.product?.price * item?.quantity)?.toLocaleString()}</span>
                    </div>
                    
                    <button 
                      className="remove-item-button" 
                      onClick={() => removeItem(
                        item?.product?._id,
                        item?.product?.color[0]?.name
                      )}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4.66699 12.6667L3.33366 11.3333L6.66699 8.00001L3.33366 4.66668L4.66699 3.33334L8.00033 6.66668L11.3337 3.33334L12.667 4.66668L9.33366 8.00001L12.667 11.3333L11.3337 12.6667L8.00033 9.33334L4.66699 12.6667Z" fill="#343B36"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        {cartItems?.length > 0 && (
          <div className="cart-footer">  
            <div className="cart-footer-details">
              <div className="cart-totals">
                <div className="cart-total-price">₹{subtotal?.toLocaleString()}</div>
                <div className="cart-footer-details-link">VIEW DETAILS</div>
              </div>
              
              <div className="cart-ctas">
                <button 
                  type="button" 
                  className="button checkout-button"
                  onClick={toggleCheckoutForm}
                >
                  <span className="btn-text">
                    <span>Place Order</span>
                  </span>
                  <span className="pay-opt-icon">
                    <img src="https://cdn.gokwik.co/v4/images/upi-icons.svg" alt="UPI" />
                  </span>
                </button>
              </div>
              
              <div className="emi-option" onClick={toggleCheckoutForm}>
                <div className="pay-later-wrapper">
                  <div className="pay-dp-line">
                    <span className="inst-first-text">PAY</span>
                    <span className="rupee">₹</span>
                    <span className="dp-amount">{Math.round(subtotal / 3).toLocaleString()}</span>
                    <span className="inst-middle-text">NOW</span>
                  </div>
                  <div className="powered-line">Rest at 0% EMI with MIVI Pay Later</div>
                </div>
              </div>
            </div>
            
            <div className="cart-order-summary">
              <div className="order-summary-title">
                <h3>Order Summary</h3>
                <p className="order-summary-text">Shipping & discounts will be applied at checkout</p>
              </div>
              
              <div className="order-summary-info">
                <div className="cart-subtotal">
                  <div className="cart-subtotal-label">Total MRP ({cartItems?.reduce((acc, item) => acc + item.quantity, 0)} Items)</div>
                  <div className="cart-subtotal-value">₹{totalMRP?.toLocaleString()}</div>
                </div>
                
                <div className="cart-discount">
                  <div className="cart-discount-label">Discount on MRP</div>
                  <div className="cart-discount-value">- ₹{discount?.toLocaleString()}</div>
                </div>
                
                <div className="cart-total">
                  <div className="cart-total-label">Subtotal</div>
                  <div className="cart-total-value">₹{subtotal?.toLocaleString()}</div>
                </div>
              </div>
            </div>
            <div className="cart-policies">
              <div className="collapsible-content">
                <details className="cart-policy-details">
                  <summary className="cart-policy-summary">
                    <span className="cart-policy-title">Return and Cancellation</span>
                    <span className="cart-policy-icon">+</span>
                  </summary>
                  <div className="cart-policy-content">
                    <p>We offer replacement within 7 days of delivery. Orders can be canceled within 24 hours of purchase.</p>
                  </div>
                </details>
                
                <details className="cart-policy-details">
                  <summary className="cart-policy-summary">
                    <span className="cart-policy-title">Privacy Policy</span>
                    <span className="cart-policy-icon">+</span>
                  </summary>
                  <div className="cart-policy-content">
                    <p>We respect your privacy and protect your data with industry-standard security. Your information is never shared without consent.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Form Modal */}
      {showCheckoutForm && (
        <div className="checkout-modal" onClick={handleModalClick}>
          <div className="checkout-form-container">
            <div className="checkout-form-header">
              <h2>Complete Your Order</h2>
              <button className="close-button" onClick={toggleCheckoutForm}>×</button>
            </div>
            
            <div className="checkout-form">
              <div className="checkout-columns">
                <div className="checkout-left-column">
                  <div className="form-section shipping-address-section">
                    <h3>Shipping Address</h3>
                    <div className="use-profile-address">
                      <input
                        type="checkbox"
                        id="use-profile-address"
                        checked={useProfileAddress}
                        onChange={handleUseProfileAddress}
                      />
                      <label htmlFor="use-profile-address">Use address from profile</label>
                    </div>
                    
                    <div className="checkout-form-group">
                      <label htmlFor="address">Address</label>
                      <textarea
                        id="address"
                        name="address"
                        value={checkoutData.address || ''}
                        onChange={handleInputChange}
                        disabled={useProfileAddress}
                        required
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="checkout-form-group">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={checkoutData.city || ''}
                          onChange={handleInputChange}
                          disabled={useProfileAddress}
                          required
                        />
                      </div>
                      
                      <div className="checkout-form-group">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={checkoutData.state || ''}
                          onChange={handleInputChange}
                          disabled={useProfileAddress}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="checkout-form-group">
                      <label htmlFor="pincode">Pincode</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={checkoutData.pincode || ''}
                        onChange={handleInputChange}
                        disabled={useProfileAddress}
                        required
                      />
                    </div>                    
                  </div>
                  
                  <div className="form-section payment-section">
                    <h3>Payment Method</h3>
                    <div className="payment-options">
                      <div className="payment-option">
                        <input
                          type="radio"
                          id="upi"
                          name="paymentMethod"
                          value="upi"
                          checked={checkoutData.paymentMethod === 'upi'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="upi">UPI</label>
                      </div>
                      
                      <div className="payment-option">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={checkoutData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="card">Credit/Debit Card</label>
                      </div>
                      
                      <div className="payment-option">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="cod"
                          checked={checkoutData.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="cod">Cash on Delivery</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="checkout-right-column">
                  <div className="order-summary-section">
                    <h3>Order Summary</h3>
                    <div className="order-summary-details">
                      <div className="summary-row">
                        <span>Items ({cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0})</span>
                        <span>₹{totalMRP?.toLocaleString()}</span>
                      </div>
                      <div className="summary-row">
                        <span>Discount</span>
                        <span>-₹{discount?.toLocaleString()}</span>
                      </div>
                      <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="summary-row total">
                        <span>Total</span>
                        <span>₹{subtotal?.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button type="button" className="cancel-button" onClick={toggleCheckoutForm}>
                        Cancel
                      </button>
                      <button type="button" className="place-order-button" onClick={placeOrder}>
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;