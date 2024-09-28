'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import CustomBackButton from '@/components/ui/customBackButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import MainLayout from '@/layouts';
import { newsCategoryList } from '@/services/mockData/mock';
import { addFinancialNews, getAllCompanies } from '@/utils/apiClient';
import { CompanyType } from '@/utils/types';

const Page = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newsImage, setNewsImage] = useState<File | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('Uganda');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [newsSource, setNewsSource] = useState('');
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSummary, setNewsSummary] = useState('');

  // Fetch and set companies data
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Set country list from fetched companies
  const countryList = Array.from(new Set(companies.map((company) => company.company_country))).map(
    (country) => ({
      label: country,
      value: country,
    }),
  );

  // Set company list based on selected country
  const companyList = companies
    .filter((company) => company.company_country === selectedCountry)
    .flatMap((filteredCompany) =>
      filteredCompany.list_of_companies.map((company) => ({
        label: company.company_name,
        value: company.id.toString(),
      })),
    );

  // Handle file change for news image
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setNewsImage(file);
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !selectedCountry ||
      !selectedCompany ||
      !selectedCategory ||
      !newsUrl ||
      !newsSource ||
      !newsTitle ||
      !newsSummary
    ) {
      toast.info('Please enter all required fields', {
        position: 'top-center',
      });
      return;
    }

    // Construct the data object
    const data = {
      country: selectedCountry,
      company: parseInt(selectedCompany, 10), // Convert company ID to a number
      news_category: selectedCategory,
      link_to_news_page: newsUrl,
      news_source: newsSource,
      headline: newsTitle,
      short_description: newsSummary,
      newsImage,
    };

    setLoading(true);
    console.info('Data to be sent:', data);
    try {
      const response = await addFinancialNews(data);

      if (response.status === 201) {
        toast.success('News added successfully', {
          position: 'top-center',
        });
        // clear the state
        setSelectedCompany('');
        setSelectedCategory('');
        setNewsUrl('');
        setNewsSource('');
        setNewsTitle('');
        setNewsSummary('');
        setNewsImage(null);
      } else {
        throw new Error('Failed to add news. Please check your inputs and try again.');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <CustomBackButton onClick={() => router.back()} />
      </div>

      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0] mt-4">Add News</h2>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(7)].map((_, index) => (
            <Skeleton
              key={index}
              className="w-full p-7 rounded-xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex gap-6 items-center">
            <Select
              onValueChange={(value) => setSelectedCountry(value)}
              value={selectedCountry}
              defaultValue={selectedCountry}
            >
              <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
                <SelectValue placeholder="Select Country" className="text-center w-full" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
                {countryList.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={setSelectedCompany}
              value={selectedCompany}
              defaultValue={selectedCompany}
            >
              <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
                <SelectValue placeholder="Select Company" className="text-center w-full" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
                {companyList.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select onValueChange={setSelectedCategory} value={selectedCategory}>
            <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
              <SelectValue placeholder="Select Category" className="text-center w-full" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
              {newsCategoryList.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="url"
            name="link_to_news_page"
            placeholder="Enter News URL"
            value={newsUrl}
            onChange={(e) => setNewsUrl(e.target.value)}
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
          <Input
            type="text"
            name="news_source"
            placeholder="Enter News Source"
            value={newsSource}
            onChange={(e) => setNewsSource(e.target.value)}
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
          <Input
            type="text"
            name="headline"
            placeholder="Enter News Title"
            value={newsTitle}
            onChange={(e) => setNewsTitle(e.target.value)}
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
          <Textarea
            name="short_description"
            placeholder="Enter News Summary"
            value={newsSummary}
            onChange={(e) => setNewsSummary(e.target.value)}
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
          <div className="flex items-center rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-4 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white">
            <Input
              type="file"
              accept="image/*"
              id="fileUpload"
              name="newsImage"
              className="hidden"
              onChange={handleFileChange}
            />
            <Label
              htmlFor="fileUpload"
              className="w-full flex justify-center items-center cursor-pointer"
            >
              {newsImage ? newsImage.name : 'Upload Image'}
              <IoImageOutline className="ml-2" size={18} />
            </Label>
          </div>
          <Button
            type="submit"
            className="bg-[#148C59] text-white w-full px-3 py-7 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
            disabled={loading}
          >
            {loading ? <ScaleLoader height={20} color="#fff" /> : 'Submit'}
          </Button>
        </form>
      )}
    </MainLayout>
  );
};

export default Page;
