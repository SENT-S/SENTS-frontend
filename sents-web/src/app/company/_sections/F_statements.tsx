import React from 'react';
import { TfiDownload } from 'react-icons/tfi';

interface FinancialProps {
  data: any;
}

const financialStatements = [
  { name: 'Annual Report 2023', file: 'annual_report_2023.pdf' },
  { name: 'Q1 Financials 2023', file: 'Q1_financials_2023.pdf' },
  { name: 'Q2 Financials 2023', file: 'Q2_financials_2023.pdf' },
  { name: 'Q3 Financials 2023', file: 'Q3_financials_2023.pdf' },
];

const F_statements = ({ data }: FinancialProps) => {
  return (
    <div className="space-y-4 rounded-2xl bg-white px-8 py-4">
      <h1 className="text-2xl font-semibold">Financial Statements</h1>
      <ul className="list-none divide-y space-y-6">
        {financialStatements.map((statement, index) => (
          <li key={index} className="flex items-center justify-between p-3">
            <span>{statement.name}</span>
            <a href={`/path/to/documents/${statement.file}`} download>
              <TfiDownload
                className="text-green-600 text-lg bg-green-100 rounded-full p-2 cursor-pointer"
                size={30}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default F_statements;
