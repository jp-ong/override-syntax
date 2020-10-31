import React from "react";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const CheckoutSuccess = ({ user_loading, message, error }) => {
  return (
    <div className="checkout-success">
      {user_loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {message ? (
            <div className="checkout-success-body">
              <span>{message.order}</span>
              <span>{message.id}</span>
            </div>
          ) : (
            <React.Fragment />
          )}
          {error ? (
            <div className="checkout-success-body">
              <span>{error.order}</span>
            </div>
          ) : (
            <React.Fragment />
          )}
          <div className="checkout-success-control">
            <Link to="/">Go Home</Link>
            <Link to="/orders">View Orders</Link>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CheckoutSuccess;
