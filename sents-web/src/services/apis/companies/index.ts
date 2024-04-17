import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCompanies = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/allcompanies/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token ' + token,
    },
  });
  return res.data;
};

export const getCompany = async (token: string, id: number) => {
  const res = await axios.get(`${BASE_URL}/acompany/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token ' + token,
    },
  });
  return res.data;
};
