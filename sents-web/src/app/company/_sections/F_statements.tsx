import React from 'react';
import { useRouter } from 'next/navigation';
import { RiArrowRightSLine } from 'react-icons/ri';
import { TfiDownload } from 'react-icons/tfi';
import { financialStatements, mockdata } from '@/services/mockData/mock';

interface FinancialProps {
  data: any;
}

const F_statements = ({ data }: FinancialProps) => {
  const router = useRouter();

  const handleStockClick = (id: number) => {
    router.push(`/company/${id}`);
  };

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
        <h1 className="text-2xl font-semibold">Financial Statements</h1>
        <ul className="list-none divide-y divide-[#E6EEEA] dark:divide-[#39463E] space-y-6">
          {financialStatements.map((statement, index) => (
            <li key={index} className="flex items-center justify-between p-3">
              <span>{statement.name}</span>
              <a href={`/path/to/documents/${statement.file}`} download>
                <TfiDownload
                  className="text-green-600 text-lg bg-green-100 dark:bg-[#0E120F] rounded-full p-3 cursor-pointer"
                  size={40}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
        <h1 className="text-2xl font-semibold">Related Stocks</h1>
        <ul className="list-none divide-y divide-[#E6EEEA] dark:divide-[#39463E]  space-y-3">
          {mockdata.map(stock => (
            <li
              key={stock.id}
              className="flex justify-between items-center py-2 cursor-pointer"
              onClick={() => handleStockClick(stock.id)}
            >
              <div>
                <p className="font-medium">{stock.name}</p>
                <p className="text-gray-500">{stock.symbol}</p>
              </div>
              <RiArrowRightSLine size={24} className="text-green-600" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default F_statements;
