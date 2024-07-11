import axios from 'axios';
import { CustomSession } from '@/utils/types';
import { getSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create an Axios instance outside the function to reuse it across different function calls
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic function to fetch data
const useFetchData = async (endpoint: string, method: string, body?: any) => {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error('Session not found');
    }

    const { token } = session as CustomSession;
    if (!token) {
      throw new Error('Session token not found');
    }

    // Set the Authorization header for this request
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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
