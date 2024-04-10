import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import Image from 'next/image';
import Link from 'next/link';
import { RiMenu3Fill } from 'react-icons/ri';
import { MdOutlineLightMode } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Add functionality to toggle dark mode in your app
  };

  return (
    <div className="w-full bg-white px-4 md:px-8 shadow py-4 rounded-b-xl md:rounded-bl-xl">
      <div className="container flex justify-between items-center space-x-4 md:space-x-0">
        <Link href="/dashboard" className="md:hidden">
          <h1 className="text-2xl text-[#0D4222] font-bold">SENTS.</h1>
        </Link>
        <div className="flex items-center text-gray-400 bg-gray-100 py-2 rounded-lg w-full md:w-1/3 overflow-hidden">
          <CiSearch className="ml-3 mr-2" />
          <input
            type="text"
            placeholder="Search for stocks & more"
            className="flex-grow px-2 py-1 bg-transparent focus:outline-none"
          />
        </div>
        <div className="hidden md:flex items-center">
          <div
            className="p-2 bg-gray-100 rounded-full cursor-pointer text-gray-200 dark:text-gray-800"
            onClick={handleDarkModeToggle}
          >
            {darkMode ? <MdOutlineLightMode size={20} /> : <FaMoon size={20} />}
          </div>
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
            <div className="ml-2">
              <p className="font-bold">User Name</p>
              <p className="text-sm text-gray-500">user.email@example.com</p>
            </div>
          </div>
        </div>
        <div className="md:hidden cursor-pointer" onClick={() => {}}>
          <RiMenu3Fill size={35} className="bg-gray-100 rounded-full p-2" />
        </div>
      </div>
    </div>
  );
};

export default Header;
