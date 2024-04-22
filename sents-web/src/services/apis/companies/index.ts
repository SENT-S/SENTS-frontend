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
