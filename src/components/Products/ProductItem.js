import { Component } from "react";
import { connect } from "react-redux";
import { addItem, removeItem } from "../../store/cart-slice";

import CartIcon from "../../assets/CartIconCircle.svg";
import classes from "./ProductItem.module.css";

class ProductItem extends Component {
  constructor() {
    super();
    this.state = {
      showCartIcon: false,
    };
  }

  addToCart(e, item, prices) {
    e.preventDefault();
    const amount = prices.amount;
    const currency = prices.currency.symbol;
    const def = item.attributes?.map((el) => [
      ...el.items,
      { ...el.items[0], selected: true },
    ]);

    const transformed = def?.map((el) => {
      el[0] = el[el.length - 1];
      el.pop();
      return [...el];
    });

    const transformedAttr = item.attributes?.map((el, i) => {
      return { ...el, items: transformed[i] };
    });

    this.props.addItem({
      ...item,
      price: amount,
      currency: currency,
      attributes: transformedAttr,
    });
  }

  render() {
    return (
      <div
        className={classes["item-wrapper"]}
        style={{ cursor: !this.props.inStock && "not-allowed" }}
      >
        {!this.props.inStock && (
          <div className={classes["outof-stock"]}>
            <p>Out of stock</p>
          </div>
        )}
        <div
          className={classes["product-item"]}
          onMouseEnter={() => this.setState({ showCartIcon: true })}
          onMouseLeave={() => this.setState({ showCartIcon: false })}
        >
          <div
            className={classes["product-item-img"]}
            style={{
              backgroundImage: `url(${this.props.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className={classes["product-item-text"]}>
            <h4 className={classes["product-item-name"]}>{this.props.name}</h4>
            <h3 className={classes["product-item-price"]}>
              <span>{this.props?.prices[0]?.currency.symbol}</span>
              {this.props?.prices[0]?.amount}
            </h3>
            {this.state.showCartIcon && (
              <>
                <div
                  className={classes["cart-icon"]}
                  onClick={(e) =>
                    this.addToCart(e, this.props.item, this.props.prices[0])
                  }
                >
                  <img src={CartIcon} alt="Cart Icon" />
                  <span className={classes.tooltiptext}>Add to cart</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  addItem,
  removeItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
