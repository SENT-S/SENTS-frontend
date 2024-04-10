import React, { FC } from 'react';
import Header from '../header';
import SideBar from '../sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <div className="flex w-auto h-screen">
    <SideBar />
    <div className="flex flex-col flex-grow overflow-hidden">
      <Header />
      <main className="flex-grow w-full overflow-y-auto mt-4 px-4 pb-4 md:px-0 md:pr-4 space-y-4">
        <div className="space-y-8 container">{children}</div>
      </main>
    </div>
  </div>
);

export default MainLayout;
