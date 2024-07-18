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
  const { data: session } = useSession() as { data: CustomSession };
  const router = useRouter();

  useEffect(() => {
    if (!session || !session.token) {
      signOut();
      localStorage.clear();
      router.push('/login_register');
      return;
    }

    try {
      const decoded = jwt.decode(session.token) as DecodedToken;
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
  }, [session]);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
