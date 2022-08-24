import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Interweave } from "interweave";
import { addItem } from "../../store/cart-slice";
import ProductAttributes from "../Cart/ProductAttributes";
import handleAttributesClick from "../../Functions/handleAttributeClick";

import classes from "./ProductDescriptionPage.module.css";

class ProductDescriptionPage extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      product: [],
      productPrice: {},
      gallery: [],
      mainImage: "",
      attributes: [],
      currency: "",
      price: 0,
    };
  }

  componentDidMount() {
    let href = window.location.href.split("/");
    let id = href[href.length - 1];
    const product = this.props.products.filter((item) => item.id === id)[0];
    this.setState({
      id: id,
      product: this.props.product,
      mainImage: product.gallery[0],
    });
    const price = product?.prices?.filter(
      (price) => price?.currency?.symbol === this.props?.currentCurrency
    );
    const amount = price[0].amount;
    this.setState({ price: amount });
    this.setState({
      attributes: [],
      price: amount,
    });
  }

  componentDidUpdate(pervProps) {
    if (pervProps.currentCurrency !== this.props.currentCurrency) {
      const price = this.state.product?.prices?.filter(
        (el) => el.currency.symbol === this.props.currentCurrency
      );
      this.setState({ price: price[0].amount });
    }
  }

  changeImageHandler(imageUrl) {
    this.setState({ mainImage: imageUrl });
  }

  addToCart(item) {
    const selectedAttributesArr = [];
    const attributes =
      this.state.attributes.length > 0
        ? this.state.attributes
        : this.props.product.attributes;

    attributes.forEach((el) =>
      el.items.forEach((item) => {
        if (item.selected === true) {
          selectedAttributesArr.push(item.id);
        }
      })
    );

    const selectedAttributes = selectedAttributesArr.join("/");
    const productId = `${item.id}/${selectedAttributes}`;

    const product = {
      ...item,
      id: productId,
      attributes: attributes,
      price: this.state.price,
    };
    this.props.addItem(product);
  }

  handleAttributeClick = (attribute, attributes, id, index) => {
    const productId = this.state.id;
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
    return (
      <div className={classes["product-content"]}>
        {this.props.product?.gallery?.length > 1 && (
          <div className={classes.gallery}>
            {this.props.product.gallery.map((image, i) => (
              <div
                key={i}
                className={classes["single-image"]}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() => this.changeImageHandler(image)}
              ></div>
            ))}
          </div>
        )}
        <div
          className={classes["main-image"]}
          style={{
            backgroundImage: `url(${this.state.mainImage})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className={classes["product-description"]}>
          <h2 className={classes["product-brand"]}>
            {this.props.product?.brand}
          </h2>
          <h2 className={classes["product-name"]}>
            {this.props.product?.name}
          </h2>
          <ProductAttributes
            item={this.props.product}
            attributes={
              this.state.attributes.length > 0
                ? this.state.attributes
                : this.props.product.attributes
            }
            onAttributeClick={this.handleAttributeClick}
          />
          <div className={classes["product-price"]}>
            <p className={classes["product-price-title"]}>Price:</p>
            <div className={classes.amount}>
              {this.props.currentCurrency}
              {this.state.price}
            </div>
          </div>
          <div
            className={classes["product-btn"]}
            onClick={() => this.addToCart(this.props.product)}
          >
            Add to cart
          </div>
          <section className={classes["product-description-text"]}>
            <Interweave content={this.props.product?.description} />
          </section>
        </div>
      </div>
    );
  }
}

ProductDescriptionPage.propTypes = {
  addItem: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  product: PropTypes.object.isRequired,
  currentCurrency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.currencies.currentCurrency,
    products: state.products.products,
    product: state.products.singleProduct,
    currencies: state.currencies.currencies,
  };
};

const mapDispatchToProps = {
  addItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDescriptionPage);
