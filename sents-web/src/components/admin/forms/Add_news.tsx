'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const countryList = [
  { label: 'Uganda', value: 'Uganda' },
  { label: 'Kenya', value: 'Kenya' },
  { label: 'Tanzania', value: 'Tanzania' },
  { label: 'Rwanda', value: 'Rwanda' },
];

const AddNewsForm = ({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent) => void;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Select Country
          <select name="country">{/* Options go here */}</select>
        </label>
      </div>
      <div>
        <label>
          Upload Icon
          <input type="file" name="icon" />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddNewsForm;
