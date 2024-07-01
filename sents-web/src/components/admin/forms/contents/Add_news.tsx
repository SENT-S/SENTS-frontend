import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoImageOutline } from 'react-icons/io5';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddNewsProps {
  handleSelectCountry: (value: string) => void;
  handleSelectCategory: (value: string) => void;
  selectedCountry: string;
  selectedCategory: string;
  Categories: string[];
  countryList: { label: string; value: string }[];
  companyList: { label: string; value: string }[];
}

export const Add_news = ({
  Categories,
  countryList,
  companyList,
  handleSelectCountry,
  handleSelectCategory,
  selectedCountry,
  selectedCategory,
}: AddNewsProps) => {
  return (
    <div className="space-y-3">
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
      <Select onValueChange={handleSelectCountry}>
        <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
          <SelectValue
            placeholder="Select Company"
            className="text-center w-full"
          >
            {selectedCountry}
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
      <Select onValueChange={handleSelectCategory}>
        <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
          <SelectValue
            placeholder="Select Company"
            className="text-center w-full"
          >
            {selectedCategory}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
          {Categories.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Enter New URL"
        className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
      />
      <Input
        placeholder="Enter News Source"
        className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
      />
      {/* image input */}
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
          className="w-full border-none cursor-pointer"
        >
          Upload Image
        </Label>
        <IoImageOutline className="ml-0" size={18} />
      </div>
    </div>
  );
};

export default Add_news;
