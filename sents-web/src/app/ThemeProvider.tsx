'use client';
import React, { useEffect, useState } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <NextThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="system"
    >
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
