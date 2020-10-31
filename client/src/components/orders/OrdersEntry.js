import React, { Component } from "react";
import Spinner from "../Spinner";

import { Link } from "react-router-dom";
import axios from "axios";

class OrdersEntry extends Component {
  state = {
    order: {},
    message: "",
    is_loading: true,
  };
  componentDidMount() {
    const token = sessionStorage.getItem("token");
    axios
      .get(`/api/orders?id=${this.props.id}`, {
        headers: { "x-auth-token": token },
      })
      .then((response) =>
        this.setState({ order: response.data.order, is_loading: false })
      )
      .catch(({ response }) => this.setState({ message: response.data.msg }));
  }
  render() {
    const { order, message, is_loading } = this.state;
    const {
      _id,
      item,
      shipping_address,
      fee,
      order_status,
      payment_status,
      payment_method,
      created_at,
    } = order;
    const formatPrice = (n) => {
      return n
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
      <div className="orders-list-entry">
        {is_loading ? (
          <div className="orders-list-entry-spinner">
            <Spinner />
          </div>
        ) : (
          <React.Fragment>
            <div className="orders-list-entry-row">
              <div className="orders-list-entry-row-col">
                <span>Order ID</span>
                <strong>{_id}</strong>
              </div>
              <div className="orders-list-entry-row-col">
                <span>Order Status</span>
                <strong>{order_status}</strong>
              </div>
              <div className="orders-list-entry-row-col">
                <span>Ordered At</span>
                <strong>{new Date(created_at).toLocaleString()}</strong>
              </div>
            </div>

            <div className="orders-list-entry-row">
              <div className="orders-list-entry-row-col">
                <span>Payment Method</span>
                <strong>{payment_method}</strong>
              </div>
              <div className="orders-list-entry-row-col">
                <span>Payment Status</span>
                <strong>{payment_status}</strong>
              </div>
            </div>
            <div className="orders-list-entry-row">
              <div className="orders-list-entry-row-col">
                <span>Item</span>
                <strong>
                  <Link to={`/item/${item.id}`} target="_blank">
                    {item.name}
                  </Link>
                </strong>
              </div>
              <div className="orders-list-entry-row-col">
                <span>Quantity</span>
                <strong>{item.quantity}</strong>
              </div>
              <div className="orders-list-entry-row-col">
                <span>Subtotal</span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
                <span>php</span>
              </div>
            </div>
            <div className="orders-list-entry-row">
              <div className="orders-list-entry-row-col">
                <span>Shipping To</span>
                <strong>{shipping_address.house_number},</strong>
                <strong>{shipping_address.street_name},</strong>
                <strong>{shipping_address.district},</strong>
                <strong>{shipping_address.city},</strong>
                <strong>{shipping_address.province},</strong>
                <strong>{shipping_address.barangay}</strong>
              </div>
              <div className="orders-list-entry-row-col">
                <span>Fee</span>
                <strong>{formatPrice(fee)}</strong>
                <span>php</span>
              </div>
              <div className="orders-list-entry-row-col">
                <span>Total</span>
                <strong>{formatPrice(item.quantity * item.price + fee)}</strong>
                <span>php</span>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default OrdersEntry;
