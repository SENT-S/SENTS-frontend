'use client';
import React from 'react';
import { TfiWorld } from 'react-icons/tfi';
import { useTheme } from 'next-themes';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown, MdOutlineLightMode } from 'react-icons/md';
import Link from 'next/link';

export default function Landing() {
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
            <button className="mt-1" onClick={toggleTheme}>
              <MdOutlineLightMode size={20} className="hidden dark:block" />
              <BsFillMoonStarsFill size={20} className="dark:hidden" />
            </button>
          </li>
          <li>
            <button className="flex items-center">
              <TfiWorld className="text-[#0D4222] dark:text-white" />
              <MdOutlineKeyboardArrowDown className="text-[#0D4222] dark:text-white" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
