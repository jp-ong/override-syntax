import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error">
      <div className="error-status">404</div>
      <div className="error-text">
        <span>PAGE NOT FOUND</span>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
