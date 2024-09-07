import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

import { removeTrailingSlash } from '@/utils/removeTrailingSlash';
import { CustomSession } from '@/utils/types';

const BASE_URL = removeTrailingSlash(process.env.NEXT_PUBLIC_API_URL);
const API_TIMEOUT = 10000; // 10 seconds
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface CacheItem {
  data: any;
  expiry: number;
}

let axiosInstance: AxiosInstance | null = null;
const cache: Record<string, CacheItem> = {};

async function getAxiosInstance(): Promise<AxiosInstance> {
  if (axiosInstance) return axiosInstance;

  const session = await getSession();
  if (!session) throw new Error('Session not found');

  const { token } = session as CustomSession;
  if (!token) throw new Error('Session token not found');

  axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized access. Refreshing token or logging out...');
        // Handle token refresh or logout here
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}

function getCacheKey(endpoint: string, method: HttpMethod, body?: any): string {
  return `${method}:${endpoint}:${JSON.stringify(body)}`;
}

function getFromCache(cacheKey: string): any | null {
  const cached = cache[cacheKey];
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }
  return null;
}

function setInCache(cacheKey: string, data: any): void {
  cache[cacheKey] = {
    data,
    expiry: Date.now() + CACHE_DURATION,
  };
}

export async function FetchData(
  endpoint: string,
  method: HttpMethod = 'GET',
  body?: any,
  isFormData: boolean = false,
  useCache: boolean = true,
): Promise<any> {
  const cacheKey = getCacheKey(endpoint, method, body);

  if (useCache && method === 'GET') {
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;
  }

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

    const response = await instance.request(config);

    if (useCache && method === 'GET') {
      setInCache(cacheKey, response.data);
    }

    return response.data;
  } catch (error) {
    console.error(`Error ${method} data from ${endpoint}: `, error);
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      console.error('Request timed out');
    }
    return null;
  }
}

export default FetchData;
