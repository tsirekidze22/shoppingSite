import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencies: [],
  currentCurrency: "$",
  showDropdown: false,
};

const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    getCurrencies(state, action) {
      state.currencies = action.payload;
    },
    getCurrentCurrency(state, action) {
      state.currentCurrency = action.payload;
    },
    toggleDropdown(state) {
      state.showDropdown = !state.showDropdown;
    },
  },
});

const { actions } = currenciesSlice;

export const { getCurrencies, getCurrentCurrency, toggleDropdown } = actions;

export default currenciesSlice.reducer;
