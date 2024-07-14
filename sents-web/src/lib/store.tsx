// store.tsx
import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './ReduxSlices/darkMode';
import companySlice from './ReduxSlices/create_company';
import newsFormSlice from './ReduxSlices/create_news';
import companyFinancialSlice from './ReduxSlices/create_company_financial';

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
    company: companySlice,
    news: newsFormSlice,
    companyFinancial: companyFinancialSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
