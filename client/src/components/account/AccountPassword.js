import React, { Component } from "react";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editPassword, authUser } from "../../redux/actions/userActions";

export class AccountPassword extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    editPassword: PropTypes.func.isRequired,
    authUser: PropTypes.func.isRequired,
  };

  state = {
    old_password: "",
    new_password: "",
    dup_password: "",
  };

  componentDidMount() {
    this.props.authUser();
  }

  tick = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  keyDown = (e) => {
    if (e.key === "Enter") {
      this.props.editPassword(this.state);
    }
  };

  buttonClicked = () => {
    this.props.editPassword(this.state);
  };

  render() {
    const { message, error } = this.props.user;
    return (
      <div className="account-section">
        <div className="account-section-header">
          <span>UPDATE PASSWORD</span>
        </div>
        <div className="account-section-form">
          <div className="account-section-form-group">
            <div className="account-section-form-group-label">
              <span>Password</span>
            </div>
            <div className="account-section-form-group-inputs">
              <input
                type="password"
                name="old_password"
                placeholder="Current Password"
                value={this.state.old_password}
                onChange={this.tick}
                onKeyDown={this.keyDown}
              />
              <input
                type="password"
                name="new_password"
                placeholder="New Password"
                value={this.state.new_password}
                onChange={this.tick}
                onKeyDown={this.keyDown}
              />
              <input
                type="password"
                name="dup_password"
                placeholder="Confirm Password"
                value={this.state.dup_password}
                onChange={this.tick}
                onKeyDown={this.keyDown}
              />
            </div>
          </div>
        </div>
        <div className="account-section-footer">
          <div className="account-section-footer-feedback">
            {message.password ? (
              <span className="success-feedback">{message.password}</span>
            ) : (
              <></>
            )}
            {error.password ? (
              <span className="error-feedback">{error.password}</span>
            ) : (
              <></>
            )}
          </div>
          <div className="account-section-footer-control">
            {message.password ? (
              <Spinner />
            ) : (
              <button onClick={this.buttonClicked}>UPDATE PROFILE</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { editPassword, authUser };

export default connect(mapStateToProps, mapDispatchToProps)(AccountPassword);
