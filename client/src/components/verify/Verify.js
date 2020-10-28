import React, { Component } from "react";
import Brand from "../Brand";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./RegisterContainer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearUser } from "../../redux/actions/userActions";

class Verify extends Component {
  static propTypes = {
    clearUser: PropTypes.func.isRequired,
  };

  state = {
    isNew: false,
  };

  componentDidMount() {
    this.props.clearUser();
  }

  toggle = (isNew) => {
    this.setState({ isNew });
  };

  render() {
    const { isNew } = this.state;
    const message = !isNew
      ? "Don't have an account yet?"
      : "Already have an account?";
    return (
      <div className="verify">
        <div className="verify-brand">
          <Brand />
        </div>
        {isNew ? <RegisterContainer /> : <LoginContainer />}
        <div className="verify-control">
          <button onClick={() => this.toggle(!isNew)}>{message}</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { clearUser };

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
