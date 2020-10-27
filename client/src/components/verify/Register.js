import React, { Component } from "react";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, clearErrors } from "../../redux/actions/userActions";

export class Register extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  };

  componentDidMount() {
    this.props.clearErrors();
  }

  componentDidUpdate() {
    document.querySelector(
      "button#register"
    ).disabled = this.props.user.user_loading;
  }

  tick = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  keyDown = (e) => {
    if (e.key === "Enter") {
      this.props.registerUser(this.state);
    }
  };

  buttonClicked = () => {
    this.props.registerUser(this.state);
  };

  render() {
    const { firstname, lastname, email, password, password2 } = this.state;
    const { error, user_loading } = this.props.user;
    return (
      <>
        <div className="verify-form-header">
          <span>SIGN UP</span>
        </div>
        <div className="verify-form-fields">
          <input
            type="text"
            name="firstname"
            value={firstname}
            placeholder="First Name"
            onChange={this.tick}
            onKeyDown={this.keyDown}
          />
          <input
            type="text"
            name="lastname"
            value={lastname}
            placeholder="Last Name"
            onChange={this.tick}
            onKeyDown={this.keyDown}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email@address.com"
            onChange={this.tick}
            onKeyDown={this.keyDown}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.tick}
            onKeyDown={this.keyDown}
          />
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm Password"
            onChange={this.tick}
            onKeyDown={this.keyDown}
          />
        </div>
        <div className="verify-form-button">
          <button
            id="register"
            onClick={this.buttonClicked}
            className={user_loading ? "disabled" : ""}
          >
            REGISTER
          </button>
        </div>
        {user_loading ? (
          <div className="verify-form-spinner">
            <Spinner />
          </div>
        ) : error ? (
          <div className="verify-form-feedback">
            <span className="error-feedback">{error}</span>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { registerUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
