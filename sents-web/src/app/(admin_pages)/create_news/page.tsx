'use client';
import { useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import MainLayout from '@/layouts';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { countryList, companyList } from '@/services/mockData/mock';
import { IoArrowBack } from 'react-icons/io5';

const page = () => {
  const router = useRouter();
  const [news_image, setNewsImage] = useState<File | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setNewsImage(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (news_image) {
      const data = Object.fromEntries(formData.entries());
      data.news_image = news_image;
      console.log('Form Data:', data);
    }

    // clear form after
    e.currentTarget.reset();
    setNewsImage(null);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          className="ml-3"
          onClick={() => router.back()}
        >
          <IoArrowBack />
        </Button>
      </div>

      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0] mt-4">
        Add News
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex gap-6 items-center">
          <Select
            onValueChange={value => setSelectedCountry(value)}
            name="country"
          >
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
          <Select
            onValueChange={value => setSelectedCompany(value)}
            name="company"
          >
            <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
              <SelectValue
                placeholder="Select Company"
                className="text-center w-full"
              >
                {selectedCompany}
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
          onValueChange={value => setSelectedCategory(value)}
          name="category"
        >
          <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
            <SelectValue
              placeholder="Select Category"
              className="text-center w-full"
            >
              {selectedCategory}
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
          name="news_url"
          placeholder="Enter News URL"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <Input
          type="text"
          name="news_source"
          placeholder="Enter News Source"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <Input
          type="text"
          name="news_title"
          placeholder="Enter News Title"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <Textarea
          name="news_summary"
          placeholder="Enter News Summary"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <div className="flex items-center rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-4 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white">
          <Input
            type="file"
            accept="image/*"
            id="fileUpload"
            name="news_image"
            className="w-full border-none hidden"
            onChange={handleFileChange}
          />
          <Label
            htmlFor="fileUpload"
            className="w-full flex justify-center items-center border-none cursor-pointer"
          >
            {news_image ? news_image.name : 'Upload Image'}
            <IoImageOutline className="ml-2" size={18} />
          </Label>
        </div>
        <Button
          type="submit"
          className="bg-[#148C59] text-white w-full px-3 py-7 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
        >
          Submit
        </Button>
      </form>
    </MainLayout>
  );
};

export default page;
