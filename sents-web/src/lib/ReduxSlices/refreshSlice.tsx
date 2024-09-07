import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRefreshing: false,
};

const refreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    startRefresh(state) {
      state.isRefreshing = true;
    },
    stopRefresh(state) {
      state.isRefreshing = false;
    },
  },
});

export const { startRefresh, stopRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;
