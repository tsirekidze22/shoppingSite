import { Component } from "react";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProductAttributes from "./ProductAttributes";

import classes from "./CartItemText.module.css";

class CartItemText extends Component {
  constructor() {
    super();
    this.state = {
      attributes: [],
      price: 0,
    };
  }

  componentDidMount() {
    const price = this.props.item?.prices.filter(
      (el) => el.currency.symbol === this.props.currentCurrency
    );

    this.setState({ price: price[0].amount });
  }

  handleAttributeClick = () => {
    return;
  };

  render() {
    const bagStyles = {
      fontWeight: 300,
      fontSize: 26.88,
    };

    return (
      <div className={classes["cart-item-text"]}>
        <h2
          className={classes["cart-item-brand"]}
          style={this.props.isBag && bagStyles}
        >
          {this.props.item.brand}
        </h2>
        <h2
          className={classes["cart-item-name"]}
          style={this.props.isBag && bagStyles}
        >
          {this.props.item.name}
        </h2>
        <p className={classes["cart-item-price"]}>
          {this.props?.currentCurrency}
          {this.state.price > 0 ? this.state.price : this.props.item.price}
        </p>
        <ProductAttributes
          item={this.props.item}
          onAttributeClick={this.handleAttributeClick}
          attributes={
            this.state.attributes.length > 0
              ? this.state.attributes
              : this.props.item.attributes
          }
        />
      </div>
    );
  }
}

CartItemText.propTypes = {
  item: PropTypes.object.isRequired,
  currentCurrency: PropTypes.string.isRequired,
  isBag: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    attributes: state.cart.attributes,
    currentCurrency: state.currencies.currentCurrency,
  };
};

export default connect(mapStateToProps)(CartItemText);
