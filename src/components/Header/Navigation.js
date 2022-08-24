import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts, getCategory } from "../../store/products-slice";
import {
  fetchCategories,
  fetchProducts,
  fetchCategory,
} from "../../graphql/queries";
import { Link } from "react-router-dom";

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

  componentDidUpdate(prevProps) {
    if (prevProps.activeCategory !== this.props.activeCategory) {
      fetchProducts(this.props.activeCategory).then((data) =>
        this.props.getProducts(data)
      );
    }
  }

  categorySelectHandler(selected) {
    fetchCategory(selected).then((data) => {
      this.props.getCategory(data.name);
    });
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
              <Link key={item.id} to={`/`} className={classes["nav-item-link"]}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  getProducts: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    activeCategory: state.products.activeCategory,
  };
};

const mapDispatchToProps = { getProducts, getCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
