'use client';

import jwt from 'jsonwebtoken';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import Loading from './loading';

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
  const { data: session, status } = useSession() as { data: CustomSession; status: string };
  const [toastShown, setToastShown] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Handle component mounting to prevent hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle session and token expiration
  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (session && session.token) {
      try {
        const decoded = jwt.decode(session.token) as DecodedToken;
        const currentTime = Date.now() / 1000;

        if (!decoded || !decoded.exp || decoded.exp < currentTime) {
          handleSessionExpiration();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        handleSessionExpiration();
      }
    } else if (!session && status !== 'loading') {
      // If there's no session and not loading, redirect to landing
      router.replace('/landing');
    }
  }, [session, status, router]);

  // Function to handle session expiration
  const handleSessionExpiration = async () => {
    try {
      await signOut({ redirect: false });
      // Remove only specific items if necessary
      // Example: localStorage.removeItem('userSettings');
      // localStorage.clear();
    } catch (error) {
      console.error('Error during sign out:', error);
    } finally {
      router.replace('/landing');
    }
  };

  // Handle displaying the welcome toast
  useEffect(() => {
    if (session && !toastShown && pathname === '/') {
      toast.success(`Welcome back, ${session.user?.first_name}!`, {
        position: 'top-center',
      });
      setToastShown(true);
    }
  }, [session, toastShown, pathname]);

  // Prevent rendering until the component is mounted and session is loaded
  if (!mounted || status === 'loading') return <Loading />;

  return <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>;
};

export default AppProvider;
