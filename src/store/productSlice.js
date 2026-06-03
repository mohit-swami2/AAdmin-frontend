import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setProductsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action) => {
      state.list = action.payload.data;
      state.total = action.payload.total;
      state.isLoading = false;
      state.error = null;
    },
    setProductsError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setProductsLoading, setProducts, setProductsError } = productSlice.actions;
export default productSlice.reducer;
