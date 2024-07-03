'use client';
import { useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import MainLayout from '@/layouts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { countryList, companyList } from '@/services/mockData/mock';
import {
  updateNewsField,
  resetNewsFields,
} from '@/lib/ReduxSlices/create_news';
import { useDispatch, useSelector } from '@/lib/utils';

const page = () => {
  const dispatch = useDispatch();
  const newsFields = useSelector(state => state.news);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    dispatch(updateNewsField({ field: 'image', value: file }));
  };

  const handleInputChange = (field: any, value: any) => {
    dispatch(updateNewsField({ field, value }));
  };

  const handleSubmit = () => {
    alert('News Submitted');
    dispatch(resetNewsFields());
  };

  return (
    <MainLayout>
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0] mt-4">
        Add News
      </h2>

      <div className="space-y-8">
        <div className="flex gap-6 items-center">
          <Select
            onValueChange={(value: string) =>
              handleInputChange('country', value)
            }
            value={newsFields.country}
          >
            <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
              <SelectValue
                placeholder="Select Country"
                className="text-center w-full"
              >
                {newsFields.country}
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
            onValueChange={(value: string) =>
              handleInputChange('company', value)
            }
            value={newsFields.company}
          >
            <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
              <SelectValue
                placeholder="Select Company"
                className="text-center w-full"
              >
                {newsFields.company}
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
        </div>
        <Select
          onValueChange={(value: string) =>
            handleInputChange('category', value)
          }
          value={newsFields.category}
        >
          <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
            <SelectValue
              placeholder="Select Category"
              className="text-center w-full"
            >
              {newsFields.category}
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
          type="url"
          value={newsFields.news_url}
          onChange={e => handleInputChange('news_url', e.target.value)}
          placeholder="Enter News URL"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <Input
          type="text"
          value={newsFields.news_source}
          onChange={e => handleInputChange('news_source', e.target.value)}
          placeholder="Enter News Source"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <Input
          type="text"
          value={newsFields.news_title}
          onChange={e => handleInputChange('news_title', e.target.value)}
          placeholder="Enter News Title"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <Textarea
          value={newsFields.news_summary}
          onChange={e => handleInputChange('news_summary', e.target.value)}
          placeholder="Enter News Summary"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <div className="flex items-center rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-4 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white">
          <Input
            type="file"
            accept="image/*"
            id="fileUpload"
            className="w-full border-none hidden"
            onChange={handleFileChange}
          />
          <Label
            htmlFor="fileUpload"
            className="w-full flex justify-center items-center border-none cursor-pointer"
          >
            {newsFields.image ? newsFields.image.name : 'Upload Image'}
            <IoImageOutline className="ml-2" size={18} />
          </Label>
        </div>
        <Button
          onClick={handleSubmit}
          className="bg-[#148C59] text-white w-full px-3 py-7 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
        >
          Submit
        </Button>
      </div>
    </MainLayout>
  );
};

export default page;
