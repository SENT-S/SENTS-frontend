import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DarkModeState {
  value: boolean;
}

const initialState: DarkModeState = {
  value: false,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.value = !state.value;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
