import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
});

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
