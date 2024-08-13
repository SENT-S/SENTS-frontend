'use client';
import jwt from 'jsonwebtoken';
import { redirect, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

import { CustomSession } from '@/utils/types';

interface ProviderProps {
  children: React.ReactNode;
  themeProps: {
    attribute: string;
    defaultTheme: string;
    enableSystem: boolean;
    disableTransitionOnChange: boolean;
  };
}

interface DecodedToken {
  exp: number;
}

const AppProvider = ({ children, themeProps }: ProviderProps) => {
  const { data: session } = useSession() as { data: CustomSession };
  const [toastShown, setToastShown] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

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
      console.error('Error decoding token', error);
      return true;
    }
  }, [session]);

  useEffect(() => {
    if (isTokenExpiredOrSessionUndefined() && session) {
      signOut();
      localStorage.clear();
      redirect('/login_register');
    } else if (session && !toastShown && pathname === '/') {
      toast.success(`Welcome back, ${session.user?.first_name}!`, {
        style: {
          background: 'green',
          color: 'white',
          border: 'none',
        },
        position: 'top-center',
        duration: 5000,
      });
      setToastShown(true);
    }
    setMounted(true);
  }, [session, toastShown, pathname, isTokenExpiredOrSessionUndefined]);

  if (!mounted) return null;

  return <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>;
};

export default AppProvider;
