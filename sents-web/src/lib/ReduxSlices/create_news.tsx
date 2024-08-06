import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormDataState {
  country: string;
  company: string;
  category: string;
  news_url: string;
  news_source: string;
  news_title: string;
  news_summary: string;
  image: File | null;
}

const initialState: FormDataState = {
  country: '',
  company: '',
  category: '',
  news_url: '',
  news_source: '',
  news_title: '',
  news_summary: '',
  image: null,
};

const newsFormSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    updateNewsField: (
      state,
      action: PayloadAction<{ field: keyof FormDataState; value: string }>,
    ) => {
      const { field, value } = action.payload;
      if (field === 'image') {
        state.image = value as any;
      } else {
        (state[field] as any) = value;
      }
    },
    resetNewsFields: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateNewsField, resetNewsFields } = newsFormSlice.actions;

export default newsFormSlice.reducer;
