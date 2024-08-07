// store.tsx
import { configureStore } from '@reduxjs/toolkit';

import companySlice from './ReduxSlices/create_company';
import companyFinancialSlice from './ReduxSlices/create_company_financial';
import newsFormSlice from './ReduxSlices/create_news';
import MetricCategorySlice from './ReduxSlices/metric_category';

export const store = configureStore({
  reducer: {
    company: companySlice,
    news: newsFormSlice,
    companyFinancial: companyFinancialSlice,
    metricCategory: MetricCategorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
