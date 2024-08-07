'use client';
import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '@/layouts';
import { Button } from '@/components/ui/button';
import { getAllCompanyNews, getCompanies } from '@/services/apis/companies';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';
import { CustomSession } from '@/utils/types';
import { RxPlus } from 'react-icons/rx';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ModalForms from '@/components/admin/modal';
import { CompanyType } from '@/utils/types';
import Pagination from '@/components/pagination';

const SubNav = dynamic(() => import('@/components/admin/Navs/SubNav'));
const TopNews = dynamic(() => import('./_sections/TopNews'));
const News = dynamic(() => import('./_sections/News'));
const Events = dynamic(() => import('./_sections/Events'));
const Resources = dynamic(() => import('./_sections/Resources'));
const Teams = dynamic(() => import('./_sections/Teams'));

const Categories = ['Top News', 'News', 'Events', 'Resources', 'Teams'];

const NewsPage = () => {
  const router = useRouter();
  const { data: session } = useSession() as {
    data: CustomSession;
  };
  const [newsData, setNewsData] = useState<any[]>([]);
  const [selectedLink, setSelectedLink] = useState<any>(Categories[0]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = session?.user?.role === 'ADMIN';
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [countryList, setCountryList] = useState<
    { label: string; value: string }[]
  >([]);
  const [companyList, setCompanyList] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [selectedIds, setSelectedIds] = useState([] as string[]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [newsResponse, companiesResponse] = await Promise.all([
          getAllCompanyNews(),
          getCompanies(),
        ]);

        if (newsResponse.status === 200) {
          setNewsData(newsResponse.data);
        } else {
          console.error('Failed to fetch news', newsResponse);
        }

        if (companiesResponse.status === 200) {
          setCompanies(companiesResponse.data);
        } else {
          console.error('Failed to fetch companies', companiesResponse);
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Generate country list from companies
    const countries = companies.map((company: any) => ({
      label: company.company_country,
      value: company.company_country,
    }));
    setCountryList(countries);

    // Set selected country to the first country in the list
    if (countries.length > 0) {
      setSelectedCountry(prevCountry => prevCountry || countries[0].label);
    }
  }, [companies]);

  useEffect(() => {
    // Filter companies by selected country
    const filteredCompanies = companies.filter(
      company => company.company_country === selectedCountry,
    )[0];
    if (filteredCompanies) {
      const companiesList = filteredCompanies.list_of_companies.map(
        (company: any) => ({
          label: company.company_name,
          value: company.id,
        }),
      );
      setCompanyList(companiesList);
    }
  }, [selectedCountry]);

  // Get the news data for the selected link
  const selectedNewsData = useMemo(() => {
    // Get news data by selected link
    const newsByLink = newsData[selectedLink];

    // Check if newsByLink is defined
    if (!newsByLink) {
      console.error('Invalid selected link:', selectedLink);
      return [];
    }

    // Filter news data by selected company
    if (selectedCompany) {
      return newsByLink.filter(
        (news: any) => news.company_name === selectedCompany,
      );
    } else {
      return newsByLink;
    }
  }, [newsData, selectedLink, selectedCompany]);

  const handleSelectCountry = (value: string) => {
    setSelectedCountry(value);
  };

  const handleSelectCompany = (value: string) => {
    setSelectedCompany(value);
  };

  const handleDeleteNews = () => {
    setShowCheckbox(false);
    setSelectedIds([]);
  };

  const handleCancelDeleteNews = () => {
    setShowCheckbox(false);
    setSelectedIds([]);
  };

  const handleCreateNews = () => {
    router.push('/create_news');
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(item => item !== id));
    }
  };

  return (
    <MainLayout>
      {isLoading ? (
        <>
          <Skeleton className="w-full p-8 rounded-2xl bg-slate-200" />
          <Skeleton className="w-full h-60 rounded-2xl bg-slate-200" />
        </>
      ) : (
        <>
          {/* Admin features */}
          {isAdmin && (
            <h1 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">
              News
            </h1>
          )}

          {/* Admin features */}
          {isAdmin && (
            <div className="flex justify-between items-center">
              <Button
                className="bg-[#39463E] flex items-center text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#39463ed9] hover:text-white"
                onClick={handleCreateNews}
              >
                Create new News
                <RxPlus className="ml-3" size={18} />
              </Button>

              {showCheckbox ? (
                <ModalForms
                  ButtonText="Delete News"
                  FormTitle="Are you sure you want to delete the selected news?"
                  ButtonStyle="bg-[#EA0000] text-white hover:bg-[#EA0000]"
                  Icon={<RiDeleteBin6Line className="ml-3" size={18} />}
                  onSubmit={handleDeleteNews}
                  onCancel={handleCancelDeleteNews}
                  SubmitText="Yes"
                  CancelText="No"
                  SubmitButtonStyle="bg-[#EA0000]"
                />
              ) : (
                <Button
                  className="bg-[#F5ECEC] text-[#EA0000] p-2 md:p-7 rounded-2xl hover:bg-[#f5e5e5] hover:text-[39463E]"
                  onClick={() => setShowCheckbox(true)}
                  disabled={true}
                >
                  Delete News
                  <RiDeleteBin6Line className="ml-3" size={18} />
                </Button>
              )}
            </div>
          )}

          {/* Admin features */}
          {isAdmin && (
            <div className="flex gap-6 items-center">
              {/* button for all this clears the selected company */}
              <Button
                type="button"
                className="bg-[#39463E] text-white px-4 py-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#39463ed9] hover:text-white"
                onClick={() => setSelectedCompany('')}
              >
                All
              </Button>
              <Select
                onValueChange={handleSelectCountry}
                value={selectedCountry}
                defaultValue={selectedCountry}
              >
                <SelectTrigger className="md:w-[280px] rounded-2xl p-2 md:p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#8D9D93]">
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
                onValueChange={handleSelectCompany}
                value={selectedCompany}
                defaultValue={selectedCompany}
              >
                <SelectTrigger className="md:w-[280px] rounded-2xl p-2 md:p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#8D9D93]">
                  <SelectValue
                    placeholder="Select Company"
                    className="text-center w-full"
                  >
                    {selectedCompany}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
                  {companyList.map((item, index) => (
                    <SelectItem key={index} value={item.label}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Nav */}
          <div>
            <SubNav
              links={Categories}
              selectedLink={selectedLink}
              setSelectedLink={setSelectedLink}
            />
          </div>

          <Pagination
            items={selectedNewsData}
            itemsPerPage={4}
            render={currentItems => (
              <div className="rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] p-4 overflow-hidden">
                {selectedLink === 'Top News' && (
                  <TopNews
                    data={currentItems}
                    showCheckbox={showCheckbox}
                    selectedIDs={selectedIds}
                    onCheckboxChange={handleCheckboxChange}
                  />
                )}
                {selectedLink === 'News' && (
                  <News
                    data={currentItems}
                    showCheckbox={showCheckbox}
                    selectedIDs={selectedIds}
                    onCheckboxChange={handleCheckboxChange}
                  />
                )}
                {selectedLink === 'Events' && (
                  <Events
                    data={currentItems}
                    showCheckbox={showCheckbox}
                    selectedIDs={selectedIds}
                    onCheckboxChange={handleCheckboxChange}
                  />
                )}
                {selectedLink === 'Resources' && (
                  <Resources
                    data={currentItems || []}
                    showCheckbox={showCheckbox}
                    selectedIDs={selectedIds}
                    onCheckboxChange={handleCheckboxChange}
                  />
                )}
                {selectedLink === 'Teams' && (
                  <Teams
                    data={currentItems}
                    showCheckbox={showCheckbox}
                    selectedIDs={selectedIds}
                    onCheckboxChange={handleCheckboxChange}
                  />
                )}
              </div>
            )}
          />
        </>
      )}
    </MainLayout>
  );
};

export default NewsPage;
