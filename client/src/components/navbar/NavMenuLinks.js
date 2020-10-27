import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class NavMenuLinks extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };
  render() {
    const { logged_in } = this.props.user;
    return logged_in ? (
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
    ) : (
      <>
        <Link to="/verify">
          <span>Login</span>
          <i className="fas fa-sign-in-alt" />
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenuLinks);
