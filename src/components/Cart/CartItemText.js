import { Component } from "react";
import { connect } from "react-redux";
import ProductAttributes from "./ProductAttributes";
import { modifingAttributes } from "../../store/cart-slice";
import handleAttributesClick from "../../Functions/handleAttributeClick";

import classes from "./CartItemText.module.css";

class CartItemText extends Component {
  constructor() {
    super();
    this.state = {
      attributes: [],
    };
  }

  handleAttributeClick = (attribute, attributes, id, index) => {
    this.props.modifingAttributes(true);
    const productId = this.props.item.id;

    const modifiedAttributes = handleAttributesClick(
      attribute,
      attributes,
      id,
      index,
      productId
    );

    this.setState({ attributes: modifiedAttributes });
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
          {this.props.item.price}
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

const mapStateToProps = (state) => {
  return {
    attributes: state.cart.attributes,
    currentCurrency: state.currencies.currentCurrency,
  };
};

const mapDispatchToProps = {
  modifingAttributes,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItemText);
