import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Company {
  company_name: string;
  stock_symbol: string;
  country: string;
  sector: string;
  about: string;
  mission_statement: string;
  vision_statement: string;
  CEO: string;
  employees: number;
  founded: string;
  website: string;
}

const initialState: Company = {
  company_name: '',
  stock_symbol: '',
  country: '',
  sector: '',
  about: '',
  mission_statement: '',
  vision_statement: '',
  CEO: '',
  employees: 0,
  founded: '',
  website: '',
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    updateCompanyField: (
      state,
      action: PayloadAction<{ field: keyof Company; value: any }>,
    ) => {
      const { field, value } = action.payload;
      (state[field] as any) = value;
    },
    resetCompanyFields: () => initialState,
  },
});

export const { updateCompanyField, resetCompanyFields } = companySlice.actions;
export default companySlice.reducer;
