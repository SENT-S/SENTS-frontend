import Link from 'next/link';
import React from 'react';

import CustomInputField from '../../ui/customInputField';
import AuthTemplate from '../AuthTemplate';

import { loginSchema } from '@/utils/validations';

const LoginForm = () => {
  return (
    <AuthTemplate
      title="Sign In"
      footerText="Sign in"
      formSchema={loginSchema}
      defaultValues={{ email: '', password: '' }}
    >
      <CustomInputField
        label="Email Id"
        name="email"
        placeholder="JoneDoe@gmail.com"
        type="email"
        autoComplete="email"
      />

      <CustomInputField
        label="Password"
        name="password"
        placeholder="Enter password"
        type="password"
        autoComplete="current-password"
      />

      <Link href="#" className="text-sm relative top-2 underline">
        Forgot Password?
      </Link>
    </AuthTemplate>
  );
};

export default LoginForm;
