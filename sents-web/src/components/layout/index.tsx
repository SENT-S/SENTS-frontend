import React, { FC } from 'react';
import Header from '../header';
import SideBar from '../sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <div className="flex gap h-screen">
    <SideBar />
    <div className="flex flex-col flex-grow overflow-hidden">
      <Header />
      <main className="flex-grow overflow-y-auto mt-4 space-y-4">
        {children}
      </main>
    </div>
  </div>
);

export default MainLayout;
