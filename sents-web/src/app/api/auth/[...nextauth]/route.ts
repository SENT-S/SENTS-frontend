import NextAuth from 'next-auth';
import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
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

          if (response?.message === 'Logged In Successfully') {
            const { user_data, token } = response.user_data;
            return { ...user_data, token };
          }

          throw new Error('User not found');
        } catch (error) {
          throw new Error('Failed to log in, please try again');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/login_register',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = {
        ...session.user,
        name: `${token.firstname} ${token.last_name}`,
      };
      session.token = token.token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
