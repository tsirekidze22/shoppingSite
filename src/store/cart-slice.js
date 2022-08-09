import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  showBag: false,
  modifingAttributes: false,
  attributes: [],
  index: 0,
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
      state.changed = true;
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
          currency: newItem.currency,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else if (existingItem && modifingAttributes) {
        state.attributes = state.modifingAttributes;
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
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
    modifingAttributes(state, action) {
      state.modifingAttributes = action.payload;
      state.attributes = action.payload.attributes;
    },
    toggleBag(state) {
      state.showBag = !state.showBag;
    },
    resetCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

const { actions } = cartSlice;

export const { addItem, removeItem, toggleBag, resetCart, modifingAttributes } =
  actions;

export default cartSlice.reducer;
