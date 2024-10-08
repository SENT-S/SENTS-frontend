'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import React, { useState, useMemo, useCallback } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { ScaleLoader } from 'react-spinners';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UserLinks, AdminLinks } from '@/utils/Links';
import { CustomSession } from '@/utils/types';

// Memoized Link Button Component
const LinkButton = React.memo(({ link, isActiveLink, isAdmin }: any) => {
  const Icon = link.icon;

  return (
    <Button
      type="button"
      className={`flex shadow-none w-full ${
        isAdmin ? 'justify-between px-8 py-6' : 'justify-center px-8 py-9'
      } items-center space-x-2 relative ${isActiveLink ? 'text-[#148c59]' : 'text-gray-400'}`}
      disabled={link.disable}
    >
      <Link href={link.path} className={`${isAdmin ? 'flex items-center' : ''}`}>
        <Icon
          size={isAdmin ? 25 : 30}
          className={isActiveLink ? 'text-[#148c59]' : 'text-gray-400'}
        />
        <span className={`${isAdmin ? 'ml-2' : 'hidden'}`}>{link.name}</span>
      </Link>
      {isActiveLink && <span className="absolute right-0 bg-[#148c59] rounded-l-md h-6 w-1"></span>}
    </Button>
  );
});
LinkButton.displayName = 'LinkButton';

// Sidebar Component
const SideBar = () => {
  const router = useRouter();
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isAdmin = session?.user?.role === 'ADMIN';

  // Determine active path
  const isActive = useCallback(
    (path: string) => {
      return (pathname === '/' && path === '/dashboard') || pathname.includes(path);
    },
    [pathname],
  );

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await signOut({
        redirect: false,
        callbackUrl: '/login_register',
      });
      router.push(response.url);
    } finally {
      setLoading(false);
    }
  };

  // Memoized Links to prevent re-renders
  const links = useMemo(() => (isAdmin ? AdminLinks : UserLinks), [isAdmin]);

  return (
    <div className="hidden lg:flex flex-col w-56 h-full p-4 bg-transparent">
      <div className="flex items-center justify-center mb-4">
        <Link href="/dashboard">
          <h1 className="text-3xl Unigoe-font tracking-wider text-[#0D4222] dark:text-[#E6F6F0]">
            SENTS.
          </h1>
        </Link>
      </div>
      <div className="flex flex-col w-full h-full justify-between items-center">
        <div />
        <div className="relative">
          <div className="absolute left-[-114px] -bottom-16 shadow-sm bg-white dark:bg-[#39463E80] rounded-r-3xl py-4">
            {status !== 'loading'
              ? links.map((link, index) => (
                  <LinkButton
                    key={index}
                    link={link}
                    isAdmin={isAdmin}
                    isActiveLink={link.activePaths.some((path) => isActive(path))}
                  />
                ))
              : Array.from({ length: 4 }).map((_, index) => (
                  <li
                    key={index}
                    className="flex justify-start items-center space-x-2 px-6 py-4 cursor-pointer relative text-gray-400"
                  >
                    <Skeleton className="w-8 h-8 rounded-md bg-gray-200 dark:bg-[#0e120f]" />
                    <Skeleton className="ml-2 w-24 h-8 rounded-xl bg-gray-200 dark:bg-[#0e120f]" />
                  </li>
                ))}
          </div>
        </div>
        <Button
          type="button"
          onClick={handleLogout}
          className="flex shadow-none justify-center items-center space-x-2 p-4 text-gray-400 hover:bg-gray-100 rounded-lg"
        >
          <IoIosLogOut size={24} />
          <span>
            {loading ? (
              <ScaleLoader color="#a3a3a3" loading={loading} height={16} className="mt-1" />
            ) : (
              'Logout'
            )}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SideBar);
