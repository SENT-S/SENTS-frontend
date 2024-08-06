"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { LuCheckCircle } from "react-icons/lu";

export default function Page() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/login_register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow-xl text-center max-w-screen-lg mx-auto">
        <div className="flex justify-center">
          <LuCheckCircle className="text-green-700 text-5xl md:text-9xl mb-5" />
        </div>
        <h1 className="mb-4 text-2xl font-semibold">
          Account Created Successfully
        </h1>
        <p>
          Congratulations! Your account has been created successfully. Please
          note that your account is currently under review for verification.
          Once your account is verified, you will receive an email notification
          and then you can proceed to login and access your dashboard. We
          appreciate your patience during this process.
        </p>
        <button
          className="mt-8 px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-600"
          onClick={handleContinue}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
