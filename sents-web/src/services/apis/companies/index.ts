import FetchData from '@/hooks/FetchData';

export const getCompanies = () => FetchData('/allcompanies/', 'get');

export const getCompany = (id: number) => FetchData(`/acompany/${id}/`, 'get');

export const getCompanyNews = (id: number) =>
  FetchData(`/newsbycompany/${id}/`, 'get');

export const getAllCompanyNews = () => FetchData('/allnews/', 'get');

export const getCompanyFinancials = (id: number) =>
  FetchData(`/companyfinancialdata/${id}/`, 'get');

export const createCompany = (data: any) =>
  FetchData('/create/company/', 'post', data);

export const addFinancialMetric = (data: any) =>
  FetchData('/create/financialmetric/', 'post', data);

export const addFinancialDataCategory = (data: any) =>
  FetchData('/create/financialdatacategory/', 'post', data);

export const addFinancialNews = (data: any) =>
  FetchData('/create/financialnews/', 'post', data);

export const createUpdateFinancialData = (data: any) =>
  FetchData('/createorupdate/financialdata/', 'post', data);

export const getAllFinancialMetrics = () =>
  FetchData('/allfinancialmetrics/', 'get');

export const getAllFinancialDataCategories = () =>
  FetchData('/allfinancialdatacategories/', 'get');
