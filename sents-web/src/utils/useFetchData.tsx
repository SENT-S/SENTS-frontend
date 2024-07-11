import axios from 'axios';
import { CustomSession } from '@/utils/types';
import { getSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const useAxiosInstance = (token: string) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

// Generic function to get data
const useFetchData = async (
  endpoint: string,
  method: 'get' | 'post',
  body?: any,
) => {
  try {
    const { token } = (await getSession()) as CustomSession;
    if (!token) {
      throw new Error('Session token not found');
    }
    const axiosInstance = useAxiosInstance(token as string);
    const res =
      method === 'get'
        ? await axiosInstance.get(endpoint)
        : await axiosInstance.post(endpoint, body);
    return res.data;
  } catch (error) {
    console.error(
      `Error ${method.toUpperCase()} data from ${endpoint}: `,
      error,
    );
    throw error;
  }
};

export default useFetchData;
