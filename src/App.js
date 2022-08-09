import { Component } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import ProductsList from "./components/Products/ProductsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDescriptionPage from "./components/Products/ProductDescriptionPage";

import classes from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div className={classes.app}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<ProductsList />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDescriptionPage />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
