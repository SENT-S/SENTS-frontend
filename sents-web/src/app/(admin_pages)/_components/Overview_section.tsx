import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/utils/types';
import { Skeleton } from '@/components/ui/skeleton';
import { HiOutlineUsers } from 'react-icons/hi2';
import { HiOutlineUser } from 'react-icons/hi2';
import { MdOutlineDateRange } from 'react-icons/md';
import { MdOutlineWebAsset } from 'react-icons/md';

const Overview_section = ({ companyID }: { companyID: any }) => {
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <>
      {status === 'loading' ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-20 mb-4 rounded-xl bg-slate-200 dark:bg-slate-800"
          />
        ))
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <h1 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">
            Overview
          </h1>

          <div className="space-y-3">
            <div className="text-left text-[#0D4222] dark:text-gray-300">
              <Label className="text-2xl font-medium">About</Label>
            </div>
            <Textarea
              name="about"
              placeholder="About"
              className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3">
              <div className="text-left text-[#0D4222] dark:text-gray-300">
                <Label className="text-2xl font-medium">
                  Mission Statement
                </Label>
              </div>
              <Textarea
                name="mission_statement"
                placeholder="Mission Statement"
                className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
              />
            </div>
            <div className="space-y-3">
              <div className="text-left text-[#0D4222] dark:text-gray-300">
                <Label className="text-2xl font-medium">Vision Statement</Label>
              </div>
              <Textarea
                name="vision_statement"
                placeholder="Vision Statement"
                className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3">
              <div className="flex items-center text-[#0D4222] dark:text-gray-300">
                <HiOutlineUser size={20} className="mr-2" />
                <Label className="text-2xl font-medium">CEO</Label>
              </div>
              <Input
                type="text"
                name="CEO"
                placeholder="Enter CEO Name"
                className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-[#0D4222] dark:text-gray-300">
                <HiOutlineUsers size={20} className="mr-2" />
                <Label className="text-2xl font-medium">Employees</Label>
              </div>
              <Input
                type="number"
                name="employees"
                placeholder="Enter Number of Employees"
                className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3">
              <div className="flex items-center text-[#0D4222] dark:text-gray-300">
                <MdOutlineDateRange size={20} className="mr-2" />
                <Label className="text-2xl font-medium">Founded</Label>
              </div>
              <Input
                type="text"
                name="founded"
                placeholder="Enter Founded Year"
                className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-[#0D4222] dark:text-gray-300">
                <MdOutlineWebAsset size={20} className="mr-2" />
                <Label className="text-2xl font-medium">Website</Label>
              </div>
              <Input
                type="text"
                name="website"
                placeholder="Enter Website"
                className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-[#148C59] w-full text-white p-2 md:p-7 rounded-2xl hover:bg-green-600"
            onClick={() => null}
          >
            Save
          </Button>
        </form>
      )}
    </>
  );
};

export default Overview_section;
