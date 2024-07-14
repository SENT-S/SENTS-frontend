import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import FormComponent from '../FormComponent';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <FormComponent title="Sign Up" footerText="Create an account">
      <div className="space-y-1">
        <Label htmlFor="email" className="text-black dark:text-[#FFFFFF]">
          Email Id
        </Label>
        <Input
          className="dark:bg-[#39463E80] dark:border-[#148C59]"
          id="email"
          placeholder="JoneDoe@gmail.com"
          name="email"
          autoComplete="email"
        />
      </div>
      <div className="flex items-center space-x-6">
        <div className="space-y-1">
          <Label htmlFor="firstname" className="text-black dark:text-[#FFFFFF]">
            First Name
          </Label>
          <Input
            className="dark:bg-[#39463E80] dark:border-[#148C59]"
            id="firstname"
            placeholder="Enter First Name"
            name="firstname"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lastname" className="text-black dark:text-[#FFFFFF]">
            Last Name
          </Label>
          <Input
            className="dark:bg-[#39463E80] dark:border-[#148C59]"
            id="lastname"
            placeholder="Enter Last Name"
            name="lastname"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password" className="text-black dark:text-[#FFFFFF]">
          Password
        </Label>
        <div className="relative items-center flex">
          <Input
            className="dark:bg-[#39463E80] dark:border-[#148C59]"
            id="password"
            placeholder="Enter Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
          />
          <button
            type="button"
            className="absolute right-2 text-[#148C59] text-xs font-semibold cursor-pointer dark:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaRegEyeSlash size={16} />
            ) : (
              <FaRegEye size={16} />
            )}
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password2" className="text-black dark:text-[#FFFFFF]">
          Confirm Password
        </Label>
        <div className="relative items-center flex">
          <Input
            className="dark:bg-[#39463E80] dark:border-[#148C59]"
            id="password2"
            placeholder="Enter Password"
            name="password2"
            type={showConfirmPassword ? 'text' : 'password'}
          />
          <button
            type="button"
            className="absolute right-2 text-[#148C59] text-xs font-semibold cursor-pointer dark:text-white"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FaRegEyeSlash size={16} />
            ) : (
              <FaRegEye size={16} />
            )}
          </button>
        </div>
      </div>
    </FormComponent>
  );
};

export default RegisterForm;
