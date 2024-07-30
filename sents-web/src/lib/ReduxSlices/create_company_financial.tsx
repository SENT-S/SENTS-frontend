import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CompanyFinancial {
  document_name: string;
}

const initialState: CompanyFinancial = {
  document_name: '',
};

const companyFinancialSlice = createSlice({
  name: 'companyFinancial',
  initialState,
  reducers: {
    updateCompanyFinancialField: (
      state,
      action: PayloadAction<{ field: keyof CompanyFinancial; value: any }>
    ) => {
      const { field, value } = action.payload;
      (state[field] as any) = value;
    },
    resetCompanyFinancialFields: () => initialState,
  },
});

export const { updateCompanyFinancialField, resetCompanyFinancialFields } =
  companyFinancialSlice.actions;

export default companyFinancialSlice.reducer;
