import React, { Component } from "react";
import Container from "../Container";
import Spinner from "../Spinner";
import CheckoutInfo from "./CheckoutInfo";
import CheckoutConfirm from "./CheckoutConfirm";
import CheckoutSuccess from "./CheckoutSuccess";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { authUser, placeOrder } from "../../redux/actions/userActions";

export class Checkout extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    authUser: PropTypes.func.isRequired,
    placeOrder: PropTypes.func.isRequired,
  };

  state = {
    item: {},
    quantity: 0,
    new_address: {
      house_number: "",
      street_name: "",
      district: "",
      city: "",
      province: "",
      barangay: "",
    },
    payment_method: "Cash on Delivery",
    page: 1,
  };

  componentDidMount() {
    this.props.authUser();
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    if (!cart || !cart.item || !cart.quantity) {
      window.location.replace("/");
    } else {
      this.setState({
        item: cart.item,
        quantity: cart.quantity,
      });
      sessionStorage.removeItem("cart");
    }
  }

  tickAddress = ({ target }) => {
    this.setState({
      new_address: { ...this.state.new_address, [target.name]: target.value },
    });
  };

  changePage = (n) => {
    if (this.state.page === 1 && n === -1) {
      return window.location.replace("/");
    } else {
      this.setState({ page: this.state.page + n });
    }
  };

  orderItem = (address) => {
    const { item, quantity, payment_method } = this.state;
    const order = {
      address,
      item,
      quantity,
      payment_method,
    };
    this.props.placeOrder(order);
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { item, new_address, quantity, page, payment_method } = this.state;
    const { user, user_loading, message, error } = this.props.user;
    const { full_address } = user;
    return (
      <Container>
        <div className="checkout">
          {user_loading ? (
            <div className="checkout-spinner">
              <Spinner />
            </div>
          ) : (
            <React.Fragment>
              {page === 1 ? (
                <CheckoutInfo
                  new_address={new_address}
                  user_address={full_address || {}}
                  tickAddress={this.tickAddress}
                  changePage={this.changePage}
                />
              ) : (
                <React.Fragment />
              )}
              {page === 2 ? (
                <CheckoutConfirm
                  item={item}
                  quantity={quantity}
                  full_address={full_address}
                  new_address={new_address}
                  payment_method={payment_method}
                  changePage={this.changePage}
                  orderItem={this.orderItem}
                />
              ) : (
                <React.Fragment />
              )}
              {page === 3 ? (
                <CheckoutSuccess
                  user_loading={user_loading}
                  message={message}
                  error={error}
                />
              ) : (
                <React.Fragment />
              )}
            </React.Fragment>
          )}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = { authUser, placeOrder };

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
