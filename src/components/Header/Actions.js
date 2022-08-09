import { Component } from "react";
import CartIcon from "./CartIcon";
import Currencies from "./Currencies";

import classes from "./Actions.module.css";

class Actions extends Component {
  render() {
    return (
      <div className={classes.actions}>
        <Currencies />
        <CartIcon />
      </div>
    );
  }
}

export default Actions;
