import { Component } from "react";
import { connect } from "react-redux";
import Title from "../UI/Title/Title";
import CartFooter from "./CartFooter";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

class Cart extends Component {
  render() {
    return (
      <div className={classes.cart}>
        <Title
          marginBottom="55px"
          fontWeight="700"
          fontSize="32px"
          title="CART"
        />

        <div className={classes["cart-content"]}>
          {this.props.cartItems.length > 0 ? (
            <>
              {this.props.cartItems?.map((product, i) => (
                <CartItem key={i} index={i} item={product} />
              ))}
              <CartFooter />
            </>
          ) : (
            <p className={classes["empty-cart"]}>
              The are no items in the cart...
            </p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps)(Cart);
