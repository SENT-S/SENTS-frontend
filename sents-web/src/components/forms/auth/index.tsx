'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';

import CustomBackButton from '../../ui/customBackButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Index = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full overflow-y-auto flex justify-center items-center relative">
      <CustomBackButton
        onClick={() => router.push('/landing')}
        customClass="absolute top-4 left-4"
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-[558px] rounded-3xl bg-white dark:bg-[#070707] md:shadow p-14 lg:p-24"
      >
        <Tabs defaultValue="sign_In">
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
      </motion.div>
    </div>
  );
};

export default Index;
