import { createAxiosInstanceWithAuth } from '../axiosInstance';

export const getCompanies = async (token: string) => {
  const axiosInstance = createAxiosInstanceWithAuth(token);
  const res = await axiosInstance.get('/allcompanies/');
  return res.data;
};

export const getCompany = async (token: string, id: number) => {
  const axiosInstance = createAxiosInstanceWithAuth(token);
  const res = await axiosInstance.get(`/acompany/${id}/`);
  return res.data;
};

export const getCompanyNews = async (token: string, id: number) => {
  const axiosInstance = createAxiosInstanceWithAuth(token);
  const res = await axiosInstance.get(`/newsbycompany/${id}/`);
  return res.data;
};

export const getAllCompanyNews = async (token: string) => {
  const axiosInstance = createAxiosInstanceWithAuth(token);
  const res = await axiosInstance.get('/allnews/');
  return res.data;
};

export const getCompanyFinancials = async (token: string, id: number) => {
  const axiosInstance = createAxiosInstanceWithAuth(token);
  const res = await axiosInstance.get(`/company_financial_data/${id}/`);
  return res.data;
};
