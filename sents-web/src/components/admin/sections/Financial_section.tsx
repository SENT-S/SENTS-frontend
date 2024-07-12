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
  MultiSelect,
  MultiSelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/pagination';
import SubNav from '@/components/admin/Navs/SubNav';
import { FiEdit } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { formatData } from '@/utils/tableFunctions';
import { getYearRanges, getRangeYears } from '@/utils/tableFunctions';
import { MdDone } from 'react-icons/md';
import { GoPlusCircle } from 'react-icons/go';
import Add_new_metric from '@/components/admin/forms/Add_new_metric';
import { GrSubtractCircle } from 'react-icons/gr';
import FStatements from '@/components/admin/FStatements';
import ModalForms from '@/components/admin/modal';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'sonner';
import { createUpdateFinancialData } from '@/services/apis/companies';

type Row = {
  metrics: string;
  category: string[];
  [key: string]: string | number | string[];
};

const category = [
  { id: 1, name: 'Sales Revenue' },
  { id: 2, name: 'Cost of Goods Sold' },
  { id: 3, name: 'Gross Profit' },
  { id: 4, name: 'Operating Expenses' },
  { id: 5, name: 'Net Income' },
  { id: 6, name: 'Gross Margin' },
];

const metrics = [
  { id: 1, name: 'Revenue' },
  { id: 2, name: 'Gross Profit' },
  { id: 3, name: 'Operating Expenses' },
  { id: 4, name: 'Net Income' },
];

