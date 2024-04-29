'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

interface ProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
