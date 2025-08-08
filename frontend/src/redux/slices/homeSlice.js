import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: { productOfDay: null },
  reducers: {
    setProductOfDay: (state, action) => {
      state.productOfDay = action.payload;
    }
  }
});

export const { setProductOfDay } = homeSlice.actions;
export default homeSlice.reducer;
