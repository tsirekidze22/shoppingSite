import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";

class Title extends Component {
  render() {
    return (
      <h1
        style={{
          marginBottom: this.props.marginBottom,
          fontWeight: this.props.fontWeight,
          fontSize: this.props.fontSize,
          color: "#1D1F22",
          textTransform: "uppercase",
        }}
      >
        {this.props.title}
      </h1>
    );
  }
}

Title.propTypes = {
  marginBottom: PropTypes.string.isRequired,
  fontWeight: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Title;
