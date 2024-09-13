import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

import { removeTrailingSlash } from '@/utils/removeTrailingSlash';
import { CustomSession } from '@/utils/types';

const BASE_URL = removeTrailingSlash(process.env.NEXT_PUBLIC_API_URL);
type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

let axiosInstance: AxiosInstance | null = null;

async function getAxiosInstance(): Promise<AxiosInstance | null> {
  if (axiosInstance) return axiosInstance;

  const session = await getSession();
  if (!session) {
    console.error('Session not found');
    return null;
  }

  const { token } = session as CustomSession;
  if (!token) {
    console.error('Session token not found');
    return null;
  }

  axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized access. Token may be invalid.');
        axiosInstance = null; // Reset the instance so it will be recreated on next request
        return Promise.reject(new Error('Unauthorized'));
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}

export async function FetchData(
  endpoint: string,
  method: HttpMethod = 'GET',
  body?: any,
  isFormData: boolean = false,
): Promise<any | null> {
  try {
    const instance = await getAxiosInstance();
    if (!instance) {
      console.error('Failed to create Axios instance. Token may be missing or invalid.');
      return null;
    }

    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
    };

    if (body) {
      config.data = isFormData ? body : JSON.stringify(body);
    }

    if (isFormData) {
      config.headers = { ...config.headers, 'Content-Type': 'multipart/form-data' };
    }

    const response = await instance.request<any>(config);
    return response.data;
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      console.error('Unauthorized request. Stopping further requests.');
      return null;
    }
    console.error(`Error ${method} data from ${endpoint}: `, error);
    throw error;
  }
}

export default FetchData;
