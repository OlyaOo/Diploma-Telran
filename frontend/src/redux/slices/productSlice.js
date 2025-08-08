import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@api/axios.js';

export const fetchProducts = createAsyncThunk('products/fetch', async categoryId => {
  const endpoint = categoryId ? `/categories/${categoryId}` : '/products/all';
  const { data } = await api.get(endpoint);
  return categoryId ? data.data : data;
});

export const fetchProductById = createAsyncThunk('products/fetchById', async id => {
  const { data } = await api.get(`/products/${id}`);
  return Array.isArray(data) ? data[0] : data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], current: null, status: 'idle' },
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
      .addCase(fetchProductById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      });
  }
});

export default productSlice.reducer;
