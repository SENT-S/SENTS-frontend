'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { LuCheckCircle } from 'react-icons/lu';

export default function page() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/login_register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow-xl text-center">
        <div className="flex justify-center">
          <LuCheckCircle className="text-green-700 text-5xl md:text-9xl mb-5" />
        </div>
        <h1 className="mb-4 text-2xl font-semibold">
          Account Created Successfully
        </h1>
        <p>
          Congratulations! Your account has been created successfully. You can
          now <br /> proceed to login and access your dashboard.
        </p>
        <button
          className="mt-8 px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-600"
          onClick={handleContinue}
        >
          Proceed to Login
        </button>
      </div>
    </div>
  );
}
