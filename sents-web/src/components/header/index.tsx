import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import Image from 'next/image';
import Link from 'next/link';
import { RiMenu3Fill } from 'react-icons/ri';
import { MdOutlineLightMode } from 'react-icons/md';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';

const Header = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className=" bg-white px-4 lg:px-14 shadow py-4 rounded-b-xl lg:rounded-b-none lg:rounded-bl-xl dark:bg-[#39463E80]">
      <div className="container flex justify-between items-center space-x-4 md:space-x-0">
        <div className="lg:hidden">
          <Link href="/dashboard">
            <h1 className="text-2xl text-[#0D4222] dark:text-[#E6F6F0] font-bold">
              SENTS.
            </h1>
          </Link>
        </div>
        <div className="flex items-center text-gray-400 bg-gray-100 py-2 rounded-lg w-full md:w-1/3 overflow-hidden dark:bg-[#39463E80]">
          <CiSearch className="ml-3 mr-2" />
          <input
            type="text"
            placeholder="Search for stocks & more"
            className="flex-grow px-2 py-1 bg-transparent focus:outline-none"
          />
        </div>
        <div className="hidden md:flex items-center">
          <button
            className="p-2 bg-gray-100 rounded-full cursor-pointer text-black dark:text-white dark:bg-[#39463E80]"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <MdOutlineLightMode size={20} />
            ) : (
              <BsFillMoonStarsFill size={20} />
            )}
          </button>
          <div className="flex items-center ml-4">
            <div className="relative w-[40px] h-[40px]">
              <Image
                src="https://source.unsplash.com/100x100/?user"
                alt="User"
                className="rounded-full object-cover"
                width={40}
                height={40}
              />
            </div>
            <div className="ml-2 dark:text-white">
              <p className="font-bold">User Name</p>
              <p className="text-sm text-gray-500">user.email@example.com</p>
            </div>
          </div>
        </div>
        <button className="md:hidden cursor-pointer" onClick={() => {}}>
          <RiMenu3Fill size={35} className="bg-gray-100 rounded-full p-2" />
        </button>
      </div>
    </div>
  );
};

export default Header;
