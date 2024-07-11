import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  addFinancialMetric,
  addFinancialDataCategory,
} from '@/services/apis/companies';

// Async actions
export const addMetric = createAsyncThunk(
  'company/addMetric',
  async (metricData: any) => {
    return await addFinancialMetric(metricData);
  },
);

export const addCategory = createAsyncThunk(
  'company/addCategory',
  async (categoryData: any) => {
    return await addFinancialDataCategory(categoryData);
  },
);

// Initial state
const initialState = {
  metric: null,
  category: null,
  metricList: [],
  categoryList: [],
  isLoading: 'idle',
  error: null,
};

// Slice
const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addMetric.pending, state => {
        state.isLoading = 'loading';
      })
      .addCase(addMetric.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = 'idle';
        state.metric = action.payload;
      })
      .addCase(addMetric.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = 'idle';
        state.error = action.payload;
      })
      .addCase(addCategory.pending, state => {
        state.isLoading = 'loading';
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = 'idle';
        state.category = action.payload;
      })
      .addCase(addCategory.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = 'idle';
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
