'use strict';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MdOutlineCloudUpload } from 'react-icons/md';

const AddNewStatement = () => {
  return (
    <div className="space-y-3">
      <Input
        placeholder="Enter Document Name"
        className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
      />
      <div className="flex items-center rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-4 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white">
        <input
          type="file"
          accept=".pdf,.xlsx,.xls,.doc,.docx"
          id="fileUpload"
          className="w-full border-none"
          style={{ display: 'none' }}
        />
        <Label
          htmlFor="fileUpload"
          className="w-full border-none cursor-pointer"
        >
          Upload document
        </Label>
        <MdOutlineCloudUpload className="ml-0" size={18} />
      </div>
    </div>
  );
};

export default AddNewStatement;
