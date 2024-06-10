import { useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { countryList } from '@/services/mockData/mock';

const Step_3 = () => {
  const [selectedSector, setSelectedSector] = useState('Uganda');

  const handleSelectSector = (value: string) => {
    setSelectedSector(value);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0]">
        Add News
      </h2>
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
    </div>
  );
};

export default Step_3;
