// store.tsx
import { configureStore } from '@reduxjs/toolkit';

import authSlice from './ReduxSlices/authSlice';
import companySlice from './ReduxSlices/create_company';
import companyFinancialSlice from './ReduxSlices/create_company_financial';
import newsFormSlice from './ReduxSlices/create_news';
import MetricCategorySlice from './ReduxSlices/metric_category';
import refreshSlice from './ReduxSlices/refreshSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    company: companySlice,
    news: newsFormSlice,
    companyFinancial: companyFinancialSlice,
    metricCategory: MetricCategorySlice,
    refresh: refreshSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
