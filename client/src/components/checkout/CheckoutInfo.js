import React from "react";

const CheckoutInfo = ({
  user_address,
  new_address,
  tickAddress,
  changePage,
}) => {
  return (
    <>
      <div className="checkout-info">
        <div className="checkout-info-header">
          <h2>ENTER DETAILS</h2>
        </div>
        <div className="checkout-info-section">
          <div className="checkout-info-section-label">Shipping Address</div>
          <div className="checkout-info-section-inputs">
            <input
              type="text"
              name="house_number"
              value={new_address.house_number || user_address.house_number}
              onChange={tickAddress}
              placeholder="House Number"
            />
            <input
              type="text"
              name="street_name"
              value={new_address.street_name || user_address.street_name}
              onChange={tickAddress}
              placeholder="Street Name"
            />
            <input
              type="text"
              name="district"
              value={new_address.district || user_address.district}
              onChange={tickAddress}
              placeholder="District"
            />
            <input
              type="text"
              name="city"
              value={new_address.city || user_address.city}
              onChange={tickAddress}
              placeholder="City"
            />
            <input
              type="text"
              name="province"
              value={new_address.province || user_address.province}
              onChange={tickAddress}
              placeholder="Province"
            />
            <input
              type="text"
              name="barangay"
              value={new_address.barangay || user_address.barangay}
              onChange={tickAddress}
              placeholder="Barangay"
            />
          </div>
        </div>
        <div className="checkout-info-section">
          <div className="checkout-info-section-label">Payment Method</div>
          <div className="checkout-info-section-inputs">
            <button className="active">Cash on Delivery</button>
            <button disabled className="disabled">
              Credit/Debit Card
            </button>
            <button disabled className="disabled">
              GCash
            </button>
            <button disabled className="disabled">
              Smart Padala
            </button>
          </div>
        </div>
      </div>
      <div className="checkout-control">
        <button onClick={() => changePage(-1)}>Cancel</button>
        <button onClick={() => changePage(1)}>Proceed to Checkout</button>
      </div>
    </>
  );
};

export default CheckoutInfo;
