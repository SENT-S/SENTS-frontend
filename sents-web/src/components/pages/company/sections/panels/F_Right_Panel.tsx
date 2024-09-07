import { useRouter } from 'next/navigation';
import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { TfiDownload } from 'react-icons/tfi';

import { mockdata } from '@/services/mockData/mock';

interface FinancialProps {
  data: any;
}

const F_Right_Panel = ({ data }: FinancialProps) => {
  const router = useRouter();

  const handleStockClick = (id: number) => {
    router.push(`/company/${id}`);
  };

  const companyDocuments = data?.company_documents
    .map((document: { docid: number; docurl: string }) => {
      try {
        const url = new URL(document.docurl);
        return {
          url: document.docurl,
          hostname: url.pathname.split('/').pop(),
        };
      } catch (error) {
        console.error(`Invalid URL: ${document.docurl}`, error);
        return null;
      }
    })
    .filter(Boolean); // Filter out any null values

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4 rounded-2xl h-auto overflow-y-auto max-h-[395px] bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
        <h1 className="text-2xl font-semibold">Financial Statements</h1>
        <ul className="list-none divide-y divide-[#E6EEEA] dark:divide-[#39463E] space-y-6 scroll-smooth overflow-y-auto">
          {companyDocuments.length !== 0 ? (
            companyDocuments?.map((doc: any, index: number) => (
              <li key={index} className="flex items-center justify-between p-3">
                <span className="min-w-[200px]">
                  {doc.hostname.length > 25 ? doc.hostname.slice(0, 25) + '...' : doc.hostname}
                </span>
                <a href={doc.url} download target="_blank" rel="noreferrer">
                  <TfiDownload
                    className="text-green-600 text-lg bg-green-100 dark:bg-[#0E120F] rounded-full p-3 cursor-pointer"
                    size={40}
                  />
                </a>
              </li>
            ))
          ) : (
            <div className="flex items-center justify-center h-full w-full space-y-10 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
              <p>No data available.</p>
            </div>
          )}
        </ul>
      </div>

      <div className="space-y-4 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
        <h1 className="text-2xl font-semibold">Related Stocks</h1>
        <ul className="list-none divide-y divide-[#E6EEEA] dark:divide-[#39463E]  space-y-3">
          {mockdata.length !== 0 ? (
            mockdata.map((stock) => (
              <li key={stock.id} className="py-2">
                <button
                  type="button"
                  className="flex justify-between items-left w-full cursor-pointer"
                  onClick={() => handleStockClick(stock.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleStockClick(stock.id);
                    }
                  }}
                >
                  <div>
                    <p className="font-medium">{stock.name}</p>
                    <p className="text-gray-500">{stock.symbol}</p>
                  </div>
                  <RiArrowRightSLine size={24} className="text-green-600 dark:text-[#8D9D93]" />
                </button>
              </li>
            ))
          ) : (
            <div className="flex items-center justify-center h-full w-full space-y-10 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
              <p>No data available.</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default F_Right_Panel;
