import { Component } from "react";
import { connect } from "react-redux";
import { Interweave } from "interweave";
import { addItem } from "../../store/cart-slice";
import { modifingAttributes } from "../../store/cart-slice";
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
    };
  }

  componentDidMount() {
    let href = window.location.href.split("/");
    let id = href[href.length - 1];
    this.setState({ id: id });
    let product = this.props.products.find((item) => item.id === id);
    const price = product?.prices?.filter(
      (price) => price.currency.symbol === this.props.currentCurrency
    );

    const amount = price[0].amount;
    const currency = price[0].currency.symbol;
    const gallery = product?.gallery;

    const def = product.attributes?.map((el) => [
      ...el.items,
      { ...el.items[0], selected: true },
    ]);

    const transformed = def?.map((el) => {
      el[0] = el[el.length - 1];
      el.pop();
      return [...el];
    });

    const transformedAttr = product.attributes?.map((el, i) => {
      return { ...el, items: transformed[i] };
    });

    this.setState({
      product: {
        ...product,
        price: amount,
        currency: currency,
        attributes: transformedAttr,
      },
      productPrice: price[0],
      gallery: gallery,
      mainImage: gallery[0],
      attributes: transformedAttr,
    });
  }

  changeImageHandler(imageUrl) {
    this.setState({ mainImage: imageUrl });
  }

  addToCart(item) {
    const product = {
      ...item,
      attributes: this.state.attributes,
    };
    this.props.addItem(product);
  }

  handleAttributeClick = (attribute, attributes, id, index) => {
    this.props.modifingAttributes(true, index);
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
        {this.state.product?.gallery?.length > 1 && (
          <div className={classes.gallery}>
            {this.state.gallery.map((image, i) => (
              <div
                key={i}
                className={classes["single-image"]}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  border: `${
                    image === this.state.mainImage
                      ? "1px solid #1d1f22"
                      : "1px solid transparent"
                  }`,
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
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className={classes["product-description"]}>
          <h2 className={classes["product-brand"]}>
            {this.state.product?.brand}
          </h2>
          <h2 className={classes["product-name"]}>
            {this.state.product?.name}
          </h2>
          <ProductAttributes
            item={this.state.product}
            attributes={this.state.attributes}
            onAttributeClick={this.handleAttributeClick}
          />
          <div className={classes["product-price"]}>
            <p className={classes["product-price-title"]}>Price:</p>
            <div className={classes.amount}>
              {this.state.productPrice.currency?.symbol}
              {this.state.productPrice.amount}
            </div>
          </div>
          <div
            className={classes["product-btn"]}
            onClick={() => this.addToCart(this.state.product)}
          >
            Add to cart
          </div>
          <section className={classes["product-description-text"]}>
            <Interweave content={this.state.product?.description} />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.currencies.currentCurrency,
    products: state.products.products,
    // attributes: state.cart.attributes,
  };
};

const mapDispatchToProps = {
  addItem,
  modifingAttributes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDescriptionPage);
