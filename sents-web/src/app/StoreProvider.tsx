'use client';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { useSession, signOut } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import { CustomSession } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
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

    if (isTokenExpiredOrSessionUndefined() && session) {
      signOut();
      localStorage.clear();
      router.push('/login_register');
    } else if (session && window.location.pathname === '/' && !toastShown) {
      toast.success('Authentication successful', {
        style: {
          background: 'green',
          color: 'white',
          border: 'none',
        },
        position: 'top-right',
        duration: 5000,
      });
      setToastShown(true);
      router.push('/dashboard');
    }
  }, [session, router, toastShown]);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
