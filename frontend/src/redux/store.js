import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '@redux/slices/homeSlice.js';
import productReducer from '@redux/slices/productSlice.js';
import categoryReducer from '@redux/slices/categorySlice.js';
import cartReducer from '@redux/slices/cartSlice.js';
import favoritesReducer from '@redux/slices/favoritesSlice.js';

// safely read favorites from localStorage
function loadFavorites() {
  try {
    if (typeof window === 'undefined') return []; // SSR guard
    const raw = localStorage.getItem('favorites'); 
    const parsed = JSON.parse(raw || '[]');
    if (!Array.isArray(parsed)) return [];
    
    // normalization and deduplication
    return Array.from(new Set(parsed.map((x) => String(x))));
  } catch {
    return [];
  }
}

// safely read cart from localStorage (added for cart)
function loadCart() {
  try {
    if (typeof window === 'undefined') return { items: [] }; // SSR guard
    const raw = localStorage.getItem('cart'); 
    const parsed = JSON.parse(raw || '{ "items": [] }');
    return parsed;
  } catch {
    return { items: [] };
  }
}

// middleware for saving favorites to localStorage
const saveFavoritesMw = (storeApi) => (next) => (action) => {
  const result = next(action); // pass the action to the reducer

  // react only to favorite slice actions
  if (action.type.startsWith('favorites/')) {
    try {
      const ids = storeApi.getState().favorites.items; // taking the NEW state
      localStorage.setItem('favorites', JSON.stringify(ids)); // save to localStorage
    } catch {
      // silently ignore
    }
  }
  return result;
};

// middleware for saving cart to localStorage (added, similar to favorites)
const saveCartMw = (storeApi) => (next) => (action) => {
  const result = next(action); // pass the action to the reducer

  // react only to cart slice actions
  if (action.type.startsWith('cart/')) {
    try {
      const cartState = storeApi.getState().cart; // taking the NEW state
      localStorage.setItem('cart', JSON.stringify(cartState)); // save to localStorage
    } catch {
      // silently ignore
    }
  }
  return result;
};

const store = configureStore({
  reducer: {
    home: homeReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    favorites: favoritesReducer
  },
  preloadedState: { // initial state
    favorites: {
      items: loadFavorites()
    },
    cart: loadCart() // Added preloaded for cart
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveFavoritesMw, saveCartMw), // Added saveCartMw
});

export default store;