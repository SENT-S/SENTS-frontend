'use client';
import React from 'react';
import Link from 'next/link';
import { IoIosLogOut } from 'react-icons/io';

const SideBar = () => {
  return (
    <div className="hidden flex-col w-64 h-full p-4 overflow-y-auto bg-transparent md:flex">
      <div className="flex items-center justify-center mb-4">
        <Link href="/dashboard">
          <h1 className="text-2xl text-[#0D4222] font-bold">SENTS.</h1>
        </Link>
      </div>
      <div className="flex flex-col w-full h-full justify-between items-center">
        <div></div>
        <button
          onClick={() => {}}
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
