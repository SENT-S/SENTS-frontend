'use client';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null;
};

export default ThemeToggle;
