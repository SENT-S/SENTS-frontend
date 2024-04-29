'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Apple from '@/public/icons/apple.png';
import Google from '@/public/icons/google.png';
import Microsoft from '@/public/icons/micro.png';
import FormComponent from '@/components/authForm/FormComponent';
import { Button } from '@/components/ui/button';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const Auth = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <Button
        variant="outline"
        size="icon"
        className="ml-3 absolute top-4 left-4 dark:text-white"
        onClick={() => {
          // return to previous page
          router.back();
        }}
      >
        <IoChevronBackOutline />
      </Button>
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
          <FormComponent
            title="Sign In"
            footerText="Sign in"
            socialButtons={[
              { id: 'apple', icon: Apple, name: 'Apple' },
              { id: 'google', icon: Google, name: 'Google' },
              { id: 'microsoft', icon: Microsoft, name: 'Microsoft' },
            ]}
          >
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
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="text-black dark:text-[#FFFFFF]"
              >
                Password
              </Label>
              <Input
                className="dark:bg-[#39463E80] dark:border-[#148C59]"
                id="password"
                placeholder="Enter Password"
                name="password"
                type="password"
              />
            </div>
            <p className="text-sm underline">Forgot Password?</p>
          </FormComponent>
        </TabsContent>
        <TabsContent value="sign_Up">
          <FormComponent
            title="Sign Up"
            footerText="Create an account"
            socialButtons={[
              { id: 'apple', icon: Apple, name: 'Apple' },
              { id: 'google', icon: Google, name: 'Google' },
              { id: 'microsoft', icon: Microsoft, name: 'Microsoft' },
            ]}
          >
            <div className="space-y-1">
              <Label htmlFor="email" className="text-black dark:text-[#FFFFFF]">
                Email Id
              </Label>
              <Input
                className="dark:bg-[#39463E80] dark:border-[#148C59]"
                id="email"
                placeholder="JoneDoe@gmail.com"
                name="email"
              />
            </div>
            <div className="flex items-center space-x-6">
              <div className="space-y-1">
                <Label
                  htmlFor="firstname"
                  className="text-black dark:text-[#FFFFFF]"
                >
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
                <Label
                  htmlFor="lastname"
                  className="text-black dark:text-[#FFFFFF]"
                >
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
              <Label
                htmlFor="password"
                className="text-black dark:text-[#FFFFFF]"
              >
                Password
              </Label>
              <Input
                className="dark:bg-[#39463E80] dark:border-[#148C59]"
                id="password"
                placeholder="Enter Password"
                name="password"
                type="password"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="password2"
                className="text-black dark:text-[#FFFFFF]"
              >
                Confirm Password
              </Label>
              <Input
                className="dark:bg-[#39463E80] dark:border-[#148C59]"
                id="password2"
                placeholder="Enter Password"
                name="password2"
                type="password"
              />
            </div>
          </FormComponent>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
