import React from "react";
import { Link } from "react-router-dom";

const CheckoutConfirm = ({
  item,
  quantity,
  new_address,
  full_address,
  payment_method,
  changePage,
  orderItem,
}) => {
  const address = {
    house_number: new_address.house_number || full_address.house_number,
    street_name: new_address.street_name || full_address.street_name,
    district: new_address.district || full_address.district,
    city: new_address.city || full_address.city,
    province: new_address.province || full_address.province,
    barangay: new_address.barangay || full_address.barangay,
  };
  const {
    house_number,
    street_name,
    district,
    city,
    province,
    barangay,
  } = address;
  const { _id, item_name, thumbnail, item_price } = item;
  const formatPrice = (n) => {
    return n
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <React.Fragment>
      <div className="checkout-confirm">
        <div className="checkout-confirm-header">REVIEW YOUR ORDER</div>
        <div className="checkout-confirm-section">
          <div className="checkout-confirm-section-label">Shipping to</div>
          <div className="checkout-confirm-section-content">
            <strong>{house_number},</strong>
            <strong>{street_name},</strong>
            <strong>{district},</strong>
            <strong>{city},</strong>
            <strong>{province},</strong>
            <strong>{barangay}</strong>
          </div>
        </div>
        <div className="checkout-confirm-section">
          <div className="checkout-confirm-section-label">Payment Method</div>
          <div className="checkout-confirm-section-content">
            <strong>{payment_method}</strong>
          </div>
        </div>
        <div className="checkout-confirm-section">
          <div className="checkout-confirm-section-label">Your Item</div>
          <div className="checkout-confirm-section-item">
            <div>{quantity}x</div>
            <div style={{ backgroundImage: `url(${thumbnail})` }}></div>
            <div>
              <strong>
                <Link to={`/item/${_id}`} target="_blank">
                  {item_name}
                </Link>
              </strong>
            </div>
            <div>
              <strong>{formatPrice(item_price)}</strong>php
            </div>
          </div>
        </div>
        <div className="checkout-confirm-section">
          <div className="checkout-confirm-section-price">
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(item_price * quantity)}</strong>
              <span>php</span>
            </div>
            <div>
              <span>Fee</span>
              <strong>{formatPrice(40)}</strong>
              <span>php</span>
            </div>
            <div>
              <span>Total</span>
              <strong>{formatPrice(item_price * quantity + 40)}</strong>
              <span>php</span>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout-control">
        <button onClick={() => changePage(-1)}>Go Back</button>
        <button onClick={() => orderItem(address)}>Place Order</button>
      </div>
    </React.Fragment>
  );
};

export default CheckoutConfirm;
