import React, { FC } from 'react';

import Header from '@/components/header';
import SideBar from '@/components/sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <div className="flex flex-col h-full min-h-dvh">
    <div className="flex flex-grow overflow-y-auto">
      <div className="w-auto">
        <SideBar />
      </div>
      <div className="flex flex-col w-full h-[calc(100vh-40px)] space-y-8 overflow-y-auto">
        <div className="w-full z-50 top-0 sticky">
          <Header />
        </div>
        <main className="container flex-grow w-full space-y-8 bg-transparent">{children}</main>
        {/* trade mark */}
        <div className="w-full mt-4 mb-4 flex justify-center items-center">
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()} Sents. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default MainLayout;
