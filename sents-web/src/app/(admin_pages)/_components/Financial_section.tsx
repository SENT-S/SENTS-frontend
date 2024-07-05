'use client';
import React, { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/pagination';
import SubNav from '@/components/admin/Navs/SubNav';
import { FiEdit } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { financialStatements } from '@/services/mockData/mock';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ModalForms from '@/components/admin/modal';
import AddNewStatementContent from '@/components/admin/Add_new_statement';
import { formatData } from '@/utils/tableFunctions';
import { getYearRanges, getRangeYears } from '@/utils/tableFunctions';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/utils/types';
import { MdDone } from 'react-icons/md';
import { GoPlusCircle } from 'react-icons/go';
import Add_new_metric from '@/components/admin/Add_new_metric';
import { GrSubtractCircle } from 'react-icons/gr';

type FormattedMetric = {
  metrics: string;
  [key: string]: string | number;
};

type TableData = {
  [key: string]: FormattedMetric[];
};

type Row = {
  metrics: string;
  category: string;
  [key: string]: string;
};

const category = [
  'Financial Summary',
  'Profit & Loss',
  'Balance Sheet',
  'Cashflow Statement',
  'Financial Analysis',
];

const metrics = [
  'Revenue (UGX M)',
  'EBITDA (UGX M)',
  'EBIT (UGX M)',
  'Net Income (UGX M)',
  'Dep & Amort (UGX M)',
  'Net Finance Costs',
  'OPEX (UGX M)',
  'COGS (UGX M)',
  'GP (UGX M)',
  'Income tax',
];

const Financial_section = ({
  FinancialData,
  companyID,
}: {
  FinancialData: any;
  companyID: any;
}) => {
  const { data: session } = useSession() as {
    data: CustomSession;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
  const [selectedLink, setSelectedLink] = useState('Financial Summary');
  const [showEdit, setShowEdit] = useState(false);
  const yearRanges = getYearRanges();

  const [yearRange, setYearRange] = useState(yearRanges[0]);
  const [newYears, setNewYears] = useState<string[]>([]);

  useEffect(() => {
    const rangeYears = getRangeYears(yearRange);
    setNewYears(rangeYears);
  }, [yearRange]);

  // Initialize rows state with one empty row
  const [rows, setRows] = useState<Row[]>([getEmptyRow(newYears)]);

  function getEmptyRow(years: string[]) {
    let row: Row = { metrics: '', category: '' };
    years.forEach(year => {
      const actualYear = '20' + year.slice(3);
      row[actualYear] = '';
    });
    return row;
  }

  // Function to handle adding a new row
  const addRow = () => {
    setRows(prevRows => [...prevRows, getEmptyRow(newYears)]);
  };

  // Function to handle input change in the table
  const handleInputChange = (e: any, rowIndex: number, column: any) => {
    const value = e.target.value;
    setRows(prevRows => {
      return prevRows.map((row, index) => {
        if (index === rowIndex) {
          // If the column is a fiscal year, save the actual year instead
          if (column.startsWith('FY’')) {
            const actualYear = '20' + column.slice(3);
            return { ...row, [actualYear]: value };
          } else {
            return { ...row, [column]: value };
          }
        } else {
          return row;
        }
      });
    });
  };

  // Function to handle select change in the table
  const handleSelectChange = (value: any, rowIndex: number, column: any) => {
    setRows(prevRows => {
      return prevRows.map((row, index) => {
        if (index === rowIndex) {
          // If the column is a fiscal year, save the actual year instead
          if (column.startsWith('FY’')) {
            const actualYear = '20' + column.slice(3);
            return { ...row, [actualYear]: value };
          } else {
            return { ...row, [column]: value };
          }
        } else {
          return row;
        }
      });
    });
  };

  // Function to handle clearing a row
  const clearRow = (rowIndex: number) => {
    setRows(prevRows => prevRows.filter((_, index) => index !== rowIndex));
  };

  const handleEditCompany = () => {
    setShowEdit(!showEdit);
  };

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

  const renderTableRow = (row: Row, rowIndex: number) => {
    if (showEdit) {
      // Render input fields
      return (
        <TableRow key={rowIndex}>
          <TableCell className="text-center">
            <Select
              onValueChange={value =>
                handleSelectChange(value, rowIndex, 'metrics')
              }
              defaultValue={row.metrics}
            >
              <SelectTrigger className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#39463E] rounded-xl">
                <SelectValue
                  placeholder="Metrics"
                  className="text-center w-full"
                >
                  {row.metrics}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
                {metrics.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TableCell>
          {newYears.map((year, yearIndex) => (
            <TableCell key={year} className="text-center">
              <Input
                type="text"
                value={row[year]}
                className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#39463E] rounded-xl"
                onChange={e =>
                  handleInputChange(e, rowIndex, '20' + year.slice(3))
                }
              />
            </TableCell>
          ))}
          <TableCell className="text-center">
            <Select
              onValueChange={value =>
                handleSelectChange(value, rowIndex, 'category')
              }
              value={row.category}
            >
              <SelectTrigger className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#39463E] rounded-xl">
                <SelectValue
                  placeholder="Category"
                  className="text-center w-full"
                >
                  {row.category}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
                {category.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TableCell>
          {rows.length > 1 && (
            <TableCell className="text-center">
              <Button onClick={() => clearRow(rowIndex)}>
                <GrSubtractCircle className="text-[#EA0000]" size={20} />
              </Button>
            </TableCell>
          )}
        </TableRow>
      );
    } else {
      // Render table data
      return (
        <TableRow key={rowIndex}>
          <TableCell className="text-left">{row.metrics}</TableCell>
          {newYears.map((year, yearIndex) => (
            <TableCell key={year} className="text-center">
              {isNaN(Number(row[year]))
                ? '__'
                : Number(row[year]).toLocaleString()}
            </TableCell>
          ))}
        </TableRow>
      );
    }
  };

  return (
    <div className="space-y-8">
      <SubNav
        links={[
          'Financial Summary',
          'Profit & Loss',
          'Balance Sheet',
          'Cashflow Statement',
          'Financial Analysis',
        ]}
        selectedLink={selectedLink}
        setSelectedLink={setSelectedLink}
        bgColor={false}
      />

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-4">
          {showEdit ? (
            <Button
              className="bg-[#148C59] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#148C59ed9] hover:text-white"
              onClick={handleEditCompany}
            >
              Done <MdDone className="ml-3" size={20} />
            </Button>
          ) : (
            <Button
              className="bg-[#39463E] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#46554c] hover:text-[39463E]"
              onClick={() => setShowEdit(!showEdit)}
            >
              Edit Table <FiEdit className="ml-3" size={18} />
            </Button>
          )}
          <Select onValueChange={value => setYearRange(value)}>
            <SelectTrigger className="rounded-2xl p-2 md:p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
              <SelectValue placeholder="Range" className="text-center w-full">
                {yearRange}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
              {yearRanges.map((range, index) => (
                <SelectItem key={index} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showEdit && (
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
              onClick={addRow}
            >
              Add row <GoPlusCircle className="ml-3" size={18} />
            </Button>
            <Add_new_metric />
          </div>
        )}
      </div>

      {/* Table */}
      <Pagination
        items={selectedData}
        itemsPerPage={5}
        render={currentItems => (
          <div className="relative shadow-md rounded-2xl w-full h-auto">
            <Table className="min-w-full text-black dark:text-white bg-[#1EF1A5]">
              {/* table header */}
              <TableHeader>
                <TableRow className="text-black text-lg font-bold">
                  <TableHead className="w-1/6 py-2 text-center">
                    Metrics
                  </TableHead>
                  {newYears.map(year => (
                    <TableHead key={year} className="w-[13%] py-2 text-center">
                      {year}
                    </TableHead>
                  ))}
                  {showEdit && (
                    <>
                      <TableHead className="w-1/6 py-2 text-center">
                        Category
                      </TableHead>

                      <TableHead className="w-1/6 py-2 text-center">
                        Clear
                      </TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>

              {/* table body */}
              <TableBody className="bg-white dark:bg-[#39463E]">
                {currentItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-8 text-center">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  currentItems.map((row, rowIndex) =>
                    renderTableRow(row, rowIndex),
                  )
                )}
              </TableBody>
            </Table>
          </div>
        )}
      />

      {/* Statements */}
      <div>
        <h2 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">
          Financial Statements
        </h2>
        <ul className="list-none items-center">
          {financialStatements.length > 0 ? (
            financialStatements.map((statement, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 ${index !== financialStatements.length - 1 ? 'border-b border-[#E6EEEA] dark:border-[#39463E]' : ''}`}
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
          <AddNewStatementContent />
        </div>
      </div>
    </div>
  );
};

export default Financial_section;
