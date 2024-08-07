import React, { FC } from 'react';

import Header from '@/components/header';
import SideBar from '@/components/sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <div className="flex flex-col h-full min-h-screen">
    <div className="flex flex-grow overflow-y-auto">
      <div className="w-auto">
        <SideBar />
      </div>
      <div className="flex flex-col w-full h-auto space-y-8 overflow-y-auto">
        <div className="w-full z-50 top-0 sticky">
          <Header />
        </div>
        <main className="flex-grow w-full pb-4 space-y-8 bg-transparent lg:pr-4 lg:pl-0 px-2">
          {children}
        </main>
      </div>
    </div>
    {/* trade mark */}
    <div className="w-full mt-4 mb-4 flex justify-center items-center">
      <span className="text-sm text-gray-500">
        © {new Date().getFullYear()} Sents. All rights reserved.
      </span>
    </div>
  </div>
);

export default MainLayout;
