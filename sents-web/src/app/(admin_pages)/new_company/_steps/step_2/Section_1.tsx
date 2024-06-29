import React, { useState } from 'react';
import { GoPlusCircle } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import ModalForms from '@/components/admin/forms/layout';
import AddNewStatementContent from '@/components/admin/forms/contents/Add_new_statement';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { financialStatements } from '@/services/mockData/mock';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pagination from '@/components/pagination';
import formatData from '@/utils/formatTableData';

type FormattedMetric = {
  metrics: string;
  [key: string]: string | number;
};

type TableData = {
  [key: string]: FormattedMetric[];
};

const Section_1 = () => {
  const [selectedLink, setSelectedLink] = useState('Financial Summary');
  const [FinancialData, setFinancialData] = useState({} as any);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 5 },
    (_, i) => `FY’${String(currentYear - i - 1).slice(-2)}`,
  ).reverse();

  const TableData: TableData = {
    'Financial Summary': formatData(FinancialData['Financial Summary' as any]),
    'Profit & Loss': formatData(FinancialData['Profit & Loss' as any]),
    'Balance Sheet': formatData(FinancialData['Balance Sheet' as any]),
    'Cashflow Statement': formatData(
      FinancialData['Cashflow Statement' as any],
    ),
    'Financial Analysis': formatData(
      FinancialData['Financial Analysis' as any],
    ),
  };

  const selectedData = TableData[selectedLink];

  return (
    <div className="space-y-8">
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0]">
        Add Financials
      </h2>
      <div className="flex gap-4 items-center">
        <Button
          className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
          onClick={() => null}
        >
          Add row <GoPlusCircle className="ml-3" size={18} />
        </Button>
        <Button
          className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
          onClick={() => null}
        >
          Add column <GoPlusCircle className="ml-3" size={18} />
        </Button>
      </div>
      {/* table */}
      <Pagination
        items={selectedData}
        itemsPerPage={10}
        render={currentItems => (
          <div className="relative shadow-md rounded-2xl w-full h-auto">
            <Table className="min-w-full text-black dark:text-white bg-[#1EF1A5]">
              <TableHeader>
                <TableRow className="text-black text-lg font-bold">
                  <TableHead className="w-1/6 py-2">Metrics</TableHead>
                  {years.map(year => (
                    <TableHead key={year} className="w-[13%] py-2">
                      {year}
                    </TableHead>
                  ))}
                  <TableHead className="w-1/6 py-2">Occurrence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white dark:bg-[#39463E]">
                {currentItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  currentItems.map(
                    (
                      item: { [key: string]: string | number },
                      index: number,
                    ) => (
                      <TableRow
                        key={index}
                        className={`
            ${index === currentItems.length - 1 ? 'rounded-b-xl' : ''}
            hover:bg-[#E6F6F0] dark:hover:bg-[#8D9D9380] cursor-pointer
          `}
                      >
                        <TableCell className="py-2">{item.metrics}</TableCell>

                        {years.map(year => (
                          <TableCell key={year} className="flex-grow py-2">
                            {isNaN(Number(item[year]))
                              ? '__'
                              : Number(item[year]).toLocaleString()}
                          </TableCell>
                        ))}
                      </TableRow>
                    ),
                  )
                )}
              </TableBody>
            </Table>
          </div>
        )}
      />

      {/* statements */}
      <div>
        <h2 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">
          Financial Statements
        </h2>
        {/* List statements */}
        <ul className="list-none items-center">
          {financialStatements.length > 0 ? (
            financialStatements.map((statement, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2  ${index !== financialStatements.length - 1 ? 'border-b border-[#E6EEEA] dark:border-[#39463E]' : ''}`}
              >
                <span>{statement.name}</span>
                <ModalForms
                  FormTitle="Are you sure you want to delete document"
                  ButtonStyle="p-0 m-0"
                  Icon={
                    <div className="rounded-full flex items-center p-2 bg-[#F5ECEC]">
                      <RiDeleteBin6Line
                        className="text-[#EA0000] cursor-pointer"
                        size={20}
                      />
                    </div>
                  }
                  onSubmit={() => null}
                  onCancel={() => null}
                  SubmitText="Yes"
                  CancelText="No"
                  SubmitButtonStyle="bg-[#EA0000]"
                />
              </li>
            ))
          ) : (
            <div className="flex items-center justify-center h-full w-full space-y-10 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
              <p>No data available.</p>
            </div>
          )}
        </ul>

        <div className="flex justify-center items-center">
          <ModalForms
            ButtonText="Add New Statement"
            FormTitle="Add a New Statement"
            onSubmit={() => null}
            ButtonStyle="bg-[#39463E] text-white p-4 rounded-2xl hover:bg-[#39463ece]"
          >
            <AddNewStatementContent />
          </ModalForms>
        </div>
      </div>
    </div>
  );
};

export default Section_1;
