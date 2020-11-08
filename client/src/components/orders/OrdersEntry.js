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
                  <strong
                    className={
                      order_status === "Delivered" ? "completed" : "pending"
                    }
                  >
                    {order_status}
                  </strong>
                </div>
              </div>
              <div className="orders-list-entry-row-col">
                <div>
                  <span>Ordered At</span>
                </div>
                <div>
                  <strong>{new Date(created_at).toLocaleString()}</strong>
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
                  <strong
                    className={
                      order_status === "Paid" ? "completed" : "pending"
                    }
                  >
                    {payment_status}
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
