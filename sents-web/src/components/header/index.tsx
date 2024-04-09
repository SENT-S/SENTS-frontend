import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaBell } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="w-full bg-white flex justify-between items-center px-8 py-4 rounded-bl-xl">
      <div className="flex items-center text-gray-400 w-1/3 bg-gray-100 py-2 rounded-lg">
        <CiSearch className="ml-3 mr-2" />
        <input
          type="text"
          placeholder="Search for stocks & more"
          className="flex-grow px-2 py-1 bg-transparent focus:outline-none"
        />
      </div>
      <div className="flex items-center">
        <FaBell
          className="text-gray-400 p-2 bg-gray-100 rounded-full"
          size={30}
        />
        <div className="flex items-center ml-4">
          <img
            src="https://source.unsplash.com/100x100/?user"
            alt="User"
            className="rounded-full w-10 h-10"
          />
          <div className="ml-2">
            <p className="font-bold">User Name</p>
            <p className="text-sm text-gray-500">user.email@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
