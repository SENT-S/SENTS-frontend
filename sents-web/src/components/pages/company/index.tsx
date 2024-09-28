'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';

import SubNav from '../../admin/Navs/SubNav';
import { Skeleton } from '../../ui/skeleton';

import Financial from './sections/Financials';
import News from './sections/News';
import Overview from './sections/Overview';
import F_Right_Panel from './sections/panels/F_Right_Panel';
import N_Right_Panel from './sections/panels/N_Right_Panel';
import O_Right_Panel from './sections/panels/O_Right_Panel';

import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts';
import {
  getCompany,
  getCompanyNews,
  getCompanyFinancials,
  getAllFinancialDataCategories,
} from '@/utils/apiClient';

interface CompanyDetailsProps {
  params: { companyId: string };
}

const LINKS = ['Overview', 'Financials', 'News'];

const Index = ({ params }: CompanyDetailsProps) => {
  const router = useRouter();
  const [selectedLink, setSelectedLink] = useState(LINKS[0]);
  const [companyData, setCompanyData] = useState<any>({});
  const [newsData, setNewsData] = useState<any>([]);
  const [financialData, setFinancialData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<any[]>([]);

  // Fetch data for the company
  const fetchCompanyData = useCallback(async () => {
    try {
      const companyId = parseInt(params.companyId);
      const [company, news, financials, categories] = await Promise.all([
        getCompany(companyId),
        getCompanyNews(companyId),
        getCompanyFinancials(companyId),
        getAllFinancialDataCategories(),
      ]);

      setCompanyData(company);
      setNewsData(news);
      setFinancialData(financials);
      setCategory(categories);
    } catch (error) {
      console.error('Error fetching company data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [params.companyId]);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);

  const companyDetails = companyData?.company_details;

  // Render different sections based on selected link
  const renderSection = useMemo(() => {
    switch (selectedLink) {
      case 'Overview':
        return <Overview data={companyDetails} />;
      case 'Financials':
        return (
          <Financial data={companyDetails} financialData={financialData} category={category} />
        );
      case 'News':
        return <News data={newsData} />;
      default:
        return null;
    }
  }, [selectedLink, companyDetails, financialData, category, newsData]);

  // Render the right panel content based on the selected link
  const renderRightPanel = useMemo(() => {
    switch (selectedLink) {
      case 'Overview':
        return <O_Right_Panel data={companyDetails} />;
      case 'Financials':
        return <F_Right_Panel data={companyData} />;
      case 'News':
        return <N_Right_Panel />;
      default:
        return null;
    }
  }, [selectedLink, companyDetails, companyData]);

  return (
    <MainLayout>
      {isLoading ? (
        <SkeletonLayout />
      ) : (
        <>
          <Button
            variant="outline"
            className="text-green-600 gap-4 text-sm font-bold "
            onClick={() => router.push('/dashboard')}
          >
            <IoChevronBackOutline />
            Return to Dashboard
          </Button>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-4">
            <div className="xl:col-span-2 space-y-8">
              <SubNav links={LINKS} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
              <div className="rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] p-4 overflow-hidden">
                {renderSection}
              </div>
            </div>
            <div className="col-span-1 w-auto">
              <div className="w-full flex justify-center">{renderRightPanel}</div>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

// Skeleton layout component for loading state
const SkeletonLayout = React.memo(() => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
    <div className="col-span-1 lg:col-span-2 space-y-8">
      <Skeleton className="dark:text-[#E6F6F0] w-full h-16 rounded-xl bg-slate-200 p-4" />
      <Skeleton className="w-full h-[435px] rounded-xl bg-slate-200 p-4" />
    </div>
    <div className="col-span-1 w-auto">
      <div className="w-full flex flex-col space-y-8 justify-center">
        <Skeleton className="w-full h-[250px] rounded-xl bg-slate-200 p-4" />
        <Skeleton className="w-full h-[250px] rounded-xl bg-slate-200 p-4" />
      </div>
    </div>
  </div>
));

SkeletonLayout.displayName = 'SkeletonLayout';

export default Index;
