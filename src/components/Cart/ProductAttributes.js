import { Component } from "react";
import AttributeList from "./AttributeList";

import classes from "./ProductAttributes.module.css";

class ProductAttributes extends Component {
  constructor() {
    super();
    this.state = {
      attributes: [],
      selectedColor: "",
      selectedAttribute: {},
    };
  }

  componentDidMount() {
    this.setState({ attributes: this.props.attributes });
  }

  render() {
    const attributeStyles = {
      fontWeight: 400,
      fontSize: 23.5,
      fontFamily: "Raleway",
    };

    return this.props?.attributes?.map((el, index) => (
      <div key={el.id} className={classes["cart-item-sizes"]}>
        <p
          className={classes["attribute-label"]}
          style={this.props.isBag && attributeStyles}
        >
          {el.name}:
        </p>
        {el.name === "Color" ? (
          <ul className={classes["attributes-list"]} key={el.name}>
            {el.items?.map((item, i) => (
              <li
                key={item.id}
                className={
                  classes[`${item.selected ? "selected-color" : "item-color"}`]
                }
                onClick={() =>
                  this.props.onAttributeClick(
                    el,
                    this.props.attributes,
                    item.id,
                    index
                  )
                }
              >
                <div
                  className={classes.color}
                  style={{ backgroundColor: item.value }}
                ></div>
              </li>
            ))}
          </ul>
        ) : (
          <AttributeList
            key={el.name}
            items={el.items}
            element={el}
            index={index}
            attributes={this.props.attributes}
            onAttributeClick={this.props.onAttributeClick}
          />
        )}
      </div>
    ));
  }
}

export default ProductAttributes;
