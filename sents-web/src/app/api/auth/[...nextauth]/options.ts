// options.ts
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export const providers = [
  CredentialsProvider({
    id: 'credentials',
    name: 'Credentials',
    credentials: {},
    async authorize(
      credentials: { email?: string; password?: string } | undefined,
      req: any,
    ) {
      if (!credentials) {
        throw new Error('No credentials provided');
      }

      const { email: username = '', password = '' } = credentials;

      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/login/`;
        const { data: response } = await axios.post(url, {
          username,
          password,
        });

        if (response?.status === 202) {
          const { user_data, token } = response.user_data;
          let user_role = 'CLIENT'; // default role

          // Check for admin role
          if (user_data.user_role) {
            user_role = user_data.user_role;
          }

          return { ...user_data, token, user_role };
        }

        // throw the message from the response
        throw new Error(
          response?.message || 'Failed to log in, please try again',
        );
      } catch (error: any) {
        throw new Error(error.message || 'Failed to log in, please try again');
      }
    },
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  }),
];

export const pages = {
  signIn: '/login_register',
  signOut: '/login_register',
  error: '/error',
};

export const secret = process.env.NEXT_AUTH_SECRET;

export const callbacks = {
  jwt: async ({ token, user }: any) => {
    if (user) {
      token = { ...token, ...user };
    }
    return token;
  },
  session: async ({ session, token }: any) => {
    session.user = {
      ...session.user,
      name: `${token.firstname} ${token.last_name}`,
      role: token.user_role,
    };
    session.token = token.token;
    return session;
  },
};
