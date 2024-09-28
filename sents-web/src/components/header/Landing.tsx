import Link from 'next/link';
import { useTheme } from 'next-themes';
import React from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown, MdOutlineLightMode } from 'react-icons/md';
import { TfiWorld } from 'react-icons/tfi';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface LandingProps {
  session: {
    user: {
      image?: string;
      name?: string;
      email?: string;
    };
  } | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const Landing: React.FC<LandingProps> = ({ session, status }) => {
  const { theme, setTheme } = useTheme();
  const { image = '', name, email } = session?.user || {};

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
          <AuthLinks toggleTheme={toggleTheme} />
        ) : (
          <div className="flex items-center dark:text-white h-auto space-x-6 py-4 px-5 bg-[#E6F6F0] dark:bg-[#39463E80] rounded-full">
            <ThemeToggleButton toggleTheme={toggleTheme} theme={theme as string} />
            {status === 'loading' ? (
              <SkeletonProfile />
            ) : (
              <UserProfile image={image} name={name} email={email} />
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

// Theme Toggle Button Component
const ThemeToggleButton: React.FC<{ toggleTheme: () => void; theme: string }> = ({
  toggleTheme,
  theme,
}) => (
  <Button
    type="button"
    className="p-2 bg-gray-100 rounded-full cursor-pointer text-black dark:text-white dark:bg-[#39463E80]"
    onClick={toggleTheme}
  >
    {theme === 'dark' ? <MdOutlineLightMode size={20} /> : <BsFillMoonStarsFill size={20} />}
  </Button>
);

// User Profile Component
const UserProfile: React.FC<{ image: string; name?: string; email?: string }> = ({
  image,
  name,
  email,
}) => (
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
);

// Skeleton Profile Component for Loading State
const SkeletonProfile: React.FC = () => (
  <div className="flex items-center space-x-4 ml-2">
    <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-[#0e120f]" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-24 rounded-full bg-gray-200 dark:bg-[#0e120f]" />
      <Skeleton className="h-4 w-36 rounded-full bg-gray-200 dark:bg-[#0e120f]" />
    </div>
  </div>
);

// Auth Links Component
const AuthLinks: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => (
  <ul className="flex items-center dark:text-white h-auto space-x-6 py-4 px-5 bg-[#E6F6F0] dark:bg-[#39463E80] rounded-full">
    <li>
      <Link href="/login_register" className="p-3 rounded-xl bg-white dark:bg-[#39463E80]">
        Sign in
      </Link>
    </li>
    <li>
      <Link href="/login_register" className="p-3 rounded-xl bg-[#1EF1A5] dark:text-[#0D4222]">
        Sign Up
      </Link>
    </li>
    <li>
      <ThemeToggleButton toggleTheme={toggleTheme} theme={useTheme().theme as string} />
    </li>
    <li>
      <Button type="button" className="flex items-center mt-1 px-2">
        <TfiWorld className="text-[#0D4222] dark:text-white" />
        <MdOutlineKeyboardArrowDown className="text-[#0D4222] dark:text-white" />
      </Button>
    </li>
  </ul>
);

export default Landing;
