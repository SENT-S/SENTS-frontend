'use client';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineLightMode } from 'react-icons/md';

import CustomDrawer from '../ui/customDrawer';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useOutsideClick from '@/hooks/useOutsideClick';
import { getAllCompanies } from '@/utils/apiClient';
import { CustomSession } from '@/utils/types';

// Define the type for a company
type Company = {
  id: number;
  company_name: string;
  company_country: string;
  stock_symbol: string;
  sector_or_industry: string;
};

// Your initial data
const initialData = [] as Company[];

// Options for Fuse.js
const options = {
  keys: ['company_country', 'company_name', 'stock_symbol', 'sector_or_industry'],
  includeScore: true,
};

const SkeletonComponent = ({ height, width }: { height: string; width: string }) => (
  <Skeleton className={`h-${height} w-${width} rounded-full bg-gray-200 dark:bg-[#0e120f]`} />
);

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isAdmin = session?.user?.role === 'ADMIN';
  const { image = '', name, email } = session?.user || {};

  // for search
  const [searchData, setSearchData] = useState<Company[]>(initialData);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const fuse = useMemo(() => new Fuse(searchData, options), [searchData, options]);
  const searchRef = useRef(null);

  useOutsideClick(searchRef, () => {
    setResults([]);
  });

  const isActive = useCallback((path: string) => pathname.startsWith(path), [pathname]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    await signOut({
      redirect: true,
      callbackUrl: '/login_register',
    });
    setLoading(false);
    localStorage.clear();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await getAllCompanies();
      if (response) {
        // Flatten the data into a single array of companies
        const flattenedData = response.flatMap((data: any) => data.list_of_companies);
        setSearchData(flattenedData);
      } else {
        console.error('Error: No data received');
      }
      setLoading(false);
    };

    fetchCompanies();
  }, []);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      if (e.target.value.trim() !== '') {
        const result = fuse.search(e.target.value);
        setResults(result.map((res) => res.item));
      } else {
        setResults([]);
      }
    },
    [fuse],
  );

  return (
    <>
      <div className="bg-white z-50 shadow py-4 rounded-b-xl lg:rounded-b-none lg:rounded-bl-xl dark:bg-[#39463e] sticky top-0">
        <div className="px-4 flex justify-between items-center space-x-4 lg:space-x-0">
          <div className="lg:hidden">
            <Link href="/dashboard">
              <h1 className="text-xl lg:text-2xl Unigoe-font text-[#0D4222] dark:text-[#E6F6F0] font-bold">
                SENTS.
              </h1>
            </Link>
          </div>
          {/* Admin Feature added */}
          {!isAdmin ? (
            searchData && searchData.length > 0 ? (
              <div className="relative w-full lg:w-1/3">
                <div className="flex items-center  h-[40px] text-gray-400 bg-gray-100 max-lg:dark:bg-black rounded-lg overflow-hidden dark:bg-black">
                  <div className="ml-3">
                    <CiSearch />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for stocks & more"
                    className="flex-grow max-md:text-sm px-2 w-full bg-transparent focus:outline-none"
                    value={query}
                    onChange={handleSearch}
                  />
                  <Button
                    type="button"
                    className={`p-2 rounded-full ${query.length ? 'block' : 'hidden'} dark:text-white bg-none`}
                    onClick={() => setQuery('')}
                  >
                    <IoMdClose size={20} />
                  </Button>
                </div>
                {results.length > 0 && (
                  <div
                    className="absolute mt-2 w-full bg-white rounded-md shadow-lg max-h-60 z-50 overflow-auto dark:bg-[#39463E] dark:text-white"
                    ref={searchRef}
                  >
                    {results.map((item, index) => (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          router.push(`/company/${item.id}`);
                          setQuery(item.company_name);
                          setResults([]);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            router.push(`/company/${item.id}`);
                            setQuery(item.company_name);
                            setResults([]);
                          }
                        }}
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                      >
                        {item.company_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Skeleton className="w-full lg:w-1/3 rounded-md p-5 relative bg-gray-200 dark:bg-[#0e120f]" />
            )
          ) : (
            <div />
          )}

          <div className="hidden lg:flex items-center lg:pr-14">
            <Button
              type="button"
              className="p-2 bg-gray-100 rounded-full cursor-pointer text-black dark:text-white dark:bg-[#39463E80]"
              onClick={toggleTheme}
            >
              <MdOutlineLightMode size={20} className="hidden dark:block" />
              <BsFillMoonStarsFill size={20} className="dark:hidden" />
            </Button>
            {status === 'loading' ? (
              <div className="flex items-center space-x-4 ml-2">
                <SkeletonComponent height="12" width="12" />
                <div className="space-y-2">
                  <SkeletonComponent height="4" width="[100px]" />
                  <SkeletonComponent height="4" width="[150px]" />
                </div>
              </div>
            ) : (
              <div className="flex items-center ml-4">
                <Avatar style={{ boxShadow: '0 0 0 1px #148c59' }}>
                  <AvatarImage src={image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-2 dark:text-white">
                  <p className="font-bold">{name}</p>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>
            )}
          </div>

          {/* mobile & tablet drawer */}
          <div className="lg:hidden">
            <CustomDrawer
              isAdmin={isAdmin}
              session={session}
              status={status}
              loading={loading}
              handleLogout={handleLogout}
              toggleTheme={toggleTheme}
              isActive={isActive}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
