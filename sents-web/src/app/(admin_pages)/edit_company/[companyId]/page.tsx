'use client';
import React, { useState, useCallback, useEffect } from 'react';
import {
  getCompany,
  getCompanyNews,
  getCompanyFinancials,
  getAllFinancialDataCategories,
  getAllFinancialMetrics,
} from '@/services/apis/companies';
import SubNav from '@/components/admin/Navs/SubNav';
import Overview_section from '@/components/admin/sections/Overview_section';
import Financial_section from '@/components/admin/sections/Financial_section';
import News_section from '@/components/admin/sections/News_section';
import MainLayout from '@/layouts';
import { Button } from '@/components/ui/button';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/utils/types';

interface CompanyDetailsProps {
  params: { companyId: string };
}

const links = ['Overview', 'Financials', 'News'];

const EditPage: React.FC<CompanyDetailsProps> = React.memo(({ params }) => {
  const router = useRouter();
  const companyId = parseInt(params.companyId);
  const { status } = useSession() as {
    data: CustomSession;
    status: string;
  };
  const [selectedLink, setSelectedLink] = useState(links[0]);
  const [companyData, setCompanyData] = useState<any>({});
  const [newsData, setNewsData] = useState<any>([]);
  const [financialData, setFinancialData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [financialStatements, setFinancialStatements] = useState<any>([]);
  const [financialMetrics, setFinancialMetrics] = useState<any>([]);
  const [financialDataCategories, setFinancialDataCategories] = useState<any>(
    [],
  );
  const [countryName, setCountryName] = useState<string>('');

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);

    try {
      const companyData = await getCompany(companyId);
      const newsData = await getCompanyNews(companyId);
      const financialData = await getCompanyFinancials(companyId);
      const financialMetrics = await getAllFinancialMetrics();
      const financialDataCategories = await getAllFinancialDataCategories();

      if (
        companyData.status !== 200 ||
        newsData.status !== 200 ||
        financialData.status !== 200 ||
        financialMetrics.status !== 200
      ) {
        throw new Error('Failed to fetch data');
      }

      setCountryName(companyData.data.company_details.company_country);
      setFinancialMetrics(financialMetrics.data);
      setFinancialDataCategories(
        financialDataCategories?.data || financialDataCategories,
      );
      setFinancialStatements(companyData.data.company_documents);
      setCompanyData(companyData.data.company_details);
      setNewsData(newsData);
      setFinancialData(financialData);
    } catch (error) {
      console.error('Failed to fetch company', error);
    } finally {
      setIsLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const renderSection = () => {
    switch (selectedLink) {
      case 'Overview':
        return (
          <Overview_section
            isLoading={isLoading}
            companyData={companyData}
            companyID={params.companyId}
          />
        );
      case 'Financials':
        return (
          <Financial_section
            companyID={params.companyId}
            FinancialData={financialData}
            financialStatements={financialStatements}
            metrics={financialMetrics}
            category={financialDataCategories}
            countryName={countryName}
          />
        );
      case 'News':
        return <News_section companyID={params.companyId} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      {isLoading && status === 'authenticated' ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-20 mt-4 mb-4 rounded-xl bg-slate-200 dark:bg-slate-800"
          />
        ))
      ) : (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              className="ml-3 mb-4"
              onClick={() => router.back()}
            >
              <IoArrowBack />
            </Button>
          </div>
          <div className="space-y-8">
            <SubNav
              links={links}
              selectedLink={selectedLink}
              setSelectedLink={setSelectedLink}
            />
            <div className="overflow-hidden">{renderSection()}</div>
          </div>
        </div>
      )}
    </MainLayout>
  );
});

export default EditPage;