const Financial_section = ({
  financialStatements,
  FinancialData,
  companyID,
}: {
  financialStatements: any[];
  FinancialData: any;
  companyID: any;
}) => {
  const [selectedLink, setSelectedLink] = useState('Financial Summary');
  const [showEdit, setShowEdit] = useState(false);
  const yearRanges = getYearRanges();

  const [yearRange, setYearRange] = useState(yearRanges[0]);
  const [newYears, setNewYears] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const rangeYears = getRangeYears(yearRange);
    setNewYears(rangeYears);
  }, [yearRange]);

  const TableData: any = {
    'Financial Summary': formatData(
      FinancialData.data['Financial Summary' as any],
    ),
    'Profit & Loss': formatData(FinancialData.data['Profit & Loss' as any]),
    'Balance Sheet': formatData(FinancialData.data['Balance Sheet' as any]),
    'Cashflow Statement': formatData(
      FinancialData.data['Cashflow Statement' as any],
    ),
    'Financial Analysis': formatData(
      FinancialData.data['Financial Analysis' as any],
    ),
  };

  const selectedData = TableData[selectedLink];

  // Initialize rows state with data from the database and one empty row
  const [rows, setRows] = useState<Row[]>([...selectedData]);

  useEffect(() => {
    // Update rows state when selectedLink changes
    setRows([...TableData[selectedLink]]);
  }, [selectedLink, newYears]);

  function getEmptyRow(years: string[]) {
    let row: Row = { metrics: '', category: [] }; // Initialize category as an empty array
    years.forEach(year => {
      const actualYear = 'FY’' + year.slice(3);
      row[actualYear] = '';
    });
    return row;
  }

  // Function to handle adding a new row
  const addRow = () => {
    setRows(prevRows => [...prevRows, getEmptyRow(newYears)]);
  };

  // Function to handle clearing a row
  const clearRow = (rowIndex: number) => {
    setRows(prevRows => prevRows.filter((_, index) => index !== rowIndex));
  };

  const handleEditCompany = () => {
    setShowEdit(!showEdit);
  };

  // Function to handle input change in the table
  const handleInputChange = (e: any, rowIndex: number, column: any) => {
    const value = e.target.value;
    setRows(prevRows => {
      return prevRows.map((row, index) => {
        if (index === rowIndex) {
          return { ...row, [column]: value };
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
          if (column === 'category') {
            // For multi-select dropdown
            const existingValues = Array.isArray(row[column])
              ? row[column]
              : [];
            const newValues = Array.isArray(value)
              ? value.map(String)
              : [String(value)];
            const mergedValues = Array.from(
              new Set([...existingValues, ...newValues]),
            );
            return { ...row, [column]: mergedValues };
          } else {
            // For single-select dropdown
            return { ...row, [column]: String(value) };
          }
        } else {
          return row;
        }
      });
    });
  };

  const handleDelete = (rowIndex: number) => {
    clearRow(rowIndex);
  };

  const handleCancelDeleteCompany = () => {
    console.log('Cancel delete company');
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Convert rows state to an array of objects where each object represents a row
      const formData = rows.flatMap(row => {
        // Extract metrics and category from the row
        const { metrics, category, ...years } = row;

        // Convert metrics and category to numbers
        const metricId = Number(metrics);
        const categoryIds = category.map(Number);

        // Map over the years in the row to create an object for each year
        return Object.entries(years).map(([year, value]) => ({
          company: companyID,
          category: categoryIds || [],
          metric: metricId,
          year: year,
          value: String(value),
        }));
      });

      setIsLoading(true);
      console.info('Form data:', formData);

      // Call the API to create/update financial data
      // const response = await createUpdateFinancialData(formData);

      // Check if the request was successful
      // if (!response.ok) {
      //   throw new Error(`API request failed with status ${response}`);
      // }

      // Show success message
      toast.success('Financial data added successfully', {
        style: {
          background: 'green',
          color: 'white',
          border: 'none',
        },
        position: 'top-center',
        duration: 5000,
      });

      // Reset rows state to initial state after form submission
      // setRows([getEmptyRow(newYears)]);
      // reload the page
      // window.location.reload();
    } catch (error: any) {
      console.error(error);
      toast.error(`Failed to add financial data: ${error.message}`, {
        style: { background: 'red', color: 'white', border: 'none' },
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleFormSubmit}>
      {/* subNav */}
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
              type="submit"
              className="bg-[#148C59] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#148C59ed9] hover:text-white"
              onClick={handleEditCompany}
            >
              {isLoading ? (
                <ScaleLoader height={20} color="#fff" />
              ) : (
                <>
                  Done <MdDone className="ml-3" size={20} />
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              className="bg-[#39463E] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#46554c] hover:text-[39463E]"
              onClick={() => setShowEdit(!showEdit)}
            >
              Edit Table <FiEdit className="ml-3" size={18} />
            </Button>
          )}
          <Select
            onValueChange={value => setYearRange(value)}
            value={yearRange}
            defaultValue={yearRange}
          >
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
              type="button"
              className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
              onClick={addRow}
            >
              Add row <GoPlusCircle className="ml-3" size={18} />
            </Button>
            <Add_new_metric />
          </div>
        )}
      </div>

      {/* table */}
      <Pagination
        items={rows}
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
                    <TableHead className="w-1/6 py-2 text-center">
                      Category
                    </TableHead>
                  )}
                  {showEdit && (
                    <TableHead className="w-1/6 py-2 text-center">
                      Clear
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              {/* table body */}
              <TableBody className="bg-white dark:bg-[#39463E]">
                {currentItems.length === 0 && !showEdit ? (
                  <TableRow>
                    <TableCell
                      className="text-center"
                      colSpan={newYears.length + 3}
                    >
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  currentItems.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell className="text-left">
                        {showEdit ? (
                          <Select
                            onValueChange={(value: any) =>
                              handleSelectChange(value, rowIndex, 'metrics')
                            }
                            value={row.metrics}
                            defaultValue={row.metrics}
                          >
                            <SelectTrigger className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#b7dac4] rounded-xl">
                              <SelectValue
                                placeholder="Metrics"
                                className="text-center w-full"
                              >
                                {row.metrics}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
                              {metrics.map((item: any) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          row.metrics
                        )}
                      </TableCell>
                      {newYears.map((year, yearIndex) => (
                        <TableCell key={year} className="text-center">
                          {showEdit ? (
                            <Input
                              type="text"
                              value={row[year]}
                              className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#b7dac4] rounded-xl"
                              onChange={e =>
                                handleInputChange(e, rowIndex, year)
                              }
                            />
                          ) : isNaN(Number(row[year])) ? (
                            '__'
                          ) : (
                            Number(row[year]).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'UGX',
                            })
                          )}
                        </TableCell>
                      ))}
                      {showEdit && (
                        <TableCell className="text-center">
                          <MultiSelect
                            onValueChange={(value: any) =>
                              handleSelectChange(value, rowIndex, 'category')
                            }
                          >
                            <SelectTrigger className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#b7dac4] rounded-xl">
                              <SelectValue
                                placeholder="Category"
                                className="text-center w-full"
                              >
                                {row.category && row.category.join(', ')}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
                              {category.map((item: any) => (
                                <MultiSelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </MultiSelectItem>
                              ))}
                            </SelectContent>
                          </MultiSelect>
                        </TableCell>
                      )}
                      {showEdit && (
                        <TableCell className="text-center">
                          <ModalForms
                            FormTitle="Are you sure you want to delete?"
                            ButtonStyle="p-0 m-0"
                            Icon={
                              <div className="w-8 h-8 hidden md:block relative top-1 right-2 text-[#F96868]">
                                <GrSubtractCircle
                                  className="text-[#EA0000]"
                                  size={20}
                                />
                              </div>
                            }
                            onSubmit={() => handleDelete(rowIndex)}
                            onCancel={handleCancelDeleteCompany}
                            SubmitText="Yes"
                            CancelText="No"
                            SubmitButtonStyle="bg-[#EA0000] hover:bg-[#ea0000e7]"
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      />

      {/* Statements */}
      <FStatements financialStatements={financialStatements} />
    </form>
  );
};

export default Financial_section;
