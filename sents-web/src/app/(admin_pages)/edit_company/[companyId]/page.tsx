'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState, useCallback, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';

import SubNav from '@/components/admin/Navs/SubNav';
import Financial_section from '@/components/admin/sections/Financial_section';
import News_section from '@/components/admin/sections/News_section';
import Overview_section from '@/components/admin/sections/Overview_section';
import CustomBackButton from '@/components/ui/customBackButton';
import { Skeleton } from '@/components/ui/skeleton';
import MainLayout from '@/layouts';
import { fetchMetrics, fetchCategories } from '@/lib/ReduxSlices/metric_category';
import { stopRefresh } from '@/lib/ReduxSlices/refreshSlice';
import { useSelector, useDispatch } from '@/lib/utils';
import { getCompany, getCompanyNews, getCompanyFinancials } from '@/utils/apiClient';
import { CustomSession } from '@/utils/types';

interface CompanyDetailsProps {
  params: { companyId: string };
}

const links = ['Overview', 'Financials', 'News'];

const EditPage: React.FC<CompanyDetailsProps> = React.memo(({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const companyId = parseInt(params.companyId);
  const { data: session, status } = useSession() as { data: CustomSession; status: string };
  const [selectedLink, setSelectedLink] = useState(links[0]);
  const [companyData, setCompanyData] = useState<any>({});
  const [financialData, setFinancialData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [financialStatements, setFinancialStatements] = useState<any>([]);
  const [countryName, setCountryName] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(false);
  const financialMetrics = useSelector<any>((state) => state.metricCategory.metricList);
  const financialDataCategories = useSelector<any>((state) => state.metricCategory.categoryList);
  const isRefreshing = useSelector((state) => state.refresh.isRefreshing);

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);

    try {
      const financials = await getCompanyFinancials(companyId);
      const companyData = await getCompany(companyId);
      // TODO: NEWS SECTION DATA
      // const newsData = await getCompanyNews(companyId);
      setCountryName(companyData.company_details.company_country);
      setFinancialStatements(companyData.company_documents);
      setCompanyData(companyData.company_details);
      setFinancialData(financials);
    } catch (error) {
      console.error('Failed to fetch company', error);
    } finally {
      setIsLoading(false);
      dispatch(stopRefresh());
      if (refresh) {
        setRefresh(false);
      }
    }
  }, [companyId, dispatch, refresh]);

  useEffect(() => {
    dispatch(fetchMetrics());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies, isRefreshing]);

  const renderSection = useCallback(() => {
    switch (selectedLink) {
      case 'Overview':
        return <Overview_section companyData={companyData} companyID={params.companyId} />;
      case 'Financials':
        return (
          <Financial_section
            companyID={params.companyId}
            FinancialData={financialData}
            financialStatements={financialStatements}
            metrics={financialMetrics}
            category={financialDataCategories?.data || financialDataCategories}
            countryName={countryName}
            setRefresh={setRefresh}
          />
        );
      case 'News':
        return <News_section companyID={params.companyId} />;
      default:
        return null;
    }
  }, [
    selectedLink,
    companyData,
    params.companyId,
    financialData,
    financialStatements,
    financialMetrics,
    financialDataCategories,
    countryName,
    setRefresh,
  ]);

  return (
    <MainLayout>
      {isLoading ? (
        // Array.from({ length: 5 }).map((_, index) => (
        //   <Skeleton
        //     key={index}
        //     className="h-20 mt-4 mb-4 rounded-xl bg-slate-200 dark:bg-slate-800"
        //   />
        // ))
        <div className="w-full inset-0 flex flex-col gap-2 justify-center items-center h-full">
          <ScaleLoader color="#148c59" />
          <span>Processing Company data...</span>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <CustomBackButton onClick={() => router.back()} customClass="mb-4" />
          </div>
          <div className="space-y-8">
            <SubNav links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
            <div className="overflow-hidden">{renderSection()}</div>
          </div>
        </div>
      )}
    </MainLayout>
  );
});

EditPage.displayName = 'EditPage';

export default EditPage;
