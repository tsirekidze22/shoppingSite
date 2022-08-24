import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  showBag: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      state.totalPrice += Number(action.payload.price);

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          brand: newItem.brand,
          category: newItem.category,
          gallery: newItem.gallery,
          inStock: newItem.inStock,
          attributes: newItem.attributes,
          price: newItem.price,
          prices: newItem.prices,
          currency: newItem.currency,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      state.totalPrice -= existingItem.price;
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== existingItem.id
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    toggleBag(state, action) {
      state.showBag = action.payload;

      if (action.payload) {
        document.body.style.overflowY = "hidden";
      } else if (state.showBag === false) {
        document.body.style.overflowY = "visible";
      }
    },
    resetCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

const { actions } = cartSlice;

export const { addItem, removeItem, toggleBag, resetCart } = actions;

export default cartSlice.reducer;
