'use client';
import React, { useState, useEffect, useCallback } from 'react';

import SubNav from '../../admin/Navs/SubNav';
import { Skeleton } from '../../ui/skeleton';

import Financial from './sections/Financials';
import News from './sections/News';
import Overview from './sections/Overview';
import F_Right_Panel from './sections/panels/F_Right_Panel';
import N_Right_Panel from './sections/panels/N_Right_Panel';
import O_Right_Panel from './sections/panels/O_Right_Panel';

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

const links = ['Overview', 'Financials', 'News'];

function Index({ params }: CompanyDetailsProps) {
  const [selectedLink, setSelectedLink] = useState(links[0]);
  const [companyData, setCompanyData] = useState<any>({});
  const [newsData, setNewsData] = useState<any>([]);
  const [financialData, setFinancialData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<any[]>([]);

  const fetchCompanies = useCallback(async () => {
    try {
      const companyId = parseInt(params.companyId);
      const [response, newsResponse, financialResponse, categoryResponse] = await Promise.all([
        getCompany(companyId),
        getCompanyNews(companyId),
        getCompanyFinancials(companyId),
        getAllFinancialDataCategories(),
      ]);

      setCompanyData(response);
      setNewsData(newsResponse);
      setFinancialData(financialResponse);
      setCategory(categoryResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [params.companyId]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const companyDetails = companyData?.company_details;

  const renderSection = useCallback(() => {
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

  return (
    <MainLayout>
      {isLoading ? (
        <SkeletonLayout />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-4">
          <div className="xl:col-span-2 space-y-8">
            <SubNav links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
            <div className="rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] p-4 overflow-hidden">
              {renderSection()}
            </div>
          </div>
          <div className="col-span-1 w-auto">
            <div className="w-full flex justify-center">
              {selectedLink === 'Overview' && <O_Right_Panel data={companyDetails} />}
              {selectedLink === 'Financials' && <F_Right_Panel data={companyData} />}
              {selectedLink === 'News' && <N_Right_Panel />}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

const SkeletonLayout = () => (
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
);

export default Index;
