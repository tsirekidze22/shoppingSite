import ReactDom from "react-dom";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../Cart/CartItem";
import { toggleBag } from "../../../store/cart-slice";

import classes from "./Bag.module.css";

class Bag extends Component {
  bagDropdownHandler() {
    this.props.toggleBag();
  }
  render() {
    const portalElement = document.getElementById("overlays");
    return (
      <>
        {ReactDom.createPortal(
          <div className={classes.overlay}>
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
                        <CartItem
                          key={product.id}
                          item={product}
                          isBag={true}
                        />
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
                        onClick={this.bagDropdownHandler.bind(this)}
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
          </div>,
          portalElement
        )}
      </>
    );
  }
}

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
