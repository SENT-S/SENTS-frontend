'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  getCompany,
  getCompanyNews,
  getCompanyFinancials,
} from '@/services/apis/companies';
import { Skeleton } from '@/components/ui/skeleton';
import MainLayout from '@/layouts';
import SubNav from '@/components/navigation/SubNav';
import Overview from '../_sections/Overview';
import Financial from '../_sections/Financials';
import News from '../_sections/News';
import O_Right_Panel from '../_sections/panels/O_Right_Panel';
import F_Right_Panel from '../_sections/panels/F_Right_Panel';
import N_Right_Panel from '../_sections/panels/N_Right_Panel';
import { CustomSession } from '@/utils/types';

interface CompanyDetailsProps {
  params: { companyId: string };
}

const links = ['Overview', 'Financials', 'News'];

const CompanyDetails: React.FC<CompanyDetailsProps> = React.memo(
  ({ params }) => {
    const { data: session } = useSession() as {
      data: CustomSession;
      status: 'loading' | 'authenticated' | 'unauthenticated';
    };
    const [selectedLink, setSelectedLink] = useState(links[0]);
    const [companyData, setCompanyData] = useState<any>({});
    const [newsData, setNewsData] = useState<any>([]);
    const [financialData, setFinancialData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCompanies = useCallback(async () => {
      if (session?.token) {
        const companyId = parseInt(params.companyId);
        const response = await getCompany(session.token, companyId);
        const newsResponse = await getCompanyNews(session.token, companyId);
        const financialResponse = await getCompanyFinancials(
          session.token,
          companyId,
        );
        if (
          response.status === 200 &&
          newsResponse.status === 200 &&
          financialResponse.status === 200
        ) {
          setCompanyData(response.data);
          setNewsData(newsResponse.data);
          setFinancialData(financialResponse.data);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch company', response);
        }
      }
    }, [session, params.companyId]);

    useEffect(() => {
      fetchCompanies();
    }, [fetchCompanies]);

    const companyDetails = companyData?.company_details;

    const renderSection = () => {
      switch (selectedLink) {
        case 'Overview':
          return <Overview data />;
        case 'Financials':
          return (
            <Financial data={companyDetails} financialData={financialData} />
          );
        case 'News':
          return <News data={newsData} />;
        default:
          return null;
      }
    };

    return (
      <MainLayout>
        {isLoading ? (
          <SkeletonLayout />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <div className="col-span-1 lg:col-span-2 space-y-8">
              <SubNav
                links={links}
                selectedLink={selectedLink}
                setSelectedLink={setSelectedLink}
              />
              <div className="rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] p-4 overflow-hidden">
                {renderSection()}
              </div>
            </div>
            <div className="col-span-1 w-auto">
              <div className="w-full flex justify-center">
                {selectedLink === 'Overview' && (
                  <O_Right_Panel data={companyDetails} />
                )}
                {selectedLink === 'Financials' && (
                  <F_Right_Panel data={companyData} />
                )}
                {selectedLink === 'News' && <N_Right_Panel />}
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    );
  },
);

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

export default CompanyDetails;
