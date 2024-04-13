import React, { useState } from 'react';

interface NavProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const Nav = ({ selectedTab, setSelectedTab }: NavProps) => {
  return (
    <div className="flex justify-between mb-4">
      <button
        onClick={() => setSelectedTab('Sign In')}
        className={`px-6 py-2 rounded-md focus:outline-none ${selectedTab === 'Sign In' ? 'text-white bg-green-500 hover:bg-green-600' : 'text-gray-800 bg-white border border-gray-300 hover:bg-gray-100'}`}
      >
        Sign In
      </button>
      <button
        onClick={() => setSelectedTab('Sign Up')}
        className={`px-6 py-2 rounded-md focus:outline-none ${selectedTab === 'Sign Up' ? 'text-white bg-green-500 hover:bg-green-600' : 'text-gray-800 bg-white border border-gray-300 hover:bg-gray-100'}`}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Nav;
