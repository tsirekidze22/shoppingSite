import { Component } from "react";
import { connect } from "react-redux";
import Title from "../UI/Title/Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { getProducts } from "../../store/products-slice";

import gif from "../../assets/LoadingGif.gif";
import classes from "./ProductsList.module.css";

class ProductsList extends Component {
  render() {
    return (
      <>
        <Title
          title={this.props.activeCategory}
          marginBottom="103px"
          fontWeight="400"
          fontSize="42px"
        />
        <div
          className={classes["products-list"]}
          style={{ display: `${this.props.showBag && "hidden"}` }}
        >
          {this.props.products.length > 0 ? (
            this.props.products?.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className={classes["product-link"]}
              >
                <ProductItem
                  key={item.id}
                  item={item}
                  image={item.gallery[0]}
                  name={item.name}
                  prices={item.prices.filter(
                    (item) => item.currency.symbol == this.props.currentCurrency
                  )}
                  inStock={item.inStock}
                />
              </Link>
            ))
          ) : (
            <div className={classes["gif-wrapper"]}>
              <img src={gif} className={classes["loading-gif"]} />
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.currencies.currentCurrency,
    products: state.products.products,
    activeCategory: state.products.activeCategory,
    showBag: state.cart.showBag,
  };
};

const mapDispatchToProps = {
  getProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
