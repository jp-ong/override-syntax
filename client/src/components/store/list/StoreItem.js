import React from "react";
import { Link } from "react-router-dom";

const StoreItem = ({ item }) => {
  const { _id, item_name, item_price, thumbnail } = item;
  const formatPrice = (n) => {
    return n
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Link to={`/item/${_id}`} className="store-list-item">
      <div
        className="store-list-item-image"
        style={{ backgroundImage: `url(${thumbnail})` }}
      ></div>
      <div className="store-list-item-name">
        <span>{item_name}</span>
      </div>
      <div className="store-list-item-price">
        <span>{formatPrice(item_price || 0)}</span>php
      </div>
    </Link>
  );
};

export default StoreItem;
