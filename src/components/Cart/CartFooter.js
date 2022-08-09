import { Component } from "react";
import { connect } from "react-redux";
import { resetCart } from "../../store/cart-slice";

import gif from "../../assets/LoadingGif.gif";
import classes from "./CartFooter.module.css";

class CartFooter extends Component {
  constructor() {
    super();
    this.state = {
      showLoading: false,
    };
  }

  handlerOrder() {
    this.setState({ showLoading: true });
    this.props.resetCart();
  }

  render() {
    const tax = this.props.totalPrice * 0.21;
    return (
      <>
        {this.state.showLoading ? (
          <div className={classes["ordering-gif"]}>
            <h2>Ordering may take time....</h2>
            <img src={gif} alt="" />
          </div>
        ) : (
          <div className={classes["cart-footer"]}>
            <p className={classes.tax}>
              Tax 21%:{" "}
              <span>
                {" "}
                {this.props.currentCurrency}
                {tax.toFixed(2)}
              </span>
            </p>
            <p className={classes.quantity}>
              Quantity: <span>{this.props.totalQuantity}</span>
            </p>
            <p className={classes.total}>
              Total:{" "}
              <span className={classes["total-price"]}>
                {this.props.currentCurrency}
                {this.props.totalPrice.toFixed(2)}
              </span>
            </p>
            <div
              className={classes["order-btn"]}
              onClick={() => this.handlerOrder()}
            >
              ORDER
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.currencies.currentCurrency,
    totalQuantity: state.cart.totalQuantity,
    totalPrice: state.cart.totalPrice,
  };
};

const mapDispatchToProps = {
  resetCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartFooter);
