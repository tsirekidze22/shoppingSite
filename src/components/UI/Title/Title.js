import { Component } from "react";

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

export default Title;
