'use client';
import React, { useEffect, useState } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return [children];

  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};

export default ThemeProvider;
