import React, { Component } from "react";
import Container from "../Container";
import Spinner from "../Spinner";

import axios from "axios";
import { Link } from "react-router-dom";

class Item extends Component {
  state = {
    item: {},
    quantity: 1,
    image: 0,
    is_loading: true,
  };

  componentDidMount() {
    this.setState({ is_loading: true });
    axios
      .get(`/api/items/item?id=${this.props.match.params.id}`)
      .then((response) =>
        this.setState({ item: response.data.item, is_loading: false })
      )
      .catch(({ response }) => window.location.replace("/"));
  }

  scrollImage = (n) => {
    const { item, image } = this.state;
    if (image !== 0 || n !== -1) {
      if (image === item.images.length - 1 && n === 1) {
        this.setState({ image: 0 });
      } else {
        this.setState({ image: image + n });
      }
    } else {
      this.setState({ image: item.images.length - 1 });
    }
  };

  tickQuantity = (n) => {
    const { quantity } = this.state;
    if (quantity !== 1 || n !== -1) {
      if (quantity === 5 && n === 1) {
        this.setState({ quantity: 1 });
      } else {
        this.setState({ quantity: quantity + n });
      }
    } else {
      this.setState({ quantity: 6 - 1 });
    }
  };

  render() {
    const { item, quantity, image, is_loading } = this.state;
    const {
      item_name,
      item_description,
      item_price,
      images,
      category,
      tags,
    } = item;
    const formatPrice = (n) => {
      return n
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
      <Container>
        <div className="item">
          {is_loading ? (
            <div className="item-spinner">
              <Spinner />
            </div>
          ) : (
            <>
              <div
                className="item-image"
                style={{ backgroundImage: `url(${images[image]})` }}
              >
                <div className="item-image-control">
                  <button onClick={() => this.scrollImage(-1)}>&lang;</button>
                  <button onClick={() => this.scrollImage(1)}>&rang;</button>
                </div>
              </div>
              <div className="item-info">
                <div className="item-info-row">
                  <h3>{item_name}</h3>
                </div>
                <div className="item-info-row">
                  Category
                  <Link to={`/store/${category}`}>{category}</Link>
                </div>
                <div className="item-info-row">
                  Tags
                  {tags.map((tag) => (
                    <span>{tag}</span>
                  ))}
                </div>
                <div className="item-info-row">{item_description}</div>
                <div className="item-info-row">
                  <span>{formatPrice(item_price * quantity)}</span>php
                </div>
                <div className="item-info-row">
                  <div className="item-info-row-quantity">
                    <button onClick={() => this.tickQuantity(-1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => this.tickQuantity(1)}>+</button>
                  </div>
                  <div className="item-info-row-buy">
                    <button>BUY NOW</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    );
  }
}

export default Item;
