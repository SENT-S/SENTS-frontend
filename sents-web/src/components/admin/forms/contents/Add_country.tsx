'use client';
import React from 'react';
import { Label } from '@/components/ui/label';
import { IoImageOutline } from 'react-icons/io5';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddCountryProps {
  handleSelectCountry: (value: string) => void;
  selectedCountry: string;
  countryList: { label: string; value: string }[];
}

const AddCountryForm = ({
  countryList,
  handleSelectCountry,
  selectedCountry,
}: AddCountryProps) => {
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

export default AddCountryForm;
