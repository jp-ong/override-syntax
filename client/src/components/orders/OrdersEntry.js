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
      paid_on,
      delivered_on,
      created_at,
    } = order;
    const formatPrice = (n) => {
      return n
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const colorClass = (status) => {
      switch (status) {
        case "Paid":
        case "Delivered":
          return "completed";
        case "Cancelled":
          return "cancelled";
        default:
          return "pending";
      }
    };
    return (
      <div className="orders-list-entry">
        {is_loading ? (
          <div className="orders-list-entry-spinner">
            <Spinner />
          </div>
        ) : message ? (
          <React.Fragment>
            <div className="orders-list-entry-row">{message}</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="orders-list-entry-row">
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Order ID</span>
                </div>
                <div>
                  <strong>{_id}</strong>
                </div>
              </div>
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Order Status</span>
                </div>
                <div>
                  <strong className={colorClass(order_status)}>
                    {order_status}
                  </strong>
                </div>
              </div>
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Delivered On</span>
                </div>
                <div>
                  <strong className={colorClass(order_status)}>
                    {delivered_on === null
                      ? "- - -"
                      : new Date(delivered_on).toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            <div className="orders-list-entry-row">
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Payment Method</span>
                </div>
                <div>
                  <strong>{payment_method}</strong>
                </div>
              </div>
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Payment Status</span>
                </div>
                <div>
                  <strong className={colorClass(payment_status)}>
                    {payment_status}
                  </strong>
                </div>
              </div>
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Paid On</span>
                </div>
                <div>
                  <strong className={colorClass(payment_status)}>
                    {paid_on === null
                      ? "- - - "
                      : new Date(paid_on).toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>
            <div className="orders-list-entry-row">
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Item</span>
                </div>
                <strong>
                  <Link to={`/item/${item.id}`} target="_blank">
                    {item.name}
                  </Link>
                </strong>
              </div>
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Quantity</span>
                </div>
                <div>
                  <strong>{item.quantity}</strong>
                </div>
              </div>
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Subtotal</span>
                </div>{" "}
                <div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>

                  <span>php</span>
                </div>
              </div>
            </div>
            <div className="orders-list-entry-row">
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Shipping To</span>
                </div>
                <div>
                  <strong>{shipping_address.house_number},</strong>
                  <strong>{shipping_address.street_name},</strong>
                  <strong>{shipping_address.district},</strong>
                  <strong>{shipping_address.city},</strong>
                  <strong>{shipping_address.province},</strong>
                  <strong>{shipping_address.barangay}</strong>
                </div>
              </div>
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Fee</span>
                </div>
                <div>
                  <strong>{formatPrice(fee)}</strong>
                  <span>php</span>
                </div>
              </div>
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Total</span>
                </div>
                <div>
                  <strong>
                    {formatPrice(item.quantity * item.price + fee)}
                  </strong>
                  <span>php</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default OrdersEntry;
