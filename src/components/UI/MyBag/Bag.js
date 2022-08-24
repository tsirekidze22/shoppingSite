import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../Cart/CartItem";
import { toggleBag } from "../../../store/cart-slice";

import classes from "./Bag.module.css";

class Bag extends Component {
  render() {
    return (
      <>
        <div
          className={classes.overlay}
          onClick={() => this.props.toggleBag(false)}
        />
        <div className={classes.bag}>
          <div className={classes["bag-header"]}>
            <p className={classes["bag-title"]}>
              My Bag,{" "}
              <span className={classes.quantity}>
                {this.props.totalQuantity}{" "}
                {this.props.totalQuantity == 1 ? "item" : "items"}
              </span>
            </p>
          </div>
          <div className={classes["bag-content"]}>
            {this.props.cartItems.length > 0 ? (
              <>
                <div className={classes["bag-items"]}>
                  {this.props.cartItems?.map((product) => (
                    <CartItem key={product.id} item={product} isBag={true} />
                  ))}
                </div>
                <div className={classes.total}>
                  <p>Total</p>
                  <p className={classes["total-number"]}>
                    {this.props.currentCurrency}
                    {this.props.totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className={classes["bag-actions"]}>
                  <div
                    className={classes["view-bag"]}
                    onClick={() => this.props.toggleBag(false)}
                  >
                    <Link to="/cart" className={classes.link}>
                      View Bag
                    </Link>
                  </div>
                  <div className={classes["check-out"]}>Check Out</div>
                </div>
              </>
            ) : (
              <p className={classes["empty-bag"]}>
                The are no items in the bag...
              </p>
            )}
          </div>
        </div>
      </>
    );
  }
}

Bag.propTypes = {
  toggleBag: PropTypes.func.isRequired,
  currentCurrency: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  totalQuantity: PropTypes.number.isRequired,
  cartItems: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.currencies.currentCurrency,
    cartItems: state.cart.cartItems,
    totalQuantity: state.cart.totalQuantity,
    totalPrice: state.cart.totalPrice,
    showBag: state.cart.showBag,
  };
};

const mapDispatchToProps = {
  toggleBag,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bag);
