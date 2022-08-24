import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Slider.module.css";
import arrowRight from "../../../assets/ArrowRight.svg";
import arrowLeft from "../../../assets/ArrowLeft.svg";

class Slider extends Component {
  constructor() {
    super();
    this.state = {
      gallery: [],
      currentImage: [],
      index: 0,
    };
  }

  componentDidMount() {
    let gallery = this.props.gallery;
    this.setState({ currentImage: gallery[this.state.index] });
    this.setState({ gallery: gallery });
  }

  nextImageHandler() {
    this.setState({ index: this.state.index + 1 });
    if (this.state.index + 1 >= this.state.gallery.length - 1) {
      this.setState({ index: 0 });
    }
    if (this.state.index == 4) {
      this.setState({ currentImage: this.state.gallery[0] });
      return;
    }
    this.setState({ currentImage: this.state.gallery[this.state.index + 1] });
  }

  previousImageHandler() {
    if (this.state.index !== 0) {
      this.setState({ index: this.state.index - 1 });
      this.setState({ currentImage: this.state.gallery[this.state.index - 1] });
      return;
    }
    if (this.state.index == 0) {
      this.setState({ index: this.state.gallery.length - 1 });

      this.setState({
        currentImage: this.state.gallery[this.state.gallery.length - 1],
      });
      return;
    }
  }

  render() {
    return (
      <div
        className={classes["slider-content"]}
        style={{
          backgroundImage: `url(${this.state.currentImage})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transition: "0.1s",
        }}
      >
        <div>
          {this.props.gallery.length > 1 && !this.props.isBag && (
            <div className={classes["arrows"]}>
              <div
                className={classes["left-arrow"]}
                onClick={() => this.previousImageHandler()}
              >
                <img src={arrowLeft} alt="" />
              </div>
              <div
                className={classes["right-arrow"]}
                onClick={() => this.nextImageHandler()}
              >
                <img src={arrowRight} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  gallery: PropTypes.array.isRequired,
  isBag: PropTypes.bool,
};

export default Slider;
