import React from 'react';
import { TfiWorld } from 'react-icons/tfi';
import { useTheme } from 'next-themes';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown, MdOutlineLightMode } from 'react-icons/md';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonComponent = ({ height, width }: { height: string; width: string }) => (
  <Skeleton className={`h-${height} w-${width} rounded-full bg-gray-200 dark:bg-[#0e120f]`} />
);

export default function Landing({ session, status }: { session: any; status: string }) {
  const { image = '', name, email } = session?.user || {};
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex justify-between flex-wrap items-center pt-6 z-50">
      <h1 className="text-3xl Unigoe-font tracking-wider text-[#0D4222] dark:text-[#E6F6F0]">
        SENTS.
      </h1>
      <nav className="max-sm:flex max-sm:justify-center max-sm:w-full">
        {!session ? (
          <ul className="flex items-center dark:text-white h-auto space-x-6 py-4 px-5 bg-[#E6F6F0] dark:bg-[#39463E80] rounded-full">
            <li>
              <Link
                href="/login_register"
                className="p-3 rounded-xl bg-white dark:bg-[#39463E80] cursor-pointer"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                href="/login_register"
                className="p-3 rounded-xl bg-[#1EF1A5] dark:text-[#0D4222] cursor-pointer"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Button type="button" className="mt-1 p-0" onClick={toggleTheme}>
                <MdOutlineLightMode size={20} className="hidden dark:block" />
                <BsFillMoonStarsFill size={20} className="dark:hidden" />
              </Button>
            </li>
            <li>
              <Button type="button" className="flex items-center mt-1 p-0">
                <TfiWorld className="text-[#0D4222] dark:text-white" />
                <MdOutlineKeyboardArrowDown className="text-[#0D4222] dark:text-white" />
              </Button>
            </li>
          </ul>
        ) : (
          <div className="flex items-center dark:text-white h-auto space-x-6 py-4 px-5 bg-[#E6F6F0] dark:bg-[#39463E80] rounded-full">
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
        )}
      </nav>
    </header>
  );
}
