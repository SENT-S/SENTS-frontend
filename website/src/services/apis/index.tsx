import { GET_FINANCIAL } from '../urls';
import axios from 'axios';

export const getFinancialData = async (ID: number) => {
  try {
    const response = await axios.get(`${GET_FINANCIAL}/${ID}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
