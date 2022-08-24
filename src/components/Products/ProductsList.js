import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Title from "../UI/Title/Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { getProducts, getProduct } from "../../store/products-slice";
import { fetchSingleProduct } from "../../graphql/queries";

import gif from "../../assets/LoadingGif.gif";
import classes from "./ProductsList.module.css";

class ProductsList extends Component {
  fetchProductHandler(id, item) {
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

    const mainImage = item.gallery[0];

    fetchSingleProduct(id).then((data) =>
      this.props.getProduct({
        ...data,
        attributes: transformedAttr,
        mainImage: mainImage,
      })
    );
  }

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
            this.props.products?.map((item) =>
              item.inStock ? (
                <Link
                  key={item.id}
                  to={`/products/${item.id}`}
                  className={classes["product-link"]}
                >
                  <div onClick={() => this.fetchProductHandler(item.id, item)}>
                    <ProductItem
                      key={item.id}
                      item={item}
                      image={item.gallery[0]}
                      name={item.name}
                      prices={item.prices.filter(
                        (item) =>
                          item.currency.symbol == this.props.currentCurrency
                      )}
                      inStock={item.inStock}
                    />
                  </div>
                </Link>
              ) : (
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
              )
            )
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

ProductsList.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  currentCurrency: PropTypes.string.isRequired,
  activeCategory: PropTypes.string.isRequired,
  showBag: PropTypes.bool.isRequired,
};

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
  getProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
