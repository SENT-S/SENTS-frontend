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
