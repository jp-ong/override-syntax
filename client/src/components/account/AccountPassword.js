import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfile, authUser } from "../../redux/actions/userActions";

export class AccountPassword extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    editProfile: PropTypes.func.isRequired,
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

  render() {
    const { user } = this.props.user;
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
              />
              <input
                type="password"
                name="new_password"
                placeholder="New Password"
                value={this.state.new_password}
                onChange={this.tick}
              />
              <input
                type="password"
                name="dup_password"
                placeholder="Confirm Password"
                value={this.state.dup_password}
                onChange={this.tick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { editProfile, authUser };

export default connect(mapStateToProps, mapDispatchToProps)(AccountPassword);
