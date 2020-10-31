import React, { Component } from "react";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, clearFeedbacks } from "../../redux/actions/userActions";

export class Login extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    clearFeedbacks: PropTypes.func.isRequired,
  };

  state = {
    email: "",
    password: "",
  };

  componentDidMount() {
    this.props.clearFeedbacks();
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
      this.submitForm();
    }
  };

  submitForm = (e) => {
    if (e) e.preventDefault();
    this.props.loginUser(this.state);
  };

  render() {
    const { email, password } = this.state;
    const { error, user_loading } = this.props.user;
    return (
      <form onSubmit={this.submitForm}>
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
            type="submit"
            className={user_loading ? "disabled" : ""}
            disabled={user_loading}
          >
            LOGIN
          </button>
        </div>
        {user_loading ? (
          <div className="verify-form-spinner">
            <Spinner />
          </div>
        ) : error.login ? (
          <div className="verify-form-feedback">
            <span className="error-feedback">{error.login}</span>
          </div>
        ) : (
          <React.Fragment />
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { loginUser, clearFeedbacks };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
