'use client';
import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import Link from 'next/link';
import { IoIosMenu } from 'react-icons/io';
import { MdOutlineLightMode } from 'react-icons/md';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoClose } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { LuLayoutDashboard } from 'react-icons/lu';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { getCompanies } from '@/services/apis/companies';
import Fuse from 'fuse.js';
import { useRouter } from 'next/navigation';
import { CustomSession } from '@/utils/types';
import { FiPieChart } from 'react-icons/fi';
import { PiChartLineUpLight } from 'react-icons/pi';

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
  keys: [
    'company_country',
    'company_name',
    'stock_symbol',
    'sector_or_industry',
  ],
  includeScore: true,
};

const UserLinks = [
  {
    name: 'Dashboard',
    icon: LuLayoutDashboard,
    path: '/dashboard',
    activePaths: ['/dashboard', '/company'],
  },
  {
    name: 'News',
    icon: HiOutlineNewspaper,
    path: '/news',
    activePaths: ['/news'],
  },
];

const AdminLinks = [
  {
    name: 'Dashboard',
    icon: LuLayoutDashboard,
    path: '/dashboard',
    activePaths: ['/dashboard', '/company'],
  },
  {
    name: 'Overview',
    icon: FiPieChart,
    path: '/overview',
    activePaths: ['/overview'],
  },
  {
    name: 'Financials',
    icon: PiChartLineUpLight,
    path: '/financials',
    activePaths: ['/financials'],
  },
  {
    name: 'News',
    icon: HiOutlineNewspaper,
    path: '/news',
    activePaths: ['/news'],
  },
];

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isAdmin = session?.user?.role === 'admin';

  // for search
  const [searchData, setSearchData] = useState(initialData);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const [fuse, setFuse] = useState(new Fuse(searchData, options));

  const isActive = (path: string) => pathname.startsWith(path);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    setLoading(true);
    signOut().then(() => setLoading(false));
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      if (session?.token) {
        const response = await getCompanies(session.token);
        if (response.status === 200) {
          // Flatten the data into a single array of companies
          const flattenedData = response.data.flatMap(
            (data: any) => data.list_of_companies,
          );
          setSearchData(flattenedData);
          // Update the fuse instance with the new data
          setFuse(new Fuse(flattenedData, options));
        } else {
          console.error('Failed to fetch companies', response);
        }
      }
    };

    fetchCompanies();
  }, [session]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      const result = fuse.search(e.target.value);
      setResults(result.map(res => res.item));
    } else {
      setResults([]);
    }
  };

  return (
    <>
      <div className="bg-white shadow py-4 rounded-b-xl lg:rounded-b-none lg:rounded-bl-xl dark:bg-[#39463E80]">
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
                <div className="flex items-center text-gray-400 bg-gray-100 max-lg:dark:bg-black py-2 rounded-lg overflow-hidden dark:bg-[#39463E80]">
                  <div className="ml-3">
                    <CiSearch />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for stocks & more"
                    className="flex-grow max-md:text-sm px-2 py-1 w-full bg-transparent focus:outline-none"
                    value={query}
                    onChange={handleSearch}
                  />
                </div>
                {results.length > 0 && (
                  <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg max-h-60 z-50 overflow-auto dark:bg-[#39463E] dark:text-white">
                    {results.map((item, index) => (
                      <div
                        onClick={() => {
                          router.push(`/company/${item.id}`);
                          setResults([]);
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
            <button
              className="p-2 bg-gray-100 rounded-full cursor-pointer text-black dark:text-white dark:bg-[#39463E80]"
              onClick={toggleTheme}
            >
              <MdOutlineLightMode size={20} className="hidden dark:block" />
              <BsFillMoonStarsFill size={20} className="dark:hidden" />
            </button>
            {status === 'loading' ? (
              <div className="flex items-center space-x-4 ml-2">
                <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-[#0e120f]" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px] bg-gray-200 dark:bg-[#0e120f]" />
                  <Skeleton className="h-4 w-[150px] bg-gray-200 dark:bg-[#0e120f]" />
                </div>
              </div>
            ) : (
              <div className="flex items-center ml-4">
                <Avatar style={{ boxShadow: '0 0 0 1px #148c59' }}>
                  <AvatarImage src={session?.user?.image || ''} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-2 dark:text-white">
                  <p className="font-bold">{session?.user?.name}</p>
                  <p className="text-sm text-gray-500">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* mobile & tablet drawer */}
          <div className="lg:hidden">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <button className="cursor-pointer">
                  <IoIosMenu className="bg-gray-100 py-1 px-2 dark:bg-[#39463E80] dark:text-white w-12 h-[30px] rounded-[40px]" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="bg-[#E6EEEA] flex flex-col items-center rounded-none">
                <DrawerHeader className="mx-auto w-full space-y-4 max-w-sm">
                  <div className="flex justify-between items-center">
                    <Link href="/dashboard">
                      <h1 className="text-2xl Unigoe-font text-[#0D4222] font-bold">
                        SENTS.
                      </h1>
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
                        <p className="text-sm text-gray-500">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="w-full flex justify-start">
                    <button
                      className="p-2 bg-gray-100 rounded-full cursor-pointer text-black dark:text-white dark:bg-[#39463E80]"
                      onClick={toggleTheme}
                    >
                      <MdOutlineLightMode
                        size={20}
                        className="hidden dark:block"
                      />
                      <BsFillMoonStarsFill size={20} className="dark:hidden" />
                    </button>
                  </div>
                  <ul className="w-full space-y-3">
                    {(isAdmin ? AdminLinks : UserLinks).map((link, index) => {
                      const Icon = link.icon;
                      const isActiveLink = link.activePaths.some(isActive);
                      return (
                        <li
                          key={index}
                          className={`flex justify-center items-center rounded-md space-x-2 px-4 py-2 cursor-pointer relative ${
                            isActiveLink ? 'bg-[#39463E] text-white' : ''
                          }`}
                        >
                          <Link
                            href={link.path}
                            className="flex gap-3 justify-start items-center w-full"
                          >
                            <Icon size={24} className="text-[#148c59]" />
                            <span className="text-lg">{link.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </DrawerHeader>
                <div className="flex flex-col justify-between h-full pb-4">
                  <div />
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    className="flex justify-center items-center space-x-2 p-4 cursor-pointer text-gray-400 hover:bg-gray-100 rounded-lg"
                  >
                    <IoIosLogOut size={24} />
                    <span>{loading ? 'Logging out...' : 'Logout'}</span>
                  </button>
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
