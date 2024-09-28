'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useMemo } from 'react';

import CompanyTable from '../../tables/companyTable';
import CustomPagination from '../../ui/customPagination';
import { Skeleton } from '../../ui/skeleton';

import MainLayout from '@/layouts';
import { stopRefresh } from '@/lib/ReduxSlices/refreshSlice';
import { useSelector, useDispatch } from '@/lib/utils';
import { getAllCompanies } from '@/utils/apiClient';
import { CustomSession, CompanyType } from '@/utils/types';

const CompanyDashboard = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession() as { data: CustomSession };
  const [selectedCountry, setSelectedCountry] = useState('Uganda');
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = session?.user?.role === 'ADMIN';
  const isRefreshing = useSelector((state) => state.refresh.isRefreshing);

  // Fetch all companies and update state accordingly
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies();
        setCompanies((prevCompanies) => {
          if (JSON.stringify(prevCompanies) !== JSON.stringify(data)) {
            return data;
          }
          return prevCompanies;
        });
        setIsLoading(false);
        dispatch(stopRefresh());
      } catch (error) {
        console.error('Error fetching companies:', error);
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [dispatch, isRefreshing]);

  // Memoize company countries for performance optimization
  const companyCountries = useMemo(() => {
    return companies.map((item) => ({
      country: item.company_country,
      total: item.num_of_companies,
      flag: `https://flagsapi.com/${item.company_country_code}/flat/64.png`,
    }));
  }, [companies]);

  // Filtered companies by selected country
  const filteredCompanies = useMemo(() => {
    return companies
      .filter((item) => item.company_country === selectedCountry)
      .flatMap((item) => item.list_of_companies);
  }, [companies, selectedCountry]);

  // Render loading skeleton
  const renderLoadingSkeleton = () => (
    <div className="space-y-8">
      <Skeleton className="text-2xl font-medium text-[#0D4222] dark:text-[#E6F6F0] text-left w-1/6 h-10 rounded-xl bg-slate-200 p-4" />
      <div className="grid grid-cols-2 gap-6 md:gap-8 mt-4">
        <Skeleton className="w-full h-14 rounded-xl bg-slate-200 p-4" />
        <Skeleton className="w-full h-14 rounded-xl bg-slate-200 p-4" />
      </div>
      <Skeleton className="w-full h-96 rounded-xl bg-slate-200 p-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between space-x-3 items-center w-full h-12 border-b border-slate-200"
          >
            <Skeleton className="w-1/2 h-8 rounded-xl bg-slate-200" />
            <Skeleton className="w-1/4 h-8 rounded-xl bg-slate-200" />
            <Skeleton className="w-1/3 h-8 rounded-xl bg-slate-200" />
          </div>
        ))}
      </Skeleton>
    </div>
  );

  // Render company country cards
  const renderCompanyCountryCards = () => (
    <div className={`grid ${isAdmin ? 'grid-cols-2' : 'grid-cols-1'} gap-6 md:gap-8 mt-4`}>
      <div
        className={`grid grid-cols-${
          companyCountries.length >= 2 ? 2 : companyCountries.length
        } gap-6 md:gap-8 col-span-8`}
      >
        {companyCountries.map((item) => (
          <div
            key={item.country}
            role="button"
            tabIndex={0}
            className={`relative w-full flex justify-around cursor-pointer items-center p-2 md:p-4 rounded-2xl ${
              item.country === selectedCountry
                ? 'bg-[#148C59] text-white'
                : 'bg-white dark:bg-[#39463E80] dark:text-white dark:border dark:border-[#39463E80]'
            } border border-[#148c5a33] hover:border-[#148C59]`}
            onClick={() => setSelectedCountry(item.country)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedCountry(item.country);
              }
            }}
          >
            <div className="flex flex-col text-left">
              <h2 className="font-thin text-[18px] md:text-[24px]">{item.country}</h2>
              <span className="text-xl font-semibold">{item.total}</span>
            </div>
            <div className="relative w-10 h-10 md:h-12 md:w-12 overflow-hidden">
              <Image src={item.flag} alt={item.country} width={64} height={64} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render company table with pagination
  const renderCompanyTable = () => (
    <CustomPagination
      items={filteredCompanies}
      itemsPerPage={6}
      render={(currentItems) => (
        <CompanyTable
          isAdmin={isAdmin}
          isTableLoading={isRefreshing}
          columns={[
            {
              field: 'company_name',
              label: 'Company Name',
              width: 'w-1/2',
            },
            {
              field: 'stock_symbol',
              label: 'Stock Symbol',
              width: 'w-1/4',
            },
            {
              field: 'sector_or_industry',
              label: 'Sector/Industry',
              width: 'w-1/3',
            },
          ]}
          rows={currentItems}
        />
      )}
    />
  );

  return (
    <MainLayout>
      {isLoading ? (
        renderLoadingSkeleton()
      ) : (
        <div className="space-y-8">
          <h1 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </h1>
          {renderCompanyCountryCards()}
          {renderCompanyTable()}
        </div>
      )}
    </MainLayout>
  );
};

export default CompanyDashboard;
