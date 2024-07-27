import React, { FC } from 'react';
import Header from '@/components/header';
import SideBar from '@/components/sidebar';
import Head from 'next/head';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const MainLayout: FC<MainLayoutProps> = ({ children, title, description }) => (
  <div className="flex h-full overflow-y-auto">
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
    <div className="w-auto">
      <SideBar />
    </div>
    <div className="flex flex-col w-full h-auto overflow-y-auto">
      <div className="w-full z-50 top-0 sticky">
        <Header />
      </div>
      <main className="flex-grow w-full mt-4 px-4 pb-4 lg:px-0 lg:pr-10 space-y-4 bg-transparent">
        <div className="space-y-8">{children}</div>
      </main>
      {/* trade mark */}
      <div className="w-full mt-4 mb-4 flex justify-center items-center">
        <span className="text-sm text-gray-500">
          © {new Date().getFullYear()} Sents. All rights reserved.
        </span>
      </div>
    </div>
  </div>
);

export default MainLayout;
