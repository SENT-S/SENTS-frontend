import React from 'react';

const Register = () => {
  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Id
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 mt-1 border rounded-md focus:border-green-500 focus:ring focus:ring-green-200 focus:outline-none"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 mt-1 border rounded-md focus:border-green-500 focus:ring focus:ring-green-200 focus:outline-none"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
          Sign In
        </button>
      </div>
      <div className="flex items-center mt-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">or sign in with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          aria-label="Sign in with Google"
          className="p-3 rounded-md shadow-sm hover:bg-gray-100"
        >
          {/* Google Icon */}
        </button>
        <button
          aria-label="Sign in with Apple"
          className="p-3 rounded-md shadow-sm hover:bg-gray-100"
        >
          {/* Apple Icon */}
        </button>
        <button
          aria-label="Sign in with Microsoft"
          className="p-3 rounded-md shadow-sm hover:bg-gray-100"
        >
          {/* Microsoft Icon */}
        </button>
      </div>
    </form>
  );
};

export default Register;
