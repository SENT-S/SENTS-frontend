import { Session } from 'next-auth';

export interface CustomSession extends Session {
  token?: string;
  user?: {
    name: string;
    email: string;
    role: string;
    image: string;
  };
}

export interface CompanyType {
  company_country: string;
  company_country_code: string;
  num_of_companies: number;
  list_of_companies: {
    id: number;
    company_name: string;
    company_country: string;
    stock_symbol: string;
    company_country_code: string;
    sector_or_industry: string;
  }[];
}
