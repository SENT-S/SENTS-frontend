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
      async authorize(credentials: any) {
        // Check if email or password is empty
        if (!credentials?.email || !credentials?.password) {
          console.error('Email or password cannot be empty');
          throw new Error('Email or password cannot be empty');
        }

        const body = {
          username: credentials?.email,
          password: credentials?.password,
        };

        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/login/`;
          const res = await axios.post(url, body);

          if (res.data) {
            const response = res.data;

            if (response.message === 'Logged In Successfully') {
              const user = {
                ...response.data.user_data,
                token: response.data.token,
              };
              return user;
            } else {
              throw new Error('Login failed');
            }
          } else {
            throw new Error('No response from the server');
          }
        } catch (error) {
          throw new Error('Failed to log in');
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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      const { token: _, ...userData } = token;
      if (userData.firstname && userData.last_name) {
        userData.name = `${userData.firstname} ${userData.last_name}`;
      }
      session.user = { ...session.user, ...userData };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
