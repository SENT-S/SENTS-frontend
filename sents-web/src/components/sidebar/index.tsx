'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoIosLogOut } from 'react-icons/io';

const SideBar = () => {
  const router = useRouter();
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
        <div></div>
        <button
          onClick={() => {
            router.push('/landing');
          }}
          className="flex justify-center items-center space-x-2 p-4 cursor-pointer text-gray-400 hover:bg-gray-100 rounded-lg"
        >
          <IoIosLogOut size={24} />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
