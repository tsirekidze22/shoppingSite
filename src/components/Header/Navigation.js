import { Component } from "react";
import { connect } from "react-redux";
import { getProducts, getCategory } from "../../store/products-slice";
import { fetchCategories, fetchProducts } from "../../graphql/queries";

import classes from "./Navigation.module.css";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: [],
    };
  }

  componentDidMount() {
    fetchCategories().then((data) => this.setState({ categories: data }));
    fetchProducts(this.props.activeCategory).then((data) => {
      this.props.getProducts(data);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeCategory !== this.props.activeCategory) {
      fetchProducts(this.props.activeCategory).then((data) =>
        this.props.getProducts(data)
      );
    }
  }

  categorySelectHandler(selected) {
    this.props.getCategory(selected);
  }

  render() {
    return (
      <nav className={classes.nav}>
        <ul className={classes["nav-list"]}>
          {this.state.categories?.map((item, index) => (
            <li
              key={index}
              className={
                classes[
                  `${
                    this.props.activeCategory === item.name
                      ? "selected-category"
                      : "nav-list-item"
                  }`
                ]
              }
              onClick={() => this.categorySelectHandler(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    activeCategory: state.products.activeCategory,
  };
};

const mapDispatchToProps = { getProducts, getCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
