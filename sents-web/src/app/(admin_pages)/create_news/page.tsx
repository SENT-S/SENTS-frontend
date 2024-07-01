'use client';
import { useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import MainLayout from '@/components/layout';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { countryList, companyList } from '@/services/mockData/mock';

const page = () => {
  const [selectedSector, setSelectedSector] = useState('Uganda');
  const [showList, setShowList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Uganda');
  const [selectedCompany, setSelectedCompany] = useState('Company');

  const handleSelectCountry = (value: string) => {
    setSelectedCountry(value);
  };

  const handleSelectCompany = (value: string) => {
    setSelectedCompany(value);
  };

  const handleSelectSector = (value: string) => {
    setSelectedSector(value);
  };

  return (
    <MainLayout>
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0] mt-4">
        Add News
      </h2>

      <div className="space-y-8">
        <div className="flex gap-6 items-center">
          <Select onValueChange={handleSelectCountry}>
            <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
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
            <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
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
        <Select onValueChange={handleSelectSector}>
          <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
            <SelectValue
              placeholder="Select Category"
              className="text-center w-full"
            >
              {selectedSector}
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
        <Input
          placeholder="Enter News URL"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <Input
          placeholder="Enter News Source"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <Input
          placeholder="Enter News Title"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <Textarea
          placeholder="Enter News Summary"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <div className="flex items-center rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-4 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white">
          <input
            type="file"
            accept="image/*"
            id="fileUpload"
            className="w-full border-none"
            style={{ display: 'none' }}
          />
          <Label
            htmlFor="fileUpload"
            className="w-full flex justify-center items-center border-none cursor-pointer"
          >
            Upload Image
            <IoImageOutline className="ml-2" size={18} />
          </Label>
        </div>
        <Button
          onClick={() => setShowList(true)}
          className="bg-[#148C59] text-white w-full px-3 py-7 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
        >
          Submit
        </Button>
      </div>
    </MainLayout>
  );
};

export default page;
