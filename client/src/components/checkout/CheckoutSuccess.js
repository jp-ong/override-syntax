import React from "react";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const CheckoutSuccess = ({ user_loading, message, error }) => {
  return (
    <div className="checkout-success">
      {user_loading ? (
        <Spinner />
      ) : (
        <>
          {message ? (
            <div className="checkout-success-body">
              <span>{message.order}</span>
              <span>{message.id}</span>
            </div>
          ) : (
            <></>
          )}
          {error ? (
            <div className="checkout-success-body">
              <span>{error.order}</span>
            </div>
          ) : (
            <></>
          )}
          <div className="checkout-success-control">
            <Link to="/">Go Home</Link>
            <Link to="/orders">View Orders</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutSuccess;
