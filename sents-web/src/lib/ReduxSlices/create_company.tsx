import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createCompany } from '@/services/apis/companies';

interface Company {
  company_name: string;
  stock_symbol: string;
  company_country: string;
  sector_or_industry: string;
  about_company: string;
  mission_statement: string;
  vision_statement: string;
  ceo: string;
  number_of_employees: number;
  year_founded: number;
  website_url: string;
  response?: any;
  isLoading: boolean;
}

const initialState: Company = {
  company_name: '',
  stock_symbol: '',
  company_country: '',
  sector_or_industry: '',
  about_company: '',
  mission_statement: '',
  vision_statement: '',
  ceo: '',
  number_of_employees: 0,
  year_founded: 0,
  website_url: '',
  response: null,
  isLoading: false,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    updateCompanyField: (state, action: PayloadAction<{ field: keyof Company; value: any }>) => {
      const { field, value } = action.payload;
      (state[field] as any) = value;
    },
    resetCompanyFields: () => initialState,
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updateCompanyField, resetCompanyFields, setLoading } = companySlice.actions;

export const createCompanyAPI = (companyData: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await createCompany(companyData);
    dispatch(updateCompanyField({ field: 'response', value: response }));
  } catch (error) {
    console.error('Failed to create company', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default companySlice.reducer;
