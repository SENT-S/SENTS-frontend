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
      <div className="flex flex-col w-full h-[calc(100vh-40px)] space-y-8 mb-2 overflow-y-auto">
        <div className="w-full z-50 top-0 sticky">
          <Header />
        </div>
        <main className="container flex-grow w-full space-y-8 bg-transparent">{children}</main>
        {/* trade mark */}
        <footer className="w-full flex justify-center items-center py-4">
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()} Sents. All rights reserved.
          </span>
        </footer>
      </div>
    </div>
  </div>
);

export default MainLayout;
