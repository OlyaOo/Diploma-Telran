import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '@redux/slices/homeSlice.js';
import productReducer from '@redux/slices/productSlice.js';
import categoryReducer from '@redux/slices/categorySlice.js';
import cartReducer from '@redux/slices/cartSlice.js';
import favoritesReducer from '@redux/slices/favoritesSlice.js';

const store = configureStore({
  reducer: {
    home: homeReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    favorites: favoritesReducer
  }
});

export default store;
