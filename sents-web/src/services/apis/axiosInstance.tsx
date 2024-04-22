import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createAxiosInstanceWithAuth = (token: string) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
