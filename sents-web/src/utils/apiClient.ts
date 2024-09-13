import FetchData from './FetchData';

// GET Methods
export const getAllCompanies = async (): Promise<any> => {
  const response = await FetchData('allcompanies');
  return response?.data || [];
};

export const getAllFinancialMetrics = async (): Promise<any> => {
  const response = await FetchData('allfinancialmetrics');
  return response?.data || [];
};

export const getAllFinancialDataCategories = async (): Promise<any> => {
  const response = await FetchData('allfinancialdatacategories');
  return response?.data || [];
};

export const getAllCompanyNews = async (): Promise<any> => {
  const response = await FetchData('allnews');
  return response?.data || [];
};

export const getCompanyFinancials = async (id: any): Promise<any> => {
  const response = await FetchData(`companyfinancialdata/${id}`);
  return response?.data || [];
};

export const getCompany = async (id: any): Promise<any> => {
  const response = await FetchData(`acompany/${id}`);
  return response?.data || null;
};

export const getCompanyNews = async (id: any): Promise<any> => {
  const response = await FetchData(`newsbycompany/${id}`);
  return response?.data || [];
};

// POST Methods
export const createCompany = (data: any) => FetchData('create/company/', 'POST', data);
export const addFinancialMetric = (data: any) => FetchData('create/financialmetric/', 'POST', data);
export const addFinancialDataCategory = (data: any) =>
  FetchData('create/financialdatacategory/', 'POST', data);
export const addFinancialNews = (data: any) => FetchData('create/financialnews/', 'POST', data);
export const addCompanyFinancialData = (data: any) =>
  FetchData('create/financialdata/', 'POST', data);
export const addCompanyDocuments = (data: FormData) =>
  FetchData('upload/companydocuments/', 'POST', data, true);

// PATCH Methods
export const updateCompanyFinancialData = (data: any) =>
  FetchData('update/financialdata/', 'PATCH', data);
export const updateCompanyDetails = (data: any) => FetchData('update/company(s)/', 'PATCH', data);
export const updateCompanyFNews = (data: any, id: string) =>
  FetchData(`update/financialnews/${id}/`, 'PATCH', data);

// DELETE Methods
export const deleteCompany = (id: string) => FetchData(`delete/company/${id}/`, 'DELETE');
export const deleteCompanyDocument = (id: string) =>
  FetchData(`delete/companydocuments/${id}/`, 'DELETE');
export const deleteCompanyFNews = (data: any) => FetchData('delete/financialnews/', 'DELETE', data);
