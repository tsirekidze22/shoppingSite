import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products-slice";
import cartReducer from "./cart-slice";
import currenciesReducer from "./currencies-slice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  currencies: currenciesReducer,
});

const persistConfig = {
  key: "products",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
