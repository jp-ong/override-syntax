import React, { Component } from "react";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, clearErrors } from "../../redux/actions/userActions";

export class Login extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  state = {
    email: "",
    password: "",
  };

  componentDidMount() {
    this.props.clearErrors();
  }

  componentDidUpdate() {
    document.querySelector(
      "button#login"
    ).disabled = this.props.user.user_loading;
  }

  tick = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  keyDown = (e) => {
    if (e.key === "Enter") {
      this.props.loginUser(this.state);
    }
  };

  buttonClicked = () => {
    this.props.loginUser(this.state);
  };

  render() {
    const { email, password } = this.state;
    const { error, user_loading } = this.props.user;
    return (
      <>
        <div className="verify-form-header">
          <span>SIGN IN</span>
        </div>
        <div className="verify-form-fields">
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
        </div>
        <div className="verify-form-button">
          <button
            id="login"
            onClick={this.buttonClicked}
            className={user_loading ? "disabled" : ""}
          >
            LOGIN
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

const mapDispatchToProps = { loginUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
