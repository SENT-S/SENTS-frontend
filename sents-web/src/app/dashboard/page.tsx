'use client';
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts';
import Image from 'next/image';
import TableComponent from '@/components/table';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/utils/types';
import { getCompanies } from '@/services/apis/companies';
import { Skeleton } from '@/components/ui/skeleton';
import Pagination from '@/components/pagination';
import { RxPlus } from 'react-icons/rx';
import { FiEdit } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { MdDone } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';

interface Company {
  company_country: string;
  num_of_companies: number;
  company_country_code: string;
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
  const { data: session } = useSession() as {
    data: CustomSession;
  };
  const [selectedCountry, setSelectedCountry] = useState('Uganda');
  const [showEdit, setShowEdit] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = session?.user?.role === 'ADMIN';

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await getCompanies();
      if (response.status === 200) {
        setCompanies(response.data);
        setIsLoading(false);
      } else {
        console.error('Failed to fetch companies', response);
      }
    };

    fetchCompanies();
  }, []);

  const companyCountries = companies.map((item: Company) => ({
    country: item?.company_country,
    total: item?.num_of_companies,
    flag: `https://flagsapi.com/${item?.company_country_code}/flat/64.png`,
  }));

  const filteredCompanies = companies
    .filter((item: Company) => item.company_country === selectedCountry)
    .map((item: Company) => item.list_of_companies)
    .flat();

  const handleEditCompany = () => {};

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
          <h1 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </h1>
          {/* admin features */}
          <div
            className={`${isAdmin && 'grid grid-cols-2 gap-6 md:gap-8 mt-4'}`}
          >
            <div
              className={`grid grid-cols-${
                companyCountries.length >= 2 ? 2 : companyCountries.length
              } gap-6 md:gap-8 col-span-8`}
            >
              {companyCountries?.map((item) => (
                <div
                  key={item.country}
                  className={`relative w-full flex justify-around cursor-pointer items-center p-2 md:p-4 rounded-2xl ${item.country === selectedCountry ? 'bg-[#148C59] text-white' : 'bg-white dark:bg-[#39463E80] dark:text-white dark:border dark:border-[#39463E80]'} border border-[#148c5a33] hover:border-[#148C59]`}
                  onClick={() => setSelectedCountry(item.country)}
                >
                  <div className="flex flex-col text-left">
                    <h2 className="font-thin text-[18px] md:text-[24px]">
                      {item.country}
                    </h2>
                    <span className="text-xl font-semibold">{item.total}</span>
                  </div>
                  <div className="relative w-10 h-10 md:h-12 md:w-12 overflow-hidden">
                    <Image
                      src={item.flag}
                      alt={item.country}
                      width={64}
                      height={64}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Admin features */}
          {isAdmin && (
            <div className="flex justify-between items-center">
              <Button
                className="bg-[#39463E] flex items-center text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#39463ed9] hover:text-white"
                onClick={() => router.push(`/new_company`)}
              >
                Add New Company <RxPlus className="ml-3" size={18} />
              </Button>
              {showEdit ? (
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="bg-[#148C59] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#148C59ed9] hover:text-white"
                    onClick={handleEditCompany}
                    disabled={isLoading}
                  >
                    Done <MdDone className="ml-3" size={20} />
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#EA0000] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#EA0000ed9] hover:text-white"
                    onClick={() => {
                      setShowEdit(false);
                    }}
                    disabled={isLoading}
                  >
                    Cancel <MdCancel className="ml-3" size={20} />
                  </Button>
                </div>
              ) : (
                <Button
                  className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
                  onClick={() => setShowEdit(!showEdit)}
                >
                  Edit Company <FiEdit className="ml-3" size={18} />
                </Button>
              )}
            </div>
          )}
          <Pagination
            items={filteredCompanies}
            itemsPerPage={6}
            render={(currentItems) => (
              <TableComponent
                showEdit={showEdit}
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
                onRowClick={(row) => {
                  {
                    isAdmin
                      ? showEdit
                        ? null
                        : router.push(`/edit_company/${row.id}`)
                      : router.push(`/company/${row.id}`);
                  }
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
