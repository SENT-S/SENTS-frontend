import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { countryList } from '@/services/mockData/mock';

const Section_1 = () => {
  const [selectedSector, setSelectedSector] = useState('Uganda');

  const handleSelectSector = (value: string) => {
    setSelectedSector(value);
  };
  return (
    <div className="space-y-8">
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0]">
        Enter Company Details
      </h2>
      <Input
        placeholder="Enter Company name"
        className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
      />
      <Input
        placeholder="Enter Stock symbol"
        className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
      />
      <Select onValueChange={handleSelectSector}>
        <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
          <SelectValue
            placeholder="Select Sector"
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
    </div>
  );
};

export default Section_1;
