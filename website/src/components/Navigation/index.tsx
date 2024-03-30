import { NavLink } from 'react-router-dom';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsGraphUpArrow } from 'react-icons/bs';
import { AiOutlineDashboard } from 'react-icons/ai';

const Index = () => {
  return (
    <nav className="bg-white drop-shadow-md flex flex-col justify-center items-center rounded-r-xl space-y-12 py-12 w-full max-w-20 transition-all duration-500 ease-in-out fixed left-0 top-1/2 transform -translate-y-1/2">
      <div className="relative w-full flex justify-center items-center">
        <NavLink to="/">
          {({ isActive }) => (
            <div
              className={`flex justify-center items-center transition-colors duration-300 ease-in-out ${isActive ? 'text-blue-600' : 'hover:text-gray-400 text-gray-200'}`}
            >
              <BiSolidDashboard
                size={25}
                className="transition-transform duration-500 ease-in-out transform hover:scale-125"
              />
              {isActive && (
                <span className="absolute rounded-l-lg w-1 h-5 right-0 bg-blue-600 transition-all duration-500 ease-in-out" />
              )}
            </div>
          )}
        </NavLink>
      </div>
      <div className="relative w-full flex justify-center items-center">
        <NavLink to="/financials">
          {({ isActive }) => (
            <div
              className={`flex justify-center items-center transition-colors duration-300 ease-in-out ${isActive ? 'text-blue-600' : 'hover:text-gray-400 text-gray-200'}`}
            >
              <BsGraphUpArrow
                size={25}
                className="transition-transform duration-500 ease-in-out transform hover:scale-125"
              />
              {isActive && (
                <span className="absolute rounded-l-lg w-1 h-5 right-0 bg-blue-600 transition-all duration-500 ease-in-out" />
              )}
            </div>
          )}
        </NavLink>
      </div>
      <div className="relative w-full flex justify-center items-center">
        <NavLink to="/graph">
          {({ isActive }) => (
            <div
              className={`flex justify-center items-center transition-colors duration-300 ease-in-out ${isActive ? 'text-blue-600' : 'hover:text-gray-400 text-gray-200'}`}
            >
              <AiOutlineDashboard
                size={25}
                className="transition-transform duration-500 ease-in-out transform hover:scale-125"
              />
              {isActive && (
                <span className="absolute rounded-l-lg w-1 h-5 right-0 bg-blue-600 transition-all duration-500 ease-in-out" />
              )}
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Index;
