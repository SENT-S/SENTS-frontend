const COUNTRY_URL = import.meta.env.VITE_COUNTRY_FLAG_URL;
const FINANCIALS_URL = import.meta.env.VITE_FINANCIALS_URL;

export const GET_COUNTRY_FLAG = `${COUNTRY_URL}/flag`;

export const GET_FINANCIAL = `${FINANCIALS_URL}/financials`;

export const GET_COMPANY_DATA = `${FINANCIALS_URL}/companies`;
