import FetchData from '@/utils/FetchData';

export const createCompany = (data: any) => FetchData('/create/company/', 'post', data);

export const addFinancialMetric = (data: any) =>
  FetchData('/create/financialmetric/', 'post', data);

export const addFinancialDataCategory = (data: any) =>
  FetchData('/create/financialdatacategory/', 'post', data);

export const addFinancialNews = (data: any) => FetchData('/create/financialnews/', 'post', data);

export const addCompanyFinancialData = (data: any) =>
  FetchData('/create/financialdata/', 'post', data);

export const updateCompanyFinancialData = (data: any) =>
  FetchData(`/update/financialdata/`, 'patch', data);

export const updateCompanyDetails = (data: any) => FetchData(`/update/company(s)/`, 'patch', data);

export const deleteCompany = (id: any) => FetchData(`/delete/company/${id}/`, 'delete');

export const addCompanyDocuments = (data: FormData) =>
  FetchData('/upload/companydocuments/', 'post', data, true);

export const deleteCompanyDocument = (id: any) =>
  FetchData(`/delete/companydocuments/${id}/`, 'delete');

export const updateCompanyFNews = (data: any, id: any) =>
  FetchData(`/update/financialnews/${id}/`, 'patch', data);

export const deleteCompanyFNews = (data: any) =>
  FetchData(`/delete/financialnews/`, 'delete2', data);
