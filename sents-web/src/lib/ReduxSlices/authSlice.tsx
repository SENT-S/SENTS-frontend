import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAdministrator: boolean;
}

const initialState: AuthState = {
  token: null,
  isAdministrator: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setAdministrator: (state, action: PayloadAction<boolean>) => {
      state.isAdministrator = action.payload;
    },
  },
});

export const { setToken, setAdministrator } = authSlice.actions;

export default authSlice.reducer;
