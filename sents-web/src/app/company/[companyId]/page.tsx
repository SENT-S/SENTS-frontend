'use client';
import React, { useState } from 'react';
import MainLayout from '@/components/layout';
import SubNav from '@/components/navigation/SubNav';
import Overview from '../_sections/Overview';
import Financial from '../_sections/Financials';
import News from '../_sections/News';
import About from '../_sections/About';
import F_statements from '../_sections/F_statements';
import Relations from '../_sections/Relations';
import Experts_Buy from '../_sections/Experts_Buy';

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
      <div className="space-y-8 container">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-4">
          <div className="space-y-8 col-span-3">
            <div className="w-full">
              <SubNav
                links={links}
                selectedLink={selectedLink}
                setSelectedLink={setSelectedLink}
              />
            </div>
            <div className="w-full h-auto rounded-2xl bg-white p-4 overflow-hidden">
              {renderSection()}
            </div>
          </div>
          <div className="col-span-2">
            <div className="w-full h-auto">
              {selectedLink === 'Overview' && <About data />}
              {selectedLink === 'Financials' && (
                <div className="space-y-8">
                  <F_statements data />
                  <Relations data />
                </div>
              )}
              {selectedLink === 'News' && <Experts_Buy />}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyDetails;
