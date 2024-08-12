import path from 'path';

import axios from 'axios';
import { config } from 'dotenv';

// Load environment variables from .env.local file
config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
});

/**
 * Fetch / Get Methods
 */
export const getAllCompanies = async (token?: string) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await apiClient.get('/getData', {
      params: { endpoint: 'allcompanies' },
      headers,
    });
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error;
  }
};

export const getAllFinancialMetrics = async () => {
  try {
    const response = await apiClient.get('/getData', {
      params: { endpoint: 'allfinancialmetrics' },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error;
  }
};

export const getAllFinancialDataCategories = async () => {
  try {
    const response = await apiClient.get('/getData', {
      params: { endpoint: 'allfinancialdatacategories' },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error;
  }
};

export const getAllCompanyNews = async (token?: string) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await apiClient.get('/getData', {
      params: { endpoint: 'allnews' },
      headers,
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error;
  }
};

export const getCompanyFinancials = async (id: any) => {
  try {
    const response = await apiClient.get('/getData', {
      params: { endpoint: `companyfinancialdata/${id}` },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error;
  }
};

export const getCompany = async (id: any) => {
  try {
    const response = await apiClient.get('/getData', {
      params: { endpoint: `acompany/${id}` },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error;
  }
};

export const getCompanyNews = async (id: any) => {
  try {
    const response = await apiClient.get('/getData', {
      params: { endpoint: `newsbycompany/${id}` },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error;
  }
};

/**
 * Post / Create Methods
 */

export const createCompany = (data: any) => {
  return apiClient.post('/postData', data, {
    params: { endpoint: 'create/company' },
  });
};
