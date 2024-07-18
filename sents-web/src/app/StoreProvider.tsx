'use client';
import React, { useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { useSession, signOut } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import { CustomSession } from '@/utils/types';
import { redirect } from 'next/navigation';

interface ProviderProps {
  children: React.ReactNode;
}

interface DecodedToken {
  exp: number;
}

const StoreProvider = ({ children }: ProviderProps) => {
  const { data: session } = useSession() as { data: CustomSession };

  const isTokenExpiredOrSessionUndefined = useCallback(() => {
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
  }, [session]);

  useEffect(() => {
    if (isTokenExpiredOrSessionUndefined() && session) {
      signOut();
      localStorage.clear();
      redirect('/login_register');
    }
  }, [isTokenExpiredOrSessionUndefined, session]);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
