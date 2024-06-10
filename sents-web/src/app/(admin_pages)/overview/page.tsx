'use client';
import { useState } from 'react';
import MainLayout from '@/components/layout';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { countryList, companyList } from '@/services/mockData/mock';

const Overview = () => {
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  const [selectedCountry, setSelectedCountry] = useState('Uganda');
  const [selectedCompany, setSelectedCompany] = useState('Company');

  const handleSelectCountry = (value: string) => {
    setSelectedCountry(value);
  };

  const handleSelectCompany = (value: string) => {
    setSelectedCompany(value);
  };
  return (
    <MainLayout>
      {status === 'loading' ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-20 rounded-xl bg-slate-200 dark:bg-slate-800"
          />
        ))
      ) : (
        <form className="space-y-8">
          <h1 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">
            Overview
          </h1>
          <div className="flex gap-6 items-center">
            <Select onValueChange={handleSelectCountry}>
              <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
                <SelectValue
                  placeholder="Select Country"
                  className="text-center w-full"
                >
                  {selectedCountry}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
                {countryList.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={handleSelectCompany}>
              <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
                <SelectValue
                  placeholder="Select Country"
                  className="text-center w-full"
                >
                  {selectedCompany}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
                {companyList.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-2xl font-medium text-[#0D4222] dark:text-gray-300">
              About
            </Label>
            <Textarea
              placeholder="About"
              className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3">
              <div className="flex items-center text-[#0D4222] dark:text-gray-300">
                <HiOutlineUser size={20} className="mr-2" />
                <Label className="text-2xl font-medium">CEO</Label>
              </div>
              <Input
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
                placeholder="Enter Number of Employees"
                className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3">
              <div className="flex items-center text-[#0D4222] dark:text-gray-300">
                <MdOutlineDateRange size={20} className="mr-2" />
                <Label className="text-2xl font-medium">Founded</Label>
              </div>
              <Input
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
                placeholder="Enter Website"
                className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
              />
            </div>
          </div>
          <Button
            className="bg-[#148C59] w-full text-white p-2 md:p-7 rounded-2xl hover:bg-green-600"
            onClick={() => null}
          >
            Save
          </Button>
        </form>
      )}
    </MainLayout>
  );
};

export default Overview;
