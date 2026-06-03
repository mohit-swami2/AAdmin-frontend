import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUsersLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUsers: (state, action) => {
      state.list = action.payload.data;
      state.total = action.payload.total;
      state.isLoading = false;
      state.error = null;
    },
    setUsersError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUsersLoading, setUsers, setUsersError } = userSlice.actions;
export default userSlice.reducer;
