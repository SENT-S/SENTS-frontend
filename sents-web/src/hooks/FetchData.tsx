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
const FetchData = async (
  endpoint: string,
  method: string = 'get',
  body?: any
) => {
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

    let res;
    switch (method.toLowerCase()) {
      case 'get':
        res = await axiosInstance.get(endpoint);
        break;
      case 'post':
        res = await axiosInstance.post(endpoint, body);
        break;
      case 'patch':
        res = await axiosInstance.patch(endpoint, body);
        break;
      case 'put':
        res = await axiosInstance.put(endpoint, body);
        break;
      case 'delete':
        res = await axiosInstance.delete(endpoint);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return res.data;
  } catch (error) {
    console.error(
      `Error ${method.toUpperCase()} data from ${endpoint}: `,
      error
    );
    throw error;
  }
};

export default FetchData;
