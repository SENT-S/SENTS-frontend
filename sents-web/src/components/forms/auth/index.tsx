'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import CustomBackButton from '../../ui/customBackButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Index = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full overflow-y-auto flex justify-center items-center relative">
      <CustomBackButton
        onClick={() => router.push('/landing')}
        customClass="absolute top-4 left-4"
      />
      <Tabs
        defaultValue="sign_In"
        className="w-[558px] rounded-3xl bg-white dark:bg-[#070707] md:shadow p-14 lg:p-24"
      >
        <TabsList className="grid w-full grid-cols-2 bg-[#E6F6F0] dark:bg-[#39463E80] rounded-[8px]">
          <TabsTrigger
            className="data-[state=active]:bg-[#148C59] data-[state=active]:text-white text-[#148C59] rounded-[8px]"
            value="sign_In"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-[#148C59] data-[state=active]:text-white text-[#148C59] rounded-[8px]"
            value="sign_Up"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign_In">
          <LoginForm />
        </TabsContent>
        <TabsContent value="sign_Up">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
