import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: "all",
  products: [],
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
  },
});

const { actions } = productsSlice;

export const { getProducts, getCategory } = actions;

export default productsSlice.reducer;
