import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { toast } from "react-toastify";
import { asyncRegisterUser, asyncupdateuser } from "../store/actions/userActions";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  // Form state
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

  useEffect(() => {
    if (user) {
      setFormData({
        _id: user._id,
        fullName: user.fullName || "John Doe",
        email: user.email || "bordaalpaben@gmail.com",
        phone: user.phone || "7818007554",
        dob: user.dob || "",
        address: user.address || "123 Main Street, Apartment 4B",
        city: user.city || "Mumbai",
        state: user.state || "Maharashtra",
        pincode: user.pincode || "400001",
      });
    }
  }, [user]);

  // UI state
  const [activeTab, setActiveTab] = useState("details");
  const [isMobile, setIsMobile] = useState(false);
  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  // Sample order for UI demo
  const sampleOrder = {
    id: "MIVI3574",
    status: "Delivered",
    date: "2023-07-15",
    total: 4999.0,
    itemsTotal: 4999.0,
    shipping: 0,
    discount: 0,
    items: [
      {
        name: "DuoPods A25",
        price: 2499.0,
        quantity: 1,
        image: "/assets/ai-buds-1.webp",
      },
      {
        name: "DuoPods A350",
        price: 2500.0,
        quantity: 1,
        image: "/assets/ai-buds-2.webp",
      },
    ],
    deliveryAddress: {
      name: "John Doe",
      street: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+917818007554",
    },
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const enablePersonalInfoEdit = () => setEditPersonalInfo(true);
  const enableAddressEdit = () => setEditAddress(true);

  const savePersonalInfo = () => {
    const updatedUser = { ...user, ...formData };
    dispatch(asyncupdateuser(user._id , updatedUser));  
    setEditPersonalInfo(false);
    toast.success("Personal information updated successfully");
  };

  const saveAddress = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditAddress(false);
    toast.success("Address updated successfully");
  };

  const cancelEdit = (section) => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || {};
    if (section === "personal") {
      setEditPersonalInfo(false);
      setFormData((prev) => ({
        ...prev,
        fullName: savedUser?.fullName || "John Doe",
        email: savedUser?.email || "bordaalpaben@gmail.com",
        phone: savedUser?.phone || "7818007554",
        dob: savedUser?.dob || "",
      }));
    } else if (section === "address") {
      setEditAddress(false);
      setFormData((prev) => ({
        ...prev,
        address: savedUser?.address || "123 Main Street, Apartment 4B",
        city: savedUser?.city || "Mumbai",
        state: savedUser?.state || "Maharashtra",
        pincode: savedUser?.pincode || "400001",
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
              className={`menu-item ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              <i className="ri-user-line"></i>
              <span>My Details</span>
              <i className="ri-arrow-right-s-line arrow-icon"></i>
            </button>
            <button
              className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <i className="ri-shopping-bag-line"></i>
              <span>My Orders</span>
              <i className="ri-arrow-right-s-line arrow-icon"></i>
            </button>
            <button
              className={`menu-item ${
                activeTab === "wishlist" ? "active" : ""
              }`}
              onClick={() => setActiveTab("wishlist")}
            >
              <i className="ri-heart-line"></i>
              <span>Wishlist</span>
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
                        className="cancel-button"
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
                    <div className="info-item">
                      <label>Date of Birth</label>
                      <div className="info-value">
                        {formData.dob || "Not provided"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form
                    className="edit-form personal-form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="form-grid">
                      <div className="form-group">
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
                      <div className="form-group">
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
                      <div className="form-group">
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
                      <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                        />
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
                        className="cancel-button"
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
                      <div className="form-group full-width">
                        <label htmlFor="address">Address</label>
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
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
                      <div className="form-group">
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
                      <div className="form-group">
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
                <OrderItem order={sampleOrder} />
                <div className="no-orders-message">
                  <i className="ri-shopping-bag-3-line"></i>
                  <h3>No more orders to display</h3>
                  <p>When you place orders, they will appear here</p>
                  <button
                    className="shop-now-button"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </button>
                </div>
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
