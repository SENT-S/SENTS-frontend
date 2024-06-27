import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { HiOutlineUsers } from 'react-icons/hi2';
import { HiOutlineUser } from 'react-icons/hi2';
import { MdOutlineDateRange } from 'react-icons/md';
import { MdOutlineWebAsset } from 'react-icons/md';

const Step_2 = () => {
  return (
    <div>
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0]">
        Overview
      </h2>
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="text-left text-[#0D4222] dark:text-gray-300">
            <Label className="text-2xl font-medium">About</Label>
          </div>
          <Textarea
            placeholder="About"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-3">
            <div className="text-left text-[#0D4222] dark:text-gray-300">
              <Label className="text-2xl font-medium">Mission Statement</Label>
            </div>
            <Textarea
              placeholder="Mission Statement"
              className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
            />
          </div>
          <div className="space-y-3">
            <div className="text-left text-[#0D4222] dark:text-gray-300">
              <Label className="text-2xl font-medium">Vision Statement</Label>
            </div>
            <Textarea
              placeholder="Vision Statement"
              className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
            />
          </div>
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
      </div>
    </div>
  );
};

export default Step_2;
