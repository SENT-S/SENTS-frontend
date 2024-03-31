import { IoNotifications } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import Profile from '/images/profile.jpg';
import { useEffect, useState, useRef } from 'react';
import { IoMdMenu } from 'react-icons/io';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuref = useRef<HTMLDivElement>(null);

  // hide menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuref.current && !menuref.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuref]);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      className={`flex flex-row z-50 gap-2 drop-shadow-md rounded-tl-xl transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white fixed top-0 left-0 w-full z-50' : ''} `}
    >
      <div className="flex justify-center w-1/6 items-center bg-transparent p-5 hidden md:block">
        <Link to="/" className="text-3xl font-bold">
          SENTS.
        </Link>
      </div>
      <div className="w-full md:w-5/6 flex flex-row justify-between items-center space-x-4 bg-white px-2 py-2 md:px-16 md:py-5 md:rounded-bl-xl">
        {/* Logo name */}
        <div className="flex justify-center items-center bg-transparent md:hidden">
          <Link to="/" className="text-lg font-bold">
            SENTS.
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer">
          <CiSearch color="gray" size={18} />
          <input
            className="bg-transparent outline-none border-none text-sm text-gray-500 w-full md:w-80"
            type="text"
            placeholder="Search for stocks & more"
          />
        </div>
        <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
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
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 bg-gray-100 rounded-full cursor-pointer"
          >
            <IoMdMenu color="gray" size={24} />
          </button>
          {menuOpen && (
            <div
              ref={menuref}
              className="absolute right-0 w-48 py-2 mt-4 mr-2 bg-white rounded-lg shadow-xl"
            >
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                to="/financials"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              >
                Financials
              </Link>
              <Link
                to="/guage"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              >
                Gauge
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Index;
