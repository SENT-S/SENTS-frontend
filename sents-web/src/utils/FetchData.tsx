import axios from 'axios';
import { CustomSession } from '@/utils/types';
import { getSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const FetchData = async (
  endpoint: string,
  method: string = 'get',
  body?: any,
  isFormData: boolean = false,
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

    // Set the correct Content-Type for FormData
    if (isFormData) {
      axiosInstance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    } else {
      axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
    }

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
      case 'delete2':
        res = await axiosInstance.delete(endpoint, { data: body });
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return res.data;
  } catch (error) {
    console.error(`Error ${method.toUpperCase()} data from ${endpoint}: `, error);
    throw error;
  }
};

export default FetchData;
