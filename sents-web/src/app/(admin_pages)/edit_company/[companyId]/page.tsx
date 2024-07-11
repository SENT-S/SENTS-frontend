'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/utils/types';
import {
  getCompany,
  getCompanyNews,
  getCompanyFinancials,
} from '@/services/apis/companies';
import SubNav from '@/components/navigation/SubNav';
import Overview_section from '../../_components/Overview_section';
import Financial_section from '../../_components/Financial_section';
import News_section from '../../_components/News_section';
import MainLayout from '@/layouts';

interface CompanyDetailsProps {
  params: { companyId: string };
}

const links = ['Overview', 'Financials', 'News'];

const EditPage: React.FC<CompanyDetailsProps> = React.memo(({ params }) => {
  const { data: session } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  const [selectedLink, setSelectedLink] = useState(links[0]);
  const [companyData, setCompanyData] = useState<any>({});
  const [newsData, setNewsData] = useState<any>([]);
  const [financialData, setFinancialData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
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
        <div className="space-y-8">
          <SubNav
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          />
          <div className="overflow-hidden">{renderSection()}</div>
        </div>
      </div>
    </MainLayout>
  );
});

export default EditPage;
