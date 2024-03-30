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
        <div className="w-1/6">
          <Navigation />
        </div>
        <div className="w-5/6 h-full container pb-4">{children}</div>
      </div>
    </div>
  );
};

export default Main;
