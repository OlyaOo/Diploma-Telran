// frontend/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '@redux/slices/homeSlice.js';
import productReducer from '@redux/slices/productSlice.js';
import categoryReducer from '@redux/slices/categorySlice.js';
import cartReducer from '@redux/slices/cartSlice.js';
import favoritesReducer from '@redux/slices/favoritesSlice.js';
import productOfDay from '@redux/slices/productOfDaySlice.js'; // ВАЖНО: вернули редьюсер из main

// safely read favorites from localStorage
function loadFavorites() {
  try {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem('favorites');
    const parsed = JSON.parse(raw || '[]');
    if (!Array.isArray(parsed)) return [];
    return Array.from(new Set(parsed.map(x => String(x))));
  } catch {
    return [];
  }
}

// safely read cart from localStorage
function loadCart() {
  try {
    if (typeof window === 'undefined') return { items: [] };
    const raw = localStorage.getItem('cart');
    const parsed = JSON.parse(raw || '{ "items": [] }');
    return parsed && typeof parsed === 'object' ? parsed : { items: [] };
  } catch {
    return { items: [] };
  }
}

// mw: persist favorites
const saveFavoritesMw = storeApi => next => action => {
  const result = next(action);
  if (action.type.startsWith('favorites/')) {
    try {
      const ids = storeApi.getState().favorites.items;
      localStorage.setItem('favorites', JSON.stringify(ids));
    } catch {}
  }
  return result;
};

// mw: persist cart
const saveCartMw = storeApi => next => action => {
  const result = next(action);
  if (action.type.startsWith('cart/')) {
    try {
      const cartState = storeApi.getState().cart;
      localStorage.setItem('cart', JSON.stringify(cartState));
    } catch {}
  }
  return result;
};

const store = configureStore({
  reducer: {
    home: homeReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    productOfDay, // ВАЖНО: должен существовать ключ в сторе
  },
  preloadedState: {
    favorites: { items: loadFavorites() },
    cart: loadCart(),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(saveFavoritesMw, saveCartMw),
});

export default store;
