'use client';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { Input } from './input';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface CustomInputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  name,
  placeholder,
  type = 'text',
  autoComplete = 'off',
}) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-black dark:text-white">{label}</FormLabel>
          <FormControl className="relative">
            <div className={`${type === 'password' ? 'relative items-center flex' : 'block'}`}>
              <Input
                className="dark:bg-[#39463E80] dark:border-[#148C59]"
                placeholder={placeholder}
                type={type === 'password' && showPassword ? 'text' : type}
                autoComplete={autoComplete}
                {...field}
              />
              {type === 'password' && (
                <button
                  type="button"
                  className="absolute right-2 text-[#148C59] text-xs font-semibold cursor-pointer dark:text-white"
                  onClick={togglePasswordVisibility}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      togglePasswordVisibility();
                    }
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-500 dark:text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default CustomInputField;
