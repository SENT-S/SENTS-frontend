import React from 'react';
import { Header, Navigation } from '../components';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <div className="flex flex-col space-y-5 h-screen">
      <Header />
      <div className="flex flex-row gap-2 justify-start items-center flex-grow">
        <div className="w-1/6 hidden md:block">
          <Navigation />
        </div>
        <div className="md:w-5/6 h-full container">{children}</div>
      </div>
      <footer className="w-full text-center p-4">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} SENTS. All rights reserved.
        </p>
        <p className="text-xs text-gray-500">SENTS™</p>
      </footer>
    </div>
  );
};

export default Main;
