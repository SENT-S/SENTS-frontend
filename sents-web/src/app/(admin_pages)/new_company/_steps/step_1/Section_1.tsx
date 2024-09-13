import { useCallback } from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateCompanyField } from '@/lib/ReduxSlices/create_company';
import { useDispatch, useSelector } from '@/lib/utils';
import { countryList, sectorList } from '@/services/mockData/mock';

const Section_1 = () => {
  const dispatch = useDispatch();
  const companyFields = useSelector((state) => state.company);

  const handleInputChange = useCallback(
    (field: any, value: any) => {
      dispatch(updateCompanyField({ field, value }));
    },
    [dispatch],
  );

  return (
    <div className="space-y-8">
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0]">Enter Company Details</h2>
      <Input
        type="text"
        value={companyFields.company_name}
        placeholder="Enter Company name"
        onChange={(e) => handleInputChange('company_name', e.target.value)}
        className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
      />
      <Input
        type="text"
        value={companyFields.stock_symbol}
        onChange={(e) => handleInputChange('stock_symbol', e.target.value)}
        placeholder="Enter Stock symbol"
        className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
      />
      <Select
        onValueChange={(value) => handleInputChange('company_country', value)}
        value={companyFields.company_country}
      >
        <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
          <SelectValue placeholder="Select Country" className="text-center w-full">
            {companyFields.company_country}
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
      <Select
        onValueChange={(value) => handleInputChange('sector_or_industry', value)}
        value={companyFields.sector_or_industry}
      >
        <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
          <SelectValue placeholder="Select Sector" className="text-center w-full">
            {companyFields.sector_or_industry}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
          {sectorList.map((item, index) => (
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
