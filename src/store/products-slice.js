import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: "all",
  products: [],
  singleProduct: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
    },
    getCategory(state, action) {
      state.activeCategory = action.payload;
    },
    getProduct(state, action) {
      state.singleProduct = action.payload;
    },
  },
});

const { actions } = productsSlice;

export const { getProducts, getCategory, getProduct } = actions;

export default productsSlice.reducer;
