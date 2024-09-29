'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState, useCallback, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';

import SubNav from '@/components/admin/Navs/SubNav';
import FinancialSection from '@/components/admin/sections/Financial_section';
import NewsSection from '@/components/admin/sections/News_section';
import OverviewSection from '@/components/admin/sections/Overview_section';
import CustomBackButton from '@/components/ui/customBackButton';
import MainLayout from '@/layouts';
import { fetchMetrics, fetchCategories } from '@/lib/ReduxSlices/metric_category';
import { stopRefresh } from '@/lib/ReduxSlices/refreshSlice';
import { useSelector, useDispatch } from '@/lib/utils';
import { getCompany, getCompanyFinancials } from '@/utils/apiClient';
import { CustomSession } from '@/utils/types';

interface CompanyDetailsProps {
  params: { companyId: string };
}

const links = ['Overview', 'Financials', 'News'];

const EditPage: React.FC<CompanyDetailsProps> = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const companyId = parseInt(params.companyId);
  const { data: session, status } = useSession() as { data: CustomSession; status: string };

  const [selectedLink, setSelectedLink] = useState(links[0]);
  const [companyData, setCompanyData] = useState<any>({});
  const [financialData, setFinancialData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [financialStatements, setFinancialStatements] = useState<any>([]);
  const [countryName, setCountryName] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(false);

  const financialMetrics = useSelector((state: any) => state.metricCategory.metricList);
  const financialDataCategories = useSelector((state: any) => state.metricCategory.categoryList);
  const isRefreshing = useSelector((state: any) => state.refresh.isRefreshing);

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const [financials, companyData] = await Promise.all([
        getCompanyFinancials(companyId),
        getCompany(companyId),
      ]);
      setCountryName(companyData.company_details.company_country);
      setFinancialStatements(companyData.company_documents);
      setCompanyData(companyData.company_details);
      setFinancialData(financials);
    } catch (error) {
      console.error('Failed to fetch company data', error);
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
    const sectionProps = {
      companyID: companyId,
      countryName,
    };

    switch (selectedLink) {
      case 'Overview':
        return <OverviewSection {...sectionProps} companyData={companyData} />;
      case 'Financials':
        return (
          <FinancialSection
            {...sectionProps}
            FinancialData={financialData}
            financialStatements={financialStatements}
            metrics={financialMetrics}
            category={financialDataCategories?.data || financialDataCategories}
            setRefresh={setRefresh}
          />
        );
      case 'News':
        return <NewsSection {...sectionProps} />;
      default:
        return null;
    }
  }, [
    selectedLink,
    companyId,
    companyData,
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
};

export default React.memo(EditPage);
