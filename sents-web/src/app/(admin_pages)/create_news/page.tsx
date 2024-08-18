'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
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
import { addFinancialNews } from '@/utils/apiClient';
import { getAllCompanies } from '@/utils/apiClient';
import { CompanyType } from '@/utils/types';

const Page = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newsImage, setNewsImage] = useState<File | null>(null);
  const [countryList, setCountryList] = useState<{ label: string; value: any }[]>([]);
  const [companyList, setCompanyList] = useState<{ label: string; value: any }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCompaniesUpdate = useCallback((updatedCompanies: any) => {
    setCompanies((prevCompanies) => {
      if (JSON.stringify(prevCompanies) !== JSON.stringify(updatedCompanies)) {
        return updatedCompanies;
      }
      return prevCompanies;
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getAllCompanies()
      .then((data) => handleCompaniesUpdate(data))
      .catch((error) => console.error('Error fetching companies:', error));
  }, [handleCompaniesUpdate]);

  useEffect(() => {
    const countries = companies.map((company) => ({
      label: company.company_country,
      value: company.company_country,
    }));
    setCountryList(countries);

    if (countries.length > 0) {
      setSelectedCountry((prevCountry) => prevCountry || countries[0].label);
    }
  }, [companies]);

  useEffect(() => {
    const filteredCompanies = companies.find(
      (company) => company.company_country === selectedCountry,
    );
    if (filteredCompanies) {
      const companiesList = filteredCompanies.list_of_companies.map((company) => ({
        label: company.company_name,
        value: company.id,
      }));
      setCompanyList(companiesList);
    }
  }, [selectedCountry, companies]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setNewsImage(file);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const selectedCompanyID = companyList.find(
        (company) => company.label === selectedCompany,
      )?.value;

      data.company = selectedCompanyID || '';

      setLoading(true);

      try {
        const response = await addFinancialNews(data);

        if (response.status === 201) {
          form.reset();
          setNewsImage(null);

          toast.success('News added successfully', {
            style: {
              background: 'green',
              color: 'white',
              border: 'none',
            },
            position: 'top-center',
            duration: 5000,
          });
        } else {
          const errors = response.error;
          let errorMessage = '';
          for (const key in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, key)) {
              errors[key].forEach((error: string) => {
                errorMessage += `${key}: ${error}\n`;
              });
            }
          }
          throw new Error(errorMessage);
        }
      } catch (error: any) {
        toast.error(error.message || 'An error occurred', {
          style: { background: 'red', color: 'white', border: 'none' },
          duration: 5000,
          position: 'top-center',
        });
      } finally {
        setLoading(false);
      }
    },
    [companyList, selectedCompany],
  );

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <CustomBackButton onClick={() => router.back()} />
      </div>

      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0] mt-4">Add News</h2>

      {isLoading ? (
        <div className="space-y-4">
          <div className="gap-4 flex">
            {[...Array(2)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-full p-7 rounded-xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
          {[...Array(5)].map((_, index) => (
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
              name="country"
              value={selectedCountry}
              defaultValue={selectedCountry}
            >
              <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
                <SelectValue placeholder="Select Country" className="text-center w-full">
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
              onValueChange={(item) => {
                setSelectedCompany(item);
              }}
              name="company"
              value={selectedCompany}
              defaultValue={selectedCompany}
            >
              <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
                <SelectValue placeholder="Select Company" className="text-center w-full">
                  {selectedCompany}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
                {companyList.map((item: any) => (
                  <SelectItem key={item.value} value={item.label}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select onValueChange={(value) => setSelectedCategory(value)} name="news_category">
            <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
              <SelectValue placeholder="Select Category" className="text-center w-full">
                {selectedCategory}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
              {newsCategoryList.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="url"
            name="link_to_news_page"
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
            name="headline"
            placeholder="Enter News Title"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
          <Textarea
            name="short_description"
            placeholder="Enter News Summary"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
          <div className="flex items-center rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-4 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white">
            <Input
              type="file"
              accept="image/*"
              id="fileUpload"
              name="newsImage"
              className="w-full border-none hidden"
              onChange={handleFileChange}
            />
            <Label
              htmlFor="fileUpload"
              className="w-full flex justify-center items-center border-none cursor-pointer"
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
