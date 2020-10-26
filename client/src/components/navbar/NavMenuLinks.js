import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavMenuLinks extends Component {
  render() {
    return (
      <>
        <Link to="/account">
          <span>Account Settings</span>
          <i className="fas fa-user-cog" />
        </Link>
        <Link to="/orders">
          <span>My Orders</span>
          <i className="fas fa-history" />
        </Link>
        <Link to="/verify">
          <span>Logout</span>
          <i className="fas fa-sign-out-alt" />
        </Link>
      </>
    );
  }
}

export default NavMenuLinks;
