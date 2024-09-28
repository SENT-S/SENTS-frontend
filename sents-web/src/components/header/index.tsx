'use client';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { MdOutlineLightMode } from 'react-icons/md';

import CustomDrawer from '../ui/customDrawer';

import { SearchBox } from './components';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useOutsideClick from '@/hooks/useOutsideClick';
import { getAllCompanies } from '@/utils/apiClient';
import { CustomSession, Company } from '@/utils/types';

const options = {
  keys: ['company_country', 'company_name', 'stock_symbol', 'sector_or_industry'],
  includeScore: true,
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<Company[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const isAdmin = useMemo(() => session?.user?.role === 'ADMIN', [session]);
  const fuse = useMemo(() => new Fuse(searchData, options), [searchData]);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    await signOut({ redirect: true, callbackUrl: '/login_register' });
    setLoading(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const isActive = useCallback((path: string) => pathname.startsWith(path), [pathname]);

  useOutsideClick(searchRef, () => {
    setResults([]);
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await getAllCompanies();
        if (response && Array.isArray(response)) {
          const flattenedData = response.flatMap(
            (countryData) => countryData.list_of_companies || [],
          );
          setSearchData(flattenedData);
        } else {
          console.error('Error: Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value;
      setQuery(searchTerm);
      if (searchTerm.trim() !== '') {
        const result = fuse.search(searchTerm);
        setResults(result.map((res) => res.item));
      } else {
        setResults([]);
      }
    },
    [fuse],
  );

  return (
    <div className="bg-white z-50 shadow py-4 rounded-b-xl lg:rounded-b-none lg:rounded-bl-xl dark:bg-[#39463e] sticky top-0">
      <div className="px-4 flex justify-between items-center space-x-4 lg:space-x-0">
        <div className="lg:hidden">
          <Link href="/dashboard">
            <h1 className="text-xl lg:text-2xl Unigoe-font text-[#0D4222] dark:text-[#E6F6F0] font-bold">
              SENTS.
            </h1>
          </Link>
        </div>

        {/* Search Box */}
        {!isAdmin && (
          <SearchBox
            searchData={searchData}
            query={query}
            handleSearch={handleSearch}
            results={results}
            setResults={setResults}
            setQuery={setQuery}
            searchRef={searchRef}
            loading={loading}
          />
        )}
        <div className="hidden lg:flex" />
        {/* Theme Toggle and User Avatar */}
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
            <SkeletonComponent />
          ) : (
            <UserAvatar
              image={session?.user?.image}
              name={session?.user?.name}
              email={session?.user?.email}
            />
          )}
        </div>

        {/* Mobile Drawer */}
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
  );
};

// User Avatar Component
const UserAvatar: React.FC<{ image?: string; name?: string; email?: string }> = ({
  image,
  name,
  email,
}) => (
  <div className="flex items-center ml-4 dark:text-white">
    <Avatar style={{ boxShadow: '0 0 0 1px #148c59' }}>
      <AvatarImage src={image} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div className="ml-2">
      <p className="font-bold">{name}</p>
      <p className="text-sm text-gray-500">{email}</p>
    </div>
  </div>
);

// Skeleton Component for Loading Avatar
const SkeletonComponent: React.FC = () => (
  <div className="flex items-center space-x-4 ml-2">
    <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-[#0e120f]" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-24 rounded-full bg-gray-200 dark:bg-[#0e120f]" />
      <Skeleton className="h-4 w-36 rounded-full bg-gray-200 dark:bg-[#0e120f]" />
    </div>
  </div>
);

export default Header;
