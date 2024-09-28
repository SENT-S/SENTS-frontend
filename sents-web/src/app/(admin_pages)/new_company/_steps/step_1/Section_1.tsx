import React, { useCallback } from 'react';

import { InputField, SelectField } from '../components';

import { updateCompanyField } from '@/lib/ReduxSlices/create_company';
import { useDispatch, useSelector } from '@/lib/utils';
import { countryList, sectorList } from '@/services/mockData/mock';

const Section_1 = () => {
  const dispatch = useDispatch();
  const companyFields = useSelector((state) => state.company);

  const handleInputChange = useCallback(
    (field: any, value: string) => {
      dispatch(updateCompanyField({ field, value }));
    },
    [dispatch],
  );

  return (
    <div className="space-y-8">
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0]">Enter Company Details</h2>

      {/* Company Name */}
      <InputField
        value={companyFields.company_name}
        placeholder="Enter Company Name"
        onChange={(value) => handleInputChange('company_name', value)}
      />

      {/* Stock Symbol */}
      <InputField
        value={companyFields.stock_symbol}
        placeholder="Enter Stock Symbol"
        onChange={(value) => handleInputChange('stock_symbol', value)}
      />

      {/* Country Select */}
      <SelectField
        value={companyFields.company_country}
        options={countryList}
        placeholder="Select Country"
        onChange={(value) => handleInputChange('company_country', value)}
      />

      {/* Sector Select */}
      <SelectField
        value={companyFields.sector_or_industry}
        options={sectorList}
        placeholder="Select Sector"
        onChange={(value) => handleInputChange('sector_or_industry', value)}
      />
    </div>
  );
};

export default Section_1;
