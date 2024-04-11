'use client';
import React, { useState } from 'react';
import MainLayout from '@/components/layout';
import SubNav from '@/components/navigation/SubNav';
import Overview from '../_sections/Overview';
import Financial from '../_sections/Financials';
import News from '../_sections/News';
import O_Right_Panel from '../_sections/panels/O_Right_Panel';
import F_Right_Panel from '../_sections/panels/F_Right_Panel';
import N_Right_Panel from '../_sections/panels/N_Right_Panel';

interface CompanyDetailsProps {
  params: { companyId: string };
}

const links = ['Overview', 'Financials', 'News'];

const CompanyDetails = ({ params }: CompanyDetailsProps) => {
  const companyId = params.companyId;
  const [selectedLink, setSelectedLink] = useState(links[0]);

  const renderSection = () => {
    switch (selectedLink) {
      case 'Overview':
        return <Overview data />;
      case 'Financials':
        return <Financial data />;
      case 'News':
        return <News data />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        <div className="col-span-1 lg:col-span-2 space-y-8">
          <SubNav
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          />
          <div className="rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] p-4 overflow-hidden">
            {renderSection()}
          </div>
        </div>
        <div className="col-span-1 w-auto">
          <div className="w-full flex justify-center">
            {selectedLink === 'Overview' && <O_Right_Panel data />}
            {selectedLink === 'Financials' && <F_Right_Panel data />}
            {selectedLink === 'News' && <N_Right_Panel />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyDetails;
