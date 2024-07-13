'use client';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { useSession, signOut } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import { CustomSession } from '@/utils/types';
import { useRouter } from 'next/navigation';

interface ProviderProps {
  children: React.ReactNode;
}

interface DecodedToken {
  exp: number;
}

const StoreProvider = ({ children }: ProviderProps) => {
  const { data: session } = useSession() as {
    data: CustomSession;
  };
  const router = useRouter();

  useEffect(() => {
    // Check if the token has expired or if session is undefined
    const isTokenExpiredOrSessionUndefined = () => {
      if (!session || !session.token) {
        return true;
      }
      try {
        const decoded = jwt.decode(session.token) as DecodedToken;
        if (!decoded || !decoded.exp) {
          return true;
        }
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
      } catch (error) {
        return true;
      }
    };

    // Only sign out and redirect if the token is expired or session is undefined
    if (isTokenExpiredOrSessionUndefined() && session) {
      signOut();
      localStorage.clear();
      router.push('/login_register'); // Redirect to login page
    }
  }, [session, router]);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
