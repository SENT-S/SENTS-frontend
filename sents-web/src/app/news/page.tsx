'use client';
import React, { useState, useEffect, useMemo } from 'react';
import MainLayout from '@/layouts';
import SubNav from '@/components/navigation/SubNav';
import TopNews from './_sections/TopNews';
import News from './_sections/News';
import Events from './_sections/Events';
import Resources from './_sections/Resources';
import { Button } from '@/components/ui/button';
import Teams from './_sections/Teams';
import { getAllCompanyNews } from '@/services/apis/companies';
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
import { countryList, companyList } from '@/services/mockData/mock';

const Categories = ['Top News', 'News', 'Events', 'Resources', 'Teams'];

const NewsPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  const [newsData, setNewsData] = useState<any[]>([]);
  const [selectedLink, setSelectedLink] = useState<any>(Categories[0]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = session?.user?.role === 'ADMIN';
  const [selectedCountry, setSelectedCountry] = useState('Uganda');
  const [selectedCompany, setSelectedCompany] = useState('Company');
  const [selectedCategory, setSelectedCategory] = useState('News');
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [selectedIds, setSelectedIds] = useState([] as string[]);

  useEffect(() => {
    const fetchNews = async () => {
      if (session?.token) {
        const response = await getAllCompanyNews(session.token);
        if (response.status === 200) {
          setNewsData(response.data);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch news', response);
        }
      }
    };

    fetchNews();
  }, [session]);

  // Get the news data for the selected link
  const selectedNewsData = useMemo(
    () => newsData[selectedLink],
    [newsData, selectedLink],
  );

  const handleSelectCategory = (value: string) => {
    setSelectedCategory(value);
  };

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
              <Select onValueChange={handleSelectCountry}>
                <SelectTrigger className="md:w-[280px] rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#8D9D93]">
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
              <Select onValueChange={handleSelectCompany}>
                <SelectTrigger className="md:w-[280px] rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#8D9D93]">
                  <SelectValue
                    placeholder="Select Country"
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
          )}

          {/* Nav */}
          <div>
            <SubNav
              links={Categories}
              selectedLink={selectedLink}
              setSelectedLink={setSelectedLink}
            />
          </div>

          <div className="rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] p-4 overflow-hidden">
            {selectedLink === 'Top News' && (
              <TopNews
                data={selectedNewsData}
                showCheckbox={showCheckbox}
                selectedIDs={selectedIds}
                onCheckboxChange={(id: string, checked: boolean) => {
                  if (checked) {
                    setSelectedIds([...selectedIds, id]);
                  } else {
                    setSelectedIds(selectedIds.filter(item => item !== id));
                  }
                }}
              />
            )}
            {selectedLink === 'News' && (
              <News
                data={selectedNewsData}
                showCheckbox={showCheckbox}
                selectedIDs={selectedIds}
                onCheckboxChange={(id: string, checked: boolean) => {
                  if (checked) {
                    setSelectedIds([...selectedIds, id]);
                  } else {
                    setSelectedIds(selectedIds.filter(item => item !== id));
                  }
                }}
              />
            )}
            {selectedLink === 'Events' && (
              <Events
                data={selectedNewsData}
                showCheckbox={showCheckbox}
                selectedIDs={selectedIds}
                onCheckboxChange={(id: string, checked: boolean) => {
                  if (checked) {
                    setSelectedIds([...selectedIds, id]);
                  } else {
                    setSelectedIds(selectedIds.filter(item => item !== id));
                  }
                }}
              />
            )}
            {selectedLink === 'Resources' && (
              <Resources
                data={selectedNewsData}
                showCheckbox={showCheckbox}
                selectedIDs={selectedIds}
                onCheckboxChange={(id: string, checked: boolean) => {
                  if (checked) {
                    setSelectedIds([...selectedIds, id]);
                  } else {
                    setSelectedIds(selectedIds.filter(item => item !== id));
                  }
                }}
              />
            )}
            {selectedLink === 'Teams' && (
              <Teams
                data={selectedNewsData}
                showCheckbox={showCheckbox}
                selectedIDs={selectedIds}
                onCheckboxChange={(id: string, checked: boolean) => {
                  if (checked) {
                    setSelectedIds([...selectedIds, id]);
                  } else {
                    setSelectedIds(selectedIds.filter(item => item !== id));
                  }
                }}
              />
            )}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default NewsPage;
