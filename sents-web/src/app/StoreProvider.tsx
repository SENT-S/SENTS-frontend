'use client';
import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { useSession, signOut } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import { CustomSession } from '@/utils/types';
import { useRouter } from 'next/router';

interface ProviderProps {
  children: React.ReactNode;
}

interface DecodedToken {
  exp: number;
}

const StoreProvider = ({ children }: ProviderProps) => {
  const { data: session } = useSession() as { data: CustomSession };
  const router = useRouter();
  const sessionRef = useRef(session);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    if (!sessionRef.current || !sessionRef.current.token) {
      signOut();
      localStorage.clear();
      router.push('/login_register');
      return;
    }

    try {
      const decoded = jwt.decode(sessionRef.current.token) as DecodedToken;
      if (!decoded || !decoded.exp) {
        throw new Error('Invalid token');
      }

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        throw new Error('Token expired');
      }
    } catch (error) {
      signOut();
      localStorage.clear();
      router.push('/login_register');
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
