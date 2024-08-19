import path from 'path';

import axios from 'axios';
import { config } from 'dotenv';

import FetchData from './FetchData';

// Load environment variables from .env.local file
config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
});

/**
 * Fetch / Get Methods
 */
export const getAllCompanies = async () => {
  try {
    const response = await apiClient.get('/getData', {
      params: { endpoint: 'allcompanies' },
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

export const getAllCompanyNews = async () => {
  try {
    const response = await apiClient.get('/getData', {
      params: { endpoint: 'allnews' },
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

export const createCompany = (data: any) => FetchData('/create/company/', 'post', data);

export const addFinancialMetric = (data: any) =>
  FetchData('/create/financialmetric/', 'post', data);

export const addFinancialDataCategory = (data: any) =>
  FetchData('/create/financialdatacategory/', 'post', data);

export const addFinancialNews = (data: any) => FetchData('/create/financialnews/', 'post', data);

export const addCompanyFinancialData = (data: any) =>
  FetchData('/create/financialdata/', 'post', data);

export const addCompanyDocuments = (data: FormData) =>
  FetchData('/upload/companydocuments/', 'post', data, true);

/**
 * Patch / Update Methods
 */
export const updateCompanyFinancialData = (data: any) =>
  FetchData(`/update/financialdata/`, 'patch', data);

export const updateCompanyDetails = (data: any) => FetchData(`/update/company(s)/`, 'patch', data);

export const updateCompanyFNews = (data: any, id: any) =>
  FetchData(`/update/financialnews/${id}/`, 'patch', data);

/**
 * Delete Methods
 */
export const deleteCompany = (id: any) => FetchData(`/delete/company/${id}/`, 'delete');

export const deleteCompanyDocument = (id: any) =>
  FetchData(`/delete/companydocuments/${id}/`, 'delete');

export const deleteCompanyFNews = (data: any) =>
  FetchData(`/delete/financialnews/`, 'delete2', data);
