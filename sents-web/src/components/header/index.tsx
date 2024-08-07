'use client';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { IoIosMenu } from 'react-icons/io';
import { IoIosLogOut } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { MdOutlineLightMode } from 'react-icons/md';
import { ScaleLoader } from 'react-spinners';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Skeleton } from '@/components/ui/skeleton';
import useOutsideClick from '@/hooks/useOutsideClick';
import { getCompanies } from '@/services/apis/companies';
import { UserLinks, AdminLinks } from '@/utils/Links';
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
  const [searchData, setSearchData] = useState(initialData);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const [fuse, setFuse] = useState(new Fuse(searchData, options));
  const searchRef = useRef(null);

  useOutsideClick(searchRef, () => {
    setResults([]);
  });

  const isActive = (path: string) => pathname.startsWith(path);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    setLoading(true);
    await signOut({
      redirect: true,
      callbackUrl: '/login_register',
    });
    setLoading(false);
    localStorage.clear();
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await getCompanies();
      if (response.status === 200) {
        // Flatten the data into a single array of companies
        const flattenedData = response.data.flatMap((data: any) => data.list_of_companies);
        setSearchData(flattenedData);
        // Update the fuse instance with the new data
        setFuse(new Fuse(flattenedData, options));
      } else {
        console.error('Failed to fetch companies', response);
      }
    };

    fetchCompanies();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      const result = fuse.search(e.target.value);
      setResults(result.map((res) => res.item));
    } else {
      setResults([]);
    }
  };

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
                          setResults([]);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            router.push(`/company/${item.id}`);
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
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button type="button">
                  <IoIosMenu className="bg-gray-100 py-1 px-2 dark:bg-[#39463E80] dark:text-white w-12 h-[30px] rounded-[40px]" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-[#E6EEEA] flex flex-col items-center rounded-none">
                <DrawerHeader className="mx-auto w-full space-y-4 max-w-sm">
                  <div className="flex justify-between items-center">
                    <Link href="/dashboard">
                      <h1 className="text-2xl Unigoe-font text-[#0D4222] font-bold">SENTS.</h1>
                    </Link>
                    <DrawerClose>
                      <IoClose size={20} />
                    </DrawerClose>
                  </div>
                  {status === 'loading' ? (
                    <div className="flex flex-col justify-start">
                      <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-[#0e120f]" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px] bg-gray-200 dark:bg-[#0e120f]" />
                        <Skeleton className="h-4 w-[150px] bg-gray-200 dark:bg-[#0e120f]" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-start">
                      <Avatar style={{ boxShadow: '0 0 0 1px #148c59' }}>
                        <AvatarImage src={session?.user?.image || ''} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="mt-3 text-start">
                        <p className="font-bold">{session?.user?.name}</p>
                        <p className="text-sm text-gray-500">{session?.user?.email}</p>
                      </div>
                    </div>
                  )}
                  <div className="w-full flex justify-start">
                    <Button
                      type="button"
                      className="p-2 bg-gray-100 rounded-full text-black dark:text-white dark:bg-[#39463E80]"
                      onClick={toggleTheme}
                    >
                      <MdOutlineLightMode size={20} className="hidden dark:block" />
                      <BsFillMoonStarsFill size={20} className="dark:hidden" />
                    </Button>
                  </div>
                  <div className="w-full space-y-3">
                    {(isAdmin ? AdminLinks : UserLinks).map((link, index) => {
                      const Icon = link.icon;
                      const isActiveLink = link.activePaths.some(isActive);
                      return (
                        <Button
                          type="button"
                          key={index}
                          className={`flex w-full  justify-center items-center rounded-md space-x-2 px-4 py-2 relative ${
                            isActiveLink ? 'bg-[#39463E] text-white hover:bg-[#39463edc]' : ''
                          }`}
                          disabled={link.disable}
                        >
                          <Link
                            href={link.path}
                            className="flex gap-3 justify-start items-center w-full"
                          >
                            <Icon size={24} className="text-[#148c59]" />
                            <span className="text-lg">{link.name}</span>
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                </DrawerHeader>
                <div className="flex flex-col justify-between h-full pb-4">
                  <div />
                  <Button
                    type="button"
                    onClick={() => {
                      handleLogout();
                    }}
                    className="flex justify-center items-center space-x-2 p-4 cursor-pointer text-gray-400 hover:bg-gray-100 rounded-lg"
                  >
                    <IoIosLogOut size={24} />
                    <span>
                      {loading ? (
                        <ScaleLoader
                          color="#a3a3a3"
                          loading={loading}
                          height={16}
                          className="mt-1"
                        />
                      ) : (
                        'Logout'
                      )}
                    </span>
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
