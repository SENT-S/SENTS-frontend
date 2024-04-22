'use client';
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout';
import Image from 'next/image';
import TableComponent from '@/components/table';
import { countryData } from '@/services/mockData/mock';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getCompanies } from '@/services/apis/companies';
import { Session } from 'next-auth';
import { Skeleton } from '@/components/ui/skeleton';

interface CustomSession extends Session {
  token?: string;
}

interface Company {
  company_country: string;
  num_of_companies: number;
  list_of_companies: {
    id: number;
    company_name: string;
    company_country: string;
    stock_symbol: string;
    sector_or_industry: string;
  }[];
}

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  const [selectedCountry, setSelectedCountry] = useState('Uganda');
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (session?.token) {
        const response = await getCompanies(session.token);
        if (response.status === 200) {
          setCompanies(response.data);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch companies', response);
        }
      }
    };

    fetchCompanies();
  }, [session]);

  const companyCountries = companies.map((item: Company) => ({
    country: item.company_country,
    total: item.num_of_companies,
    flag: `https://flagsapi.com/${countryData.find((country: any) => item.company_country.toLocaleLowerCase() === country.country.toLocaleLowerCase())?.code?.toLocaleUpperCase()}/flat/64.png`,
  }));

  const filteredCompanies = companies
    .filter((item: Company) => item.company_country === selectedCountry)
    .map((item: Company) => item.list_of_companies)
    .flat();

  return (
    <MainLayout>
      {isLoading ? (
        <div className="space-y-8">
          <Skeleton className="text-2xl font-medium text-[#0D4222] dark:text-[#E6F6F0] text-left w-1/6 h-8 rounded-xl bg-slate-200 p-4" />
          <div className="grid grid-cols-2 gap-6 md:gap-8 mt-4">
            <Skeleton className="w-full h-14 rounded-xl bg-slate-200 p-4" />
            <Skeleton className="w-full h-14 rounded-xl bg-slate-200 p-4" />
          </div>
          <Skeleton className="w-full h-96 rounded-xl bg-slate-200 p-4">
            {
              // array of 5 items
              Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between space-x-3 items-center w-full h-12 border-b border-slate-200"
                >
                  <Skeleton className="w-1/2 h-8 rounded-xl bg-slate-200" />
                  <Skeleton className="w-1/4 h-8 rounded-xl bg-slate-200" />
                  <Skeleton className="w-1/3 h-8 rounded-xl bg-slate-200" />
                </div>
              ))
            }
          </Skeleton>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-2xl font-medium text-[#0D4222] dark:text-[#E6F6F0] text-left">
            Dashboard
          </div>
          <div className="grid grid-cols-2 gap-6 md:gap-8 mt-4">
            {companyCountries?.map(item => (
              <div
                key={item.country}
                className={`w-full flex justify-around cursor-pointer items-center p-2 md:p-4 rounded-2xl ${item.country === selectedCountry ? 'bg-[#148C59] text-white' : 'bg-white dark:bg-[#39463E80] dark:text-white dark:border dark:border-[#39463E80]'} border border-transparent hover:border-[#148C59]`}
                onClick={() => setSelectedCountry(item.country)}
              >
                <div className="flex flex-col text-left">
                  <h1 className="font-medium">{item.country}</h1>
                  <span className="text-xl font-bold">{item.total}</span>
                </div>
                <div className="relative w-10 h-10 md:h-12 md:w-12">
                  <Image
                    src={item.flag}
                    alt={item.country}
                    fill={true}
                    loading="eager"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <TableComponent
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
            onRowClick={row => {
              router.push(`/company/${row.id}`);
            }}
            rows={filteredCompanies}
          />
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;
