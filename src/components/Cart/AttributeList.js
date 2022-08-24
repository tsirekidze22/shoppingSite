import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItem } from "../../store/cart-slice";

import classes from "./AttributeList.module.css";

class AttributeList extends Component {
  constructor() {
    super();
    this.state = {
      selectedAttribute: "",
    };
  }

  attributeSelectorHandler(items, id) {
    this.setState({ selectedAttribute: id });
    const attributeItems = items.map((el) => {
      return { ...el, selected: false };
    });

    attributeItems.forEach((element) => {
      if (element.id === id) {
        element.selected = true;
      }
    });
  }

  render() {
    return (
      <ul className={classes["attributes-list"]}>
        {this.props.items?.map((item, i) => (
          <li
            key={i}
            className={
              classes[
                `${item.selected === true ? "selected-text" : "item-attribute"}`
              ]
            }
            onClick={() =>
              this.props?.onAttributeClick(
                this.props.element,
                this.props.attributes,
                item.id,
                this.props.index,
                item
              )
            }
          >
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    );
  }
}

AttributeList.propTypes = {
  addItem: PropTypes.func.isRequired,
  onAttributeClick: PropTypes.func.isRequired,
  attributes: PropTypes.array.isRequired,
  element: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    totalQuantity: state.cart.totalQuantity,
    totalPrice: state.cart.totalPrice,
  };
};

const mapDispatchToProps = {
  addItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeList);
