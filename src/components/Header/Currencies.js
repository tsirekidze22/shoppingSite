import { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrencies } from "../../graphql/queries";
import {
  getCurrencies,
  getCurrentCurrency,
  toggleDropdown,
} from "../../store/currencies-slice";

import ArrowDown from "../../assets/ArrowDown.svg";
import ArrowUp from "../../assets/ArrowUp.svg";
import classes from "./Currencies.module.css";

class Currencies extends Component {
  constructor() {
    super();
    this.state = {
      showCurrenciesDropdown: false,
    };
  }

  componentDidMount() {
    fetchCurrencies().then((currenciesData) =>
      this.props.getCurrencies(currenciesData)
    );
  }

  currenciesDropdownHandler() {
    this.props.toggleDropdown();
  }

  selectCurrencyHandler(selected) {
    this.props.getCurrentCurrency(selected);
    this.props.toggleDropdown();
  }

  render() {
    return (
      <>
        <div
          className={classes["currencies"]}
          onClick={this.currenciesDropdownHandler.bind(this)}
        >
          <span className={classes["currency-symbol"]}>
            {this.props.currentCurrency}
          </span>
          <span className={classes["currency-arrow"]}>
            {this.props.showDropdown ? (
              <img src={ArrowUp} alt="Arrow Up" />
            ) : (
              <img src={ArrowDown} alt="Arrow Down" />
            )}
          </span>
        </div>
        {this.props.showDropdown && (
          <div className={classes["currencies-dropdown"]}>
            <ul className={classes["currencies-dropdown-list"]}>
              {this.props.currencies?.map((item, index) => (
                <li
                  key={index}
                  className={classes["currencies-dropdown-option"]}
                  onClick={() => this.selectCurrencyHandler(item.symbol)}
                >
                  <span className={classes["dropdown-currency-symbol"]}>
                    {item.symbol}
                  </span>
                  <span className={classes["dropdown-currency-label"]}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies.currencies,
    currentCurrency: state.currencies.currentCurrency,
    showDropdown: state.currencies.showDropdown,
  };
};

const mapDispatchToProps = {
  getCurrencies,
  getCurrentCurrency,
  toggleDropdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
