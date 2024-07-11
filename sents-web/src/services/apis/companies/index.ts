import useFetchData from '@/utils/useFetchData';

export const getCompanies = () => useFetchData('/allcompanies/', 'get');

export const getCompany = (id: number) =>
  useFetchData(`/acompany/${id}/`, 'get');

export const getCompanyNews = (id: number) =>
  useFetchData(`/newsbycompany/${id}/`, 'get');

export const getAllCompanyNews = () => useFetchData('/allnews/', 'get');

export const getCompanyFinancials = (id: number) =>
  useFetchData(`/company_financial_data/${id}/`, 'get');
