import React, { FC } from 'react';
import Header from '../header';
import SideBar from '../sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <div className="flex h-screen overflow-y-auto">
    <div className="w-auto">
      <SideBar />
    </div>
    <div className="flex flex-col w-full h-auto overflow-y-auto">
      <div className="w-full">
        <Header />
      </div>
      <main className="flex-grow w-full mt-4 px-4 pb-4 lg:px-0 lg:pr-10 space-y-4 bg-transparent">
        <div className="space-y-8">{children}</div>
      </main>
    </div>
  </div>
);

export default MainLayout;
