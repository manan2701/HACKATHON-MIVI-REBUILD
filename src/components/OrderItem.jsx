import React, { useState } from 'react';
import './OrderItem.css';

const OrderItem = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  // Get status color based on delivery status
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'shipped':
        return 'status-shipped';
      case 'processing':
        return 'status-processing';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };
  
  return (
    <div className={`order-item ${isExpanded ? 'expanded' : ''}`}>
      <div className="order-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="order-basic-info">
          <div className="order-id">
            <h3>Order #{order.id}</h3>
            <span className={`order-status ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <p className="order-date">Placed on {formatDate(order.date)}</p>
        </div>
        <div className="order-summary">
          <p className="order-total">₹{order.total.toFixed(2)}</p>
          <button className="view-details-btn">
            {isExpanded ? (
              <>
                <span>Hide Details</span>
                <i className="ri-arrow-up-s-line"></i>
              </>
            ) : (
              <>
                <span>View Details</span>
                <i className="ri-arrow-down-s-line"></i>
              </>
            )}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="order-details">
          <div className="order-items-list">
            <h4>Products</h4>
            {order.items.map((item, index) => (
              <div key={index} className="order-product">
                <div className="product-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="product-info">
                  <h5>{item.name}</h5>
                  <p className="product-price">₹{item.price.toFixed(2)}</p>
                  <p className="product-quantity">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-delivery-address">
            <h4>Delivery Address</h4>
            <p>{order.deliveryAddress.name}</p>
            <p>{order.deliveryAddress.street}</p>
            <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.pincode}</p>
            <p>{order.deliveryAddress.phone}</p>
          </div>
          
          <div className="order-payment-summary">
            <h4>Payment Summary</h4>
            <div className="payment-row">
              <span>Items Total:</span>
              <span>₹{order.itemsTotal.toFixed(2)}</span>
            </div>
            <div className="payment-row">
              <span>Shipping:</span>
              <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping.toFixed(2)}`}</span>
            </div>
            {order.discount > 0 && (
              <div className="payment-row discount">
                <span>Discount:</span>
                <span>-₹{order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="payment-row total">
              <span>Total:</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="order-actions">
            <button className="track-order-btn">
              <i className="ri-map-pin-time-line"></i>
              Track Order
            </button>
            <button className="need-help-btn">
              <i className="ri-customer-service-2-line"></i>
              Need Help?
            </button>
            {order.status === 'Delivered' && (
              <button className="review-btn">
                <i className="ri-star-line"></i>
                Review Products
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem; 