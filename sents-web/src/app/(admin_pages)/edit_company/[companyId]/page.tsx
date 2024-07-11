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
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanies = useCallback(async () => {
    if (session?.token) {
      const companyId = parseInt(params.companyId);
      const response = await getCompany(companyId);
      const newsResponse = await getCompanyNews(companyId);
      const financialResponse = await getCompanyFinancials(companyId);
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

  const renderSection = () => {
    switch (selectedLink) {
      case 'Overview':
        return <Overview_section companyID={params.companyId} />;
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
