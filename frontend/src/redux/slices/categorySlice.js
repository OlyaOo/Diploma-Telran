import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@api/axios.js';

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const { data } = await api.get('/categories/all');
  return data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: { items: [] },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export default categorySlice.reducer;
