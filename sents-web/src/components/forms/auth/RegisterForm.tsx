import React from 'react';

import CustomInputField from '../../ui/customInputField';
import AuthTemplate from '../AuthTemplate';

import { registerSchema } from '@/utils/validations';

const RegisterForm = () => {
  return (
    <AuthTemplate
      title="Sign Up"
      footerText="Create an account"
      formSchema={registerSchema}
      defaultValues={{ email: '', firstname: '', lastname: '', password: '', password2: '' }}
    >
      <CustomInputField
        label="Email Id"
        name="email"
        placeholder="JoneDoe@gmail.com"
        type="email"
        autoComplete="email"
      />
      <div className="flex items-center space-x-6">
        <CustomInputField
          label="First Name"
          name="firstname"
          placeholder="Enter First Name"
          type="text"
          autoComplete="off"
        />
        <CustomInputField
          label="Last Name"
          name="lastname"
          placeholder="Enter Last Name"
          type="text"
          autoComplete="off"
        />
      </div>

      <CustomInputField
        label="Password"
        name="password"
        placeholder="Enter password"
        type="password"
        autoComplete="current-password"
      />

      <CustomInputField
        label="Confirm Password"
        name="password2"
        placeholder="Enter Password"
        type="password"
        autoComplete="current-password"
      />
    </AuthTemplate>
  );
};

export default RegisterForm;
