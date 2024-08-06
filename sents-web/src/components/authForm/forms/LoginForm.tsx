import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import FormComponent from '../FormComponent';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormComponent title="Sign In" footerText="Sign in">
      <div className="space-y-1">
        <Label htmlFor="email" className="text-black dark:text-[#FFFFFF]">
          Email Id
        </Label>
        <Input
          className="dark:bg-[#39463E80] dark:border-[#148C59]"
          id="email"
          placeholder="JoneDoe@gmail.com"
          name="email"
          type="email"
          autoComplete="email"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="text-black dark:text-[#FFFFFF]">
          Password
        </label>
        <div className="relative items-center flex">
          <Input
            className="dark:bg-[#39463E80] dark:border-[#148C59]"
            id="password"
            placeholder="Enter Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute right-2 text-[#148C59] text-xs font-semibold cursor-pointer dark:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
          </button>
        </div>
      </div>
      <Link href="#" className="text-sm relative top-2 underline">
        Forgot Password?
      </Link>
    </FormComponent>
  );
};

export default LoginForm;
