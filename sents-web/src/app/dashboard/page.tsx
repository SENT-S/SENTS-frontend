'use client';
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout';
import Image from 'next/image';
import TableComponent from '@/components/table';
import { countryData } from '@/services/mockData/mock';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getCompanies } from '@/services/apis/companies';
import { Skeleton } from '@/components/ui/skeleton';
import Pagination from '@/components/pagination';
import { CustomSession } from '@/utils/types';
import { RxPlus } from 'react-icons/rx';
import { FiEdit } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import AddCountryForm from '@/components/admin/forms/Add_country';
import AddCompanyForm from '@/components/admin/forms/Add_company';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
  const isAdmin = session?.user?.role === 'admin';

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
      ) : (
        <div className="space-y-8">
          <div className="text-2xl font-medium text-[#0D4222] dark:text-[#E6F6F0] text-left">
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </div>
          {/* admin features */}
          <div
            className={`${isAdmin && 'flex flex-col-reverse md:grid md:grid-cols-9 gap-6 md:gap-8 mt-4'}`}
          >
            <div
              className={`grid grid-cols-${
                companyCountries.length >= 2 ? 2 : companyCountries.length
              } gap-6 md:gap-8 col-span-8`}
            >
              {companyCountries?.map(item => (
                <div
                  key={item.country}
                  className={`w-full flex justify-around cursor-pointer items-center p-2 md:p-4 rounded-2xl ${item.country === selectedCountry ? 'bg-[#148C59] text-white' : 'bg-white dark:bg-[#39463E80] dark:text-white dark:border dark:border-[#39463E80]'} border border-[#148c5a33] hover:border-[#148C59]`}
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
            <div
              className={`${isAdmin ? 'flex' : 'hidden'} col-span-1 justify-end`}
            >
              <Dialog>
                <DialogTrigger className="p-4 flex justify-center items-center rounded-2xl w-[70px] h-[60px] md:w-[120px] md:h-[86px] bg-white dark:bg-[#39463E80] dark:text-white dark:border dark:border-[#39463E80] border border-[#148c5a33] hover:border-[#148C59] hover:bg-white">
                  <RxPlus className="text-[#148C59]" size={30} />
                </DialogTrigger>
                <DialogContent className="bg-white space-y-3">
                  <DialogTitle className="text-center">
                    Add a new Country
                  </DialogTitle>
                  <DialogDescription>
                    {/* Add Country form */}
                    <AddCountryForm />
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {/* Admin features */}
          {isAdmin && (
            <div className="flex justify-between items-center">
              <Dialog>
                <DialogTrigger className="bg-[#39463E] flex items-center text-white p-2 md:p-4 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#39463ed9] hover:text-white">
                  Add New Company <RxPlus className="ml-3" size={18} />
                </DialogTrigger>
                <DialogContent className="bg-white space-y-3">
                  <DialogTitle className="text-center">
                    Add a new Company
                  </DialogTitle>
                  <DialogDescription>
                    {/* Add Company form */}
                    <AddCompanyForm />
                  </DialogDescription>
                </DialogContent>
              </Dialog>

              <Button
                className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
                onClick={() => null}
              >
                Edit Company <FiEdit className="ml-3" size={18} />
              </Button>
            </div>
          )}
          <Pagination
            items={filteredCompanies}
            itemsPerPage={6}
            render={currentItems => (
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
                rows={currentItems}
              />
            )}
          />
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;
