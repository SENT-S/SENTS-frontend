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

const countryList = [
  { label: 'Uganda', value: 'Uganda' },
  { label: 'Kenya', value: 'Kenya' },
  { label: 'Tanzania', value: 'Tanzania' },
  { label: 'Rwanda', value: 'Rwanda' },
];

const companyList = [
  { label: 'Company', value: 'Company' },
  { label: 'Company 1', value: 'Company 1' },
  { label: 'Company 2', value: 'Company 2' },
  { label: 'Company 3', value: 'Company 3' },
];

const Overview = () => {
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
      <form className="space-y-8">
        <div className="text-2xl font-medium text-[#0D4222] dark:text-[#E6F6F0] text-left">
          Overview
        </div>
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
          <Label className="text-2xl font-medium">About</Label>
          <Textarea
            placeholder="About"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-3">
            <Label className="text-2xl font-medium">CEO</Label>
            <Input
              placeholder="Enter CEO Name"
              className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-2xl font-medium">Employees</Label>
            <Input
              placeholder="Enter Number of Employees"
              className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-3">
            <Label className="text-2xl font-medium">Founded</Label>
            <Input
              placeholder="Enter Founded Year"
              className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-2xl font-medium">Website</Label>
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
    </MainLayout>
  );
};

export default Overview;
