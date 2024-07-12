'use client';
import React, { useState, useCallback, useEffect } from 'react';
import {
  getCompany,
  getCompanyNews,
  getCompanyFinancials,
} from '@/services/apis/companies';
import SubNav from '@/components/navigation/SubNav';
import Overview_section from '@/components/admin/sections/Overview_section';
import Financial_section from '@/components/admin/sections/Financial_section';
import News_section from '@/components/admin/sections/News_section';
import MainLayout from '@/layouts';
import { Button } from '@/components/ui/button';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface CompanyDetailsProps {
  params: { companyId: string };
}

const links = ['Overview', 'Financials', 'News'];

const EditPage: React.FC<CompanyDetailsProps> = React.memo(({ params }) => {
  const router = useRouter();

  const [selectedLink, setSelectedLink] = useState(links[0]);
  const [companyData, setCompanyData] = useState<any>({});
  const [newsData, setNewsData] = useState<any>([]);
  const [financialData, setFinancialData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [financialStatements, setFinancialStatements] = useState<any>([]);
  const companyId = parseInt(params.companyId);

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);

    try {
      const companyData = await getCompany(companyId);
      const newsData = await getCompanyNews(companyId);
      const financialData = await getCompanyFinancials(companyId);

      if (
        companyData.status !== 200 ||
        newsData.status !== 200 ||
        financialData.status !== 200
      ) {
        throw new Error('Failed to fetch data');
      }

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
          <div className="overflow-hidden">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-20 mb-4 rounded-xl bg-slate-200 dark:bg-slate-800"
                  />
                ))
              : renderSection()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
});

export default EditPage;
