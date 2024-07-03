'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import { CustomSession } from '@/utils/types';
import { signOut } from 'next-auth/react';

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

  // Check if the token has expired
  const isTokenExpired = () => {
    if (session?.token) {
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
    }
    return false;
  };

  // Handle sign out if token has expired
  if (isTokenExpired()) {
    signOut();
  }

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
