import React, { Component } from "react";
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

  tick = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  buttonClicked = () => {
    this.props.registerUser(this.state);
  };

  render() {
    const { firstname, lastname, email, password, password2 } = this.state;
    const { error } = this.props.user;
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
          />
          <input
            type="text"
            name="lastname"
            value={lastname}
            placeholder="Last Name"
            onChange={this.tick}
          />
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
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm Password"
            onChange={this.tick}
          />
        </div>
        <div className="verify-form-button">
          <button onClick={this.buttonClicked}>REGISTER</button>
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

const mapDispatchToProps = { registerUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
