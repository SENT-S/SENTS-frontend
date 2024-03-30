import { IoNotifications } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import Profile from '@public/images/profile.jpg';
import { useEffect, useState } from 'react';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 0;
      setIsScrolled(isScrolled);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-row gap-2 drop-shadow-md rounded-tl-xl transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white fixed top-0 left-0 w-full z-50' : ''} `}
    >
      <div className="flex justify-center w-1/6 items-center bg-transparent p-5">
        <Link to="/" className="text-3xl font-bold">
          SENTS.
        </Link>
      </div>
      <div className="w-5/6 flex flex-col md:flex-row justify-between items-center space-x-4 bg-white px-4 md:px-16 py-5 md:rounded-bl-xl">
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer">
          <CiSearch color="gray" size={18} />
          <input
            className="bg-transparent outline-none border-none text-sm text-gray-500 w-full md:w-80"
            type="text"
            placeholder="Search for stocks & more"
          />
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="p-2 bg-gray-100 rounded-full cursor-pointer">
            <IoNotifications color="gray" size={13} />
          </div>
          <div className="flex space-x-4 justify-center items-center">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={Profile}
              alt="User Avatar"
            />
            <div>
              <p className="-mb-1">Benedict Inyangsam</p>
              <p className="text-md text-gray-500">benedictinya@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
