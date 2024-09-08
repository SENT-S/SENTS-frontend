import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
  innerStep: 1,
};

const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    resetStep: (state) => {
      state.step = 1;
    },
    setInnerStep: (state, action) => {
      state.innerStep = action.payload;
    },
    resetInnerStep: (state) => {
      state.innerStep = 1;
    },
  },
});

export const { setStep, resetStep, setInnerStep, resetInnerStep } = stepSlice.actions;

export default stepSlice.reducer;
