import useFetchData from '@/utils/useFetchData';

export const getCompanies = () => useFetchData('/allcompanies/', 'get');

export const getCompany = (id: number) =>
  useFetchData(`/acompany/${id}/`, 'get');

export const getCompanyNews = (id: number) =>
  useFetchData(`/newsbycompany/${id}/`, 'get');

export const getAllCompanyNews = () => useFetchData('/allnews/', 'get');

export const getCompanyFinancials = (id: number) =>
  useFetchData(`/company_financial_data/${id}/`, 'get');

export const createCompany = (data: any) =>
  useFetchData('/create/company/', 'post', data);

export const addFinancialMetric = (data: any) =>
  useFetchData('/create/financialmetric/', 'post', data);

export const addFinancialDataCategory = (data: any) =>
  useFetchData('/create/financialdatacategory/', 'post', data);

export const addFinancialNews = (data: any) =>
  useFetchData('/create/financialnews/', 'post', data);

export const createUpdateFinancialData = (data: any) =>
  useFetchData('/createorupdate/financialdata/', 'post', data);
