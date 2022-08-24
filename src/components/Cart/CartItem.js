import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import CartItemImage from "./CartItemImage";
import CartItemText from "./CartItemText";

import classes from "./CartItem.module.css";

class CartItem extends Component {
  render() {
    const bagStyles = {
      borderBottom: "none",
    };
    return (
      <div
        className={classes["cart-item"]}
        style={this.props.isBag && bagStyles}
      >
        <CartItemText
          index={this.props.index}
          item={this.props.item}
          isBag={this.props.isBag}
        />
        <CartItemImage item={this.props.item} isBag={this.props.isBag} />
      </div>
    );
  }
}

CartItem.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object.isRequired,
  isBag: PropTypes.bool,
};

export default CartItem;
