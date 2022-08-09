import { Component } from "react";
import { connect } from "react-redux";
import { toggleBag } from "../../store/cart-slice";
import Bag from "../UI/MyBag/Bag";

import cartIcon from "../../assets/CartIcon.svg";
import classes from "./CartIcon.module.css";

class CartIcon extends Component {
  toggleCartIcon() {
    this.props.toggleBag();
  }

  render() {
    return (
      <div>
        <div
          className={classes["cart-icon"]}
          onClick={this.toggleCartIcon.bind(this)}
        >
          <img src={cartIcon} alt="Cart Icon" />
          <span className={classes.badge}>{this.props.totalQuantity}</span>
        </div>
        {this.props.showBag && <Bag />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showBag: state.cart.showBag,
    totalQuantity: state.cart.totalQuantity,
  };
};

const mapDispatchToProps = {
  toggleBag,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
