'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { MdOutlineCloudUpload } from 'react-icons/md';

import { Input } from './input';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { fieldOptions } from '@/utils/validations';

interface CustomModalFieldProps {
  label?: string;
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  fieldType?: string;
  acceptedTypes?: string;
}

const CustomModalField: React.FC<CustomModalFieldProps> = ({
  label,
  name,
  placeholder,
  type = 'text',
  autoComplete = 'off',
  fieldType = fieldOptions.INPUT,
  acceptedTypes,
}) => {
  const { control } = useFormContext();

  const renderField = (fieldType: string, field: any) => {
    switch (fieldType) {
      case fieldOptions.TEXTAREA:
        return (
          <Textarea
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] max-h-[150px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
            placeholder={placeholder}
            {...field}
          />
        );

      case fieldOptions.FILE:
        return (
          <div className="flex relative items-center rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-3 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white">
            <Input
              type="file"
              accept={acceptedTypes}
              id={name}
              className="w-full border-none cursor-pointer hidden"
              onChange={(e) => {
                const file = e.target?.files?.[0];
                if (file) {
                  field.onChange(file);
                }
              }}
            />
            <FormLabel htmlFor={name} className="w-full border-none cursor-pointer">
              {field.value ? field.value.name : placeholder}
            </FormLabel>
            <MdOutlineCloudUpload className="ml-0 absolute right-2" size={18} />
          </div>
        );

      case fieldOptions.INPUT:
      default:
        return (
          <Input
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] px-3 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
            placeholder={placeholder}
            type={type}
            autoComplete={autoComplete}
            {...field}
          />
        );
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className="text-black dark:text-white">{label}</FormLabel>}
          <FormControl className="relative">{renderField(fieldType, field)}</FormControl>
          <FormMessage className="text-red-500 dark:text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default CustomModalField;
