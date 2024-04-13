'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Apple from '@/public/icons/apple.png';
import Google from '@/public/icons/google.png';
import Microsoft from '@/public/icons/micro.png';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
  footerText: string;
  socialButtons: { id: string; icon: StaticImageData; name: string }[];
}

const AuthCard = ({
  title,
  children,
  footerText,
  socialButtons,
}: AuthCardProps) => (
  <Card className="relative border-none shadow-none space-y-4 text-[#9C9AA5]">
    <CardContent className="space-y-2 p-0">{children}</CardContent>
    <CardFooter className="p-0">
      <Button className="bg-[#148C59] hover:bg-green-600 text-white w-full">
        {footerText}
      </Button>
    </CardFooter>
    <div className="flex w-full flex-col items-center relative">
      <Separator className="my-4 bg-[#9C9AA54D]" />
      <span className="text-center text-[12px] bg-white dark:bg-[#39463E] w-[48px] absolute top-[7px]">
        OR
      </span>
    </div>
    <div className="flex space-x-3">
      {socialButtons.map((button: any) => (
        <Button
          key={button.id}
          className={`dark:bg-[#39463E80] hover:bg-[#148C5966] border border-[#148C5966] relative w-full`}
        >
          <Image src={button.icon} alt={button.name} width={25} height={25} />
        </Button>
      ))}
    </div>
    <CardDescription className="text-center text-[10px]">
      By signing up to create an account I accept Company’s
      <Link href="/terms" className="text-[#1EF1A5] pl-2">
        Terms of use & Privacy Policy.
      </Link>
    </CardDescription>
  </Card>
);

const AuthPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Tabs
        defaultValue="sign_In"
        className="w-[558px] rounded-3xl bg-white dark:bg-[#070707] shadow p-14 lg:p-24"
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
          <AuthCard
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
              />
            </div>
            <CardDescription className="text-sm underline">
              Forgot Password?
            </CardDescription>
          </AuthCard>
        </TabsContent>
        <TabsContent value="sign_Up">
          <AuthCard
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
              />
            </div>
            <div className="flex items-center space-x-6">
              <div className="space-y-1">
                <Label
                  htmlFor="Fname"
                  className="text-black dark:text-[#FFFFFF]"
                >
                  First Name
                </Label>
                <Input
                  className="dark:bg-[#39463E80] dark:border-[#148C59]"
                  id="Fname"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="Lname"
                  className="text-black dark:text-[#FFFFFF]"
                >
                  Last Name
                </Label>
                <Input
                  className="dark:bg-[#39463E80] dark:border-[#148C59]"
                  id="Lname"
                  placeholder="Enter Last Name"
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
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="confirmation_password"
                className="text-black dark:text-[#FFFFFF]"
              >
                Confirm Password
              </Label>
              <Input
                className="dark:bg-[#39463E80] dark:border-[#148C59]"
                id="confirmation_password"
                placeholder="Enter Password"
              />
            </div>
          </AuthCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;
