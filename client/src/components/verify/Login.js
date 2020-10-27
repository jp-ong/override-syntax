import React, { Component } from "react";
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

  tick = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  buttonClicked = () => {
    this.props.loginUser(this.state);
  };

  render() {
    const { email, password } = this.state;
    const { error } = this.props.user;
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
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.tick}
          />
        </div>
        <div className="verify-form-button">
          <button onClick={this.buttonClicked}>LOGIN</button>
        </div>
        {error ? (
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
