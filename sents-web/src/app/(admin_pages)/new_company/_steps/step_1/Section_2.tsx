import React, { useCallback } from 'react';
import { HiOutlineUsers, HiOutlineUser } from 'react-icons/hi2';
import { MdOutlineDateRange, MdOutlineWebAsset } from 'react-icons/md';

import { TextAreaField, IconInputField } from '../components';

import { updateCompanyField } from '@/lib/ReduxSlices/create_company';
import { useDispatch, useSelector } from '@/lib/utils';

const Section_2 = () => {
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
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0]">Overview</h2>

      {/* About Company */}
      <TextAreaField
        value={companyFields.about_company}
        placeholder="About"
        label="About"
        onChange={(value) => handleInputChange('about_company', value)}
      />

      {/* Mission & Vision Statements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <TextAreaField
          value={companyFields.mission_statement}
          placeholder="Mission Statement"
          label="Mission Statement"
          onChange={(value) => handleInputChange('mission_statement', value)}
        />
        <TextAreaField
          value={companyFields.vision_statement}
          placeholder="Vision Statement"
          label="Vision Statement"
          onChange={(value) => handleInputChange('vision_statement', value)}
        />
      </div>

      {/* CEO & Employees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <IconInputField
          value={companyFields.ceo}
          placeholder="Enter CEO Name"
          label="CEO"
          icon={<HiOutlineUser size={20} />}
          onChange={(value) => handleInputChange('ceo', value)}
        />
        <IconInputField
          value={String(companyFields.number_of_employees)}
          placeholder="Enter Number of Employees"
          label="Employees"
          type="number"
          icon={<HiOutlineUsers size={20} />}
          onChange={(value) => handleInputChange('number_of_employees', value)}
        />
      </div>
      {/* Founded & Website */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <IconInputField
          value={String(companyFields.year_founded)}
          placeholder="Enter Founded Year"
          label="Founded"
          type="number"
          icon={<MdOutlineDateRange size={20} />}
          onChange={(value) => handleInputChange('year_founded', value)}
        />
        <IconInputField
          value={companyFields.website_url}
          placeholder="Enter Website"
          label="Website"
          type="url"
          icon={<MdOutlineWebAsset size={20} />}
          onChange={(value) => handleInputChange('website_url', value)}
        />
      </div>
    </div>
  );
};

export default Section_2;
