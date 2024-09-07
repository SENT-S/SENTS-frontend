import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

import { removeTrailingSlash } from '@/utils/removeTrailingSlash';
import { CustomSession } from '@/utils/types';

const BASE_URL = removeTrailingSlash(process.env.NEXT_PUBLIC_API_URL);

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

let axiosInstance: AxiosInstance | null = null;

async function getAxiosInstance(): Promise<AxiosInstance> {
  if (axiosInstance) return axiosInstance;

  const session = await getSession();
  if (!session) throw new Error('Session not found');

  const { token } = session as CustomSession;
  if (!token) throw new Error('Session token not found');

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
        // Handle token refresh or logout here
        console.error('Unauthorized access. Refreshing token or logging out...');
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
): Promise<any> {
  try {
    const instance = await getAxiosInstance();

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
    console.error(`Error ${method} data from ${endpoint}: `, error);
    throw error;
  }
}

export default FetchData;
