import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { toast } from "../components/ui/CustomToast.jsx";
import { asyncupdateuser, asyncLogoutUser } from "../store/actions/userActions";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [formData, setFormData] = useState({
    _id: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [activeTab, setActiveTab] = useState("orders");
  const [isMobile, setIsMobile] = useState(false);
  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
      });
    }
  }, [user]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    dispatch(asyncLogoutUser(navigate));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const enablePersonalInfoEdit = () => setEditPersonalInfo(true);
  const enableAddressEdit = () => setEditAddress(true);

  const savePersonalInfo = () => {
    const updatedUser = { ...user, ...formData };
    dispatch(asyncupdateuser(user._id, updatedUser));  
    setEditPersonalInfo(false);
    toast.success("Personal information updated successfully");
  };

  const saveAddress = () => {
    const updatedUser = { ...user, ...formData };
    dispatch(asyncupdateuser(user._id, updatedUser));
    setEditAddress(false);
    toast.success("Address updated successfully");
  };

  const cancelEdit = (section) => {
    if (section === "personal") {
      setEditPersonalInfo(false);
      setFormData((prev) => ({
        ...prev,
        fullName: user?.fullName,
        email: user?.email,
        phone: user?.phone,
      }));
    } else if (section === "address") {
      setEditAddress(false);
      setFormData((prev) => ({
        ...prev,
        address: user?.address,
        city: user?.city,
        state: user?.state,
        pincode: user?.pincode,
      }));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="header-content">
          <div className="profile-avatar">
            {formData.fullName
              ? formData.fullName.charAt(0).toUpperCase()
              : "U"}
          </div>
          <div className="profile-user-info">
            <h1>{formData.fullName}</h1>
            <p>{formData.email}</p>
          </div>
        </div>
        <div className="header-ladder"></div>
      </div>
      <div className="profile-body">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>ACCOUNT</h2>
          </div>
          <div className="sidebar-menu">
          <button
              className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <i className="ri-shopping-bag-line"></i>
              <span>My Orders</span>
              <i className="ri-arrow-right-s-line arrow-icon"></i>
            </button>
            <button
              className={`menu-item ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              <i className="ri-user-line"></i>
              <span>My Details</span>
              <i className="ri-arrow-right-s-line arrow-icon"></i>
            </button>
            <button className="menu-item logout" onClick={handleLogout}>
              <i className="ri-logout-box-r-line"></i>
              <span>Logout</span>
              <i className="ri-arrow-right-s-line arrow-icon"></i>
            </button>
          </div>
        </div>
        <div className="content-area">
          {activeTab === "details" && (
            <div className="tab-content details-tab">
              <h2>My Details</h2>
              <p className="tab-description">
                Manage your personal information and addresses
              </p>
              <div className="details-section">
                <h3>
                  Personal Information
                  {!editPersonalInfo ? (
                    <button
                      className="edit-button"
                      onClick={enablePersonalInfoEdit}
                    >
                      <i className="ri-pencil-line"></i> Edit
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button
                        className="save-button"
                        onClick={savePersonalInfo}
                      >
                        <i className="ri-check-line"></i> Save
                      </button>
                      <button
                        className="profile-cancel-button"
                        onClick={() => cancelEdit("personal")}
                      >
                        <i className="ri-close-line"></i> Cancel
                      </button>
                    </div>
                  )}
                </h3>
                {!editPersonalInfo ? (
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Full Name</label>
                      <div className="info-value">{formData.fullName}</div>
                    </div>
                    <div className="info-item">
                      <label>Email</label>
                      <div className="info-value">{formData.email}</div>
                    </div>
                    <div className="info-item">
                      <label>Phone</label>
                      <div className="info-value">+91{formData.phone}</div>
                    </div>
                  </div>
                ) : (
                  <form
                    className="edit-form personal-form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="form-grid">
                      <div className="profile-form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="profile-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="profile-form-group">
                        <label htmlFor="phone">Phone</label>
                        <div className="phone-input-container">
                          <span className="country-code">+91</span>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
              <div className="details-section">
                <h3>
                  Address
                  {!editAddress ? (
                    <button className="edit-button" onClick={enableAddressEdit}>
                      <i className="ri-pencil-line"></i> Edit
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button className="save-button" onClick={saveAddress}>
                        <i className="ri-check-line"></i> Save
                      </button>
                      <button
                        className="profile-cancel-button"
                        onClick={() => cancelEdit("address")}
                      >
                        <i className="ri-close-line"></i> Cancel
                      </button>
                    </div>
                  )}
                </h3>
                {!editAddress ? (
                  <div className="address-card">
                    <div className="address-header">
                      <h4>Shipping Address</h4>
                      <span className="default-badge">Default</span>
                    </div>
                    <div className="address-body">
                      <p>{formData.fullName}</p>
                      <p>{formData.address}</p>
                      <p>
                        {formData.city}, {formData.state} {formData.pincode}
                      </p>
                      <p>India</p>
                      <p>+91{formData.phone}</p>
                    </div>
                  </div>
                ) : (
                  <form
                    className="edit-form address-form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="form-grid">
                      <div className="profile-form-group full-width">
                        <label htmlFor="address">Address</label>
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="profile-form-group">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="profile-form-group">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="profile-form-group">
                        <label htmlFor="pincode">Pincode</label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
          {activeTab === "orders" && (
            <div className="tab-content orders-tab">
              <h2>My Orders</h2>
              <p className="tab-description">Track and manage your orders</p>
              <div className="orders-section">
                {user?.orders && user.orders.length > 0 ? (
                  <div className="orders-list">
                    {user.orders.map((order, index) => (
                      <div key={order.orderId || index} className="order-card">
                        <div className="order-header">
                          <div className="order-info">
                            <h3>Order #{order.orderId || `MIVI${index + 1000}`}</h3>
                            <span className="order-date">
                              {new Date(order.orderDate).toLocaleDateString('en-IN', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div className="order-status">
                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="order-items">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="order-item">
                              <div className="order-item-image">
                                <img 
                                  src={item.product?.color[0]?.image} 
                                  alt={item.product?.name} 
                                />
                              </div>
                              <div className="order-item-details">
                                <h4>{item.product?.name}</h4>
                                <div className="order-item-meta">
                                  <span>Color: {item.product?.color[0]?.name}</span>
                                  <span>Qty: {item.quantity}</span>
                                </div>
                              </div>
                              <div className="order-item-price">
                                ₹{item.product?.price.toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="order-footer">
                          <div className="order-address">
                            <h4>Delivery Address</h4>
                            <p>{formData.fullName}</p>
                            <p>{order.shippingAddress?.address}</p>
                            <p>
                              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                            </p>
                            <p>India</p>
                          </div>
                          <div className="order-summary">
                            <div className="order-total">
                              <span>Total:</span>
                              <span className="total-amount">₹{order.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="payment-method">
                              <span>Payment:</span>
                              <span>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                                     order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-orders-message">
                    <i className="ri-shopping-bag-3-line"></i>
                    <h3>No orders to display</h3>
                    <p>When you place orders, they will appear here</p>
                    <button
                      className="shop-now-button"
                      onClick={() => navigate("/products")}
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === "wishlist" && (
            <div className="tab-content wishlist-tab">
              <h2>My Wishlist</h2>
              <p className="tab-description">
                Products you have saved for later
              </p>
              <div className="wishlist-section">
                <div className="empty-wishlist">
                  <i className="ri-heart-line"></i>
                  <h3>Your wishlist is empty</h3>
                  <p>
                    Save items you like to your wishlist and revisit them later
                  </p>
                  <button
                    className="shop-now-button"
                    onClick={() => navigate("/products")}
                  >
                    Browse Products
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="content-ladder"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
