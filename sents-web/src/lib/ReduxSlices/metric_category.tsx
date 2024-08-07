import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import {
  addFinancialMetric,
  addFinancialDataCategory,
  getAllFinancialMetrics,
  getAllFinancialDataCategories,
} from '@/services/apis/companies';

// Async actions
export const addMetric = createAsyncThunk('company/addMetric', async (metricData: any) => {
  return await addFinancialMetric(metricData);
});

export const addCategory = createAsyncThunk('company/addCategory', async (categoryData: any) => {
  return await addFinancialDataCategory(categoryData);
});

export const fetchMetrics = createAsyncThunk('company/fetchMetrics', async () => {
  return await getAllFinancialMetrics();
});

export const fetchCategories = createAsyncThunk('company/fetchCategories', async () => {
  return await getAllFinancialDataCategories();
});

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
  name: 'metric_category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMetric.pending, (state) => {
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
      .addCase(addCategory.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = 'idle';
        state.category = action.payload;
      })
      .addCase(addCategory.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = 'idle';
        state.error = action.payload;
      })
      .addCase(fetchMetrics.fulfilled, (state, action: PayloadAction<any>) => {
        state.metricList = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<any>) => {
        state.categoryList = action.payload;
      });
  },
});

export default companySlice.reducer;
