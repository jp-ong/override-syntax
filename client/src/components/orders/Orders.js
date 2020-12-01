import React, { Component } from "react";
import Container from "../Container";
import Breadcrumbs from "../Breadcrumbs";

import OrdersEntry from "./OrdersEntry";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { authUser } from "../../redux/actions/userActions";

export class Orders extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    authUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.authUser();
  }

  render() {
    const { user, user_loading, logged_in } = this.props.user;
    const { orders_list } = user;
    if (!user_loading && !logged_in) return window.location.replace("/verify");
    return (
      <Container>
        <Breadcrumbs
          show={true}
          crumbs={[
            { link: `/`, text: `Home` },
            { link: `/orders`, text: `orders` },
          ]}
        />
        <div className="orders">
          <div className="orders-header">MY ORDERS</div>
          <div className="orders-list">
            {user_loading ? (
              <React.Fragment />
            ) : orders_list.length === 0 ? (
              <div className="orders-list-entry">
                <span>You have no orders at the moment.</span>
              </div>
            ) : (
              orders_list
                .reverse()
                .map((order, index) => <OrdersEntry key={index} id={order} />)
            )}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  authUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
