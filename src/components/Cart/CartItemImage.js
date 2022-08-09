import { Component } from "react";
import { connect } from "react-redux";
import { addItem, removeItem } from "../../store/cart-slice";

import minus from "../../assets/MinusSquare.svg";
import plus from "../../assets/PlusSquare.svg";
import Slider from "../UI/Slider/Slider";
import classes from "./CartItemImage.module.css";

class CartItemImage extends Component {
  handleItemIncrease(item) {
    this.props.addItem(item);
  }

  handleItemDecrease(item) {
    this.props.removeItem(item.id);
  }

  render() {
    const bagStyles = {
      gap: 13.44,
    };
    return (
      <div
        className={classes["cart-item-img"]}
        style={this.props.isBag && bagStyles}
      >
        <div className={classes.actions}>
          <div
            className={classes["plus-action"]}
            onClick={() => this.handleItemIncrease(this.props.item)}
          >
            <img src={plus} alt="Plus" />
          </div>
          <span className={classes.quantity}>{this.props.item.quantity}</span>
          <div
            className={classes["minus-action"]}
            onClick={() => this.handleItemDecrease(this.props.item)}
          >
            <img src={minus} alt="Minus" />
          </div>
        </div>
        <div className={classes.slider}>
          <Slider gallery={this.props.item.gallery} isBag={this.props.isBag} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    totalQuantity: state.cart.totalQuantity,
    totalPrice: state.cart.totalPrice,
  };
};

const mapDispatchToProps = {
  addItem,
  removeItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItemImage);
