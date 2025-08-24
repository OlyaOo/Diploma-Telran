import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@api/axios.js';

export const fetchProducts = createAsyncThunk('products/fetch', async ({ categoryId, minPrice, maxPrice, discounted, sort }) => {

  const endpoint = categoryId ? `/categories/${categoryId}` : '/products/all';
  const { data } = await api.get(endpoint, {
    params: { minPrice, maxPrice, discounted: discounted ? 'true' : undefined, sort } 
  });

  return categoryId ? data.data : data;
});

export const fetchProductById = createAsyncThunk('products/fetchById', async id => {

  const { data } = await api.get(`/products/${id}`);
  
  return Array.isArray(data) ? data[0] : data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], current: null, status: 'idle', error: null }, 
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => { 
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => { 
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default productSlice.reducer;