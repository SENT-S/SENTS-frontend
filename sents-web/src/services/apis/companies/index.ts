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

export const updateCompanyDetails = (data: any, id: any) =>
  FetchData(`/update/company/${id}/`, 'patch', data);

export const deleteCompany = (id: any) =>
  FetchData(`/delete/company/${id}/`, 'delete');

export const addCompanyDocuments = (data: any) =>
  FetchData('/upload/companydocuments/', 'post', data);

export const deleteCompanyDocument = (id: any) =>
  FetchData(`/delete/companydocuments/${id}/`, 'delete');

export const updateCompanyFNews = (data: any, id: any) =>
  FetchData(`/update/financialnews/${id}/`, 'patch', data);

export const deleteCompanyFNews = (id: any) =>
  FetchData(`/delete/financialnews/${id}/`, 'delete');
