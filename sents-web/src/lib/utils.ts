import { type ClassValue, clsx } from 'clsx';
import {
  useDispatch as _useDispatch,
  useSelector as _useSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { twMerge } from 'tailwind-merge';

import { RootState, AppDispatch } from './store';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useDispatch = () => _useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
