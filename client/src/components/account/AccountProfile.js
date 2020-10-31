import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfile, authUser } from "../../redux/actions/userActions";
import Spinner from "../Spinner";

export class AccountProfile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    editProfile: PropTypes.func.isRequired,
    authUser: PropTypes.func.isRequired,
  };

  state = {
    firstname: "",
    lastname: "",
    house_number: "",
    street_name: "",
    district: "",
    city: "",
    province: "",
    barangay: "",
    birthdate: "",
    mobile_number: "",
  };

  componentDidMount() {
    this.props.authUser();
  }

  tick = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  buttonClicked = () => {
    this.props.editProfile(this.state);
  };

  render() {
    const { user, message, error, user_loading } = this.props.user;
    const { fullname, full_address, mobile_number, birthdate } = user || {};
    const { firstname, lastname } = fullname || {};
    const { house_number, street_name, province, city, district, barangay } =
      full_address || {};
    if (!this.props.user.user_loading && !this.props.user.logged_in) {
      return window.location.replace("/");
    }
    return (
      <div className="account-section">
        <div className="account-section-header">
          <span>EDIT PROFILE</span>
        </div>
        <div className="account-section-form">
          <div className="account-section-form-group">
            <div className="account-section-form-group-label">
              <span>Full Name</span>
            </div>
            <div className="account-section-form-group-inputs">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={this.state.firstname || firstname}
                onChange={this.tick}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={this.state.lastname || lastname}
                onChange={this.tick}
              />
            </div>
          </div>
          <div className="account-section-form-group">
            <div className="account-section-form-group-label">
              <span>Birthdate</span>
            </div>
            <div className="account-section-form-group-inputs">
              <input
                type="text"
                name="birthdate"
                placeholder="MM/DD/YYY"
                value={
                  this.state.birthdate ||
                  new Date(birthdate).toLocaleDateString()
                }
                onChange={this.tick}
              />
            </div>
          </div>
          <div className="account-section-form-group">
            <div className="account-section-form-group-label">
              <span>Mobile Number</span>
            </div>
            <div className="account-section-form-group-inputs">
              <input
                type="text"
                name="mobile_number"
                placeholder="Mobile Number"
                value={this.state.mobile_number || mobile_number}
                onChange={this.tick}
              />
            </div>
          </div>
          <div className="account-section-form-group">
            <div className="account-section-form-group-label">
              <span>Full Address</span>
            </div>
            <div className="account-section-form-group-inputs">
              <input
                type="text"
                name="house_number"
                placeholder="House Number"
                value={this.state.house_number || house_number}
                onChange={this.tick}
              />
              <input
                type="text"
                name="street_name"
                placeholder="Street Name"
                value={this.state.street_name || street_name}
                onChange={this.tick}
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                value={this.state.district || district}
                onChange={this.tick}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={this.state.city || city}
                onChange={this.tick}
              />
              <input
                type="text"
                name="province"
                placeholder="Province"
                value={this.state.province || province}
                onChange={this.tick}
              />
              <input
                type="text"
                name="barangay"
                placeholder="Barangay"
                value={this.state.barangay || barangay}
                onChange={this.tick}
              />
            </div>
          </div>
        </div>
        <div className="account-section-footer">
          <div className="account-section-footer-feedback">
            {message.profile ? (
              <span className="success-feedback">{message.profile}</span>
            ) : (
              <React.Fragment />
            )}
            {error.profile ? (
              <span className="error-feedback">{error.profile}</span>
            ) : (
              <React.Fragment />
            )}
          </div>
          <div className="account-section-footer-control">
            {message.profile ? (
              <Spinner />
            ) : (
              <button
                disabled={user_loading}
                onClick={this.buttonClicked}
                className={user_loading ? "disabled" : ""}
              >
                UPDATE PROFILE
              </button>
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

const mapDispatchToProps = { editProfile, authUser };

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);
