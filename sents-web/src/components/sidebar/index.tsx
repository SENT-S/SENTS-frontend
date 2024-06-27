'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { IoIosLogOut } from 'react-icons/io';
import { signOut } from 'next-auth/react';
import { LuLayoutDashboard } from 'react-icons/lu';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';
import { CustomSession } from '@/utils/types';
import { useSession } from 'next-auth/react';
import { FiPieChart } from 'react-icons/fi';
import { TbChartHistogram } from 'react-icons/tb';
import { Skeleton } from '@/components/ui/skeleton';

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
    activePaths: ['/dashboard', '/company', 'new_company', 'edit_company'],
  },
  {
    name: 'News',
    icon: HiOutlineNewspaper,
    path: '/news',
    activePaths: ['/news', 'create_news'],
  },
];

const SideBar = () => {
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isAdmin = session?.user?.role === 'admin';

  const isActive = (path: string) => pathname.includes(path);

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

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
          <ul className="absolute left-[-114px] -bottom-16 bg-white dark:bg-[#39463E80] rounded-r-3xl py-4">
            {status !== 'loading'
              ? (isAdmin ? AdminLinks : UserLinks).map((link, index) => {
                  const Icon = link.icon;
                  const isActiveLink = link.activePaths.some(isActive);
                  return (
                    <li
                      key={index}
                      className={`flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center space-x-2 px-6 py-4 cursor-pointer relative ${
                        isActiveLink ? 'text-[#148c59]' : 'text-gray-400'
                      }`}
                    >
                      <Link
                        href={link.path}
                        className={`${isAdmin ? 'flex items-center' : ''}`}
                      >
                        <Icon
                          size={isAdmin ? 20 : 30}
                          className={
                            isActiveLink ? 'text-[#148c59]' : 'text-gray-400'
                          }
                        />
                        <span
                          className={`${isAdmin ? 'ml-2 block' : 'hidden'}`}
                        >
                          {link.name}
                        </span>
                      </Link>
                      {isActiveLink && (
                        <span className="absolute right-0 bg-[#148c59] rounded-l-md h-6 w-1"></span>
                      )}
                    </li>
                  );
                })
              : Array.from({ length: 4 }).map((_, index) => (
                  <li
                    key={index}
                    className={`flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center space-x-2 px-6 py-4 cursor-pointer relative text-gray-400`}
                  >
                    <Skeleton className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#0e120f]" />
                    <Skeleton
                      className={`${isAdmin ? 'ml-2 w-20' : 'w-24'} h-8 rounded-xl bg-gray-200 dark:bg-[#0e120f]`}
                    />
                  </li>
                ))}
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="flex justify-center items-center space-x-2 p-4 cursor-pointer text-gray-400 hover:bg-gray-100 rounded-lg"
        >
          <IoIosLogOut size={24} />
          <span>{loading ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
