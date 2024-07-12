import React, { useState, useEffect } from 'react';
import { GoPlusCircle } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pagination from '@/components/pagination';
import { GrSubtractCircle } from 'react-icons/gr';
import Add_new_category from '@/components/admin/forms/Add_new_category';
import Add_new_metric from '@/components/admin/forms/Add_new_metric';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  MultiSelect,
  MultiSelectItem,
} from '@/components/ui/select';
import { getYearRanges, getRangeYears } from '@/utils/tableFunctions';
import FStatements from '@/components/admin/FStatements';
import { createUpdateFinancialData } from '@/services/apis/companies';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'sonner';
import { useSelector } from '@/lib/utils';

type Row = {
  metrics: string;
  category: string[];
  [key: string]: string | string[];
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

const Section_1 = ({ setStep, step }: { setStep: any; step: number }) => {
  const yearRanges = getYearRanges();
  const [isLoading, setIsLoading] = useState(false);
  const [yearRange, setYearRange] = useState(yearRanges[0]);
  const [newYears, setNewYears] = useState<string[]>([]);
  const createdCompanyData = useSelector(state => state.company.response);
  const companyID = Number(createdCompanyData?.data?.id);

  useEffect(() => {
    const rangeYears = getRangeYears(yearRange);
    setNewYears(rangeYears);
  }, [yearRange]);

  // Initialize rows state with one empty row
  const [rows, setRows] = useState<Row[]>([getEmptyRow(newYears)]);

  function getEmptyRow(years: string[]) {
    let row: Row = { metrics: '', category: [] }; // Initialize category as an empty array
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

  // Function to handle clearing a row
  const clearRow = (rowIndex: number) => {
    setRows(prevRows => prevRows.filter((_, index) => index !== rowIndex));
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
          category: categoryIds,
          metric: metricId,
          year: Number(year),
          value: String(value),
        }));
      });

      setIsLoading(true);

      // Call the API to create/update financial data
      const response = await createUpdateFinancialData(formData);

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
      setRows([getEmptyRow(newYears)]);
      // reload the page
      window.location.reload();
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
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0]">
        Add Financials
      </h2>
      <div className="flex flex-wrap justify-end gap-4 items-center">
        <Button
          type="button"
          className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
          onClick={addRow}
        >
          Add row <GoPlusCircle className="ml-3" size={18} />
        </Button>
        <Add_new_category ButtonText="Add Category" />
        <Add_new_metric />
        <div>
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
                  <TableHead className="w-1/6 py-2 text-center">
                    Category
                  </TableHead>
                  {rows.length > 1 && (
                    <TableHead className="w-1/6 py-2 text-center">
                      Clear
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>

              {/* table body */}
              <TableBody className="bg-white dark:bg-[#39463E]">
                {currentItems.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell className="text-center">
                      <Select
                        onValueChange={(value: any) =>
                          handleSelectChange(value, rowIndex, 'metrics')
                        }
                        value={row.metrics}
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
                          {metrics.map((item: any) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    {newYears.map((year, yearIndex) => (
                      <TableCell key={year} className="text-center">
                        <Input
                          type="text"
                          value={row['20' + year.slice(3)] || ''}
                          className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#39463E] rounded-xl"
                          onChange={e =>
                            handleInputChange(e, rowIndex, '20' + year.slice(3))
                          }
                        />
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <MultiSelect
                        onValueChange={(value: any) =>
                          handleSelectChange(value, rowIndex, 'category')
                        }
                      >
                        <SelectTrigger className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#39463E] rounded-xl">
                          <SelectValue
                            placeholder="Category"
                            className="text-center w-full"
                          >
                            {row.category.join(', ')}
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
                    {rows.length > 1 && (
                      <TableCell className="text-center">
                        <Button
                          type="button"
                          onClick={() => clearRow(rowIndex)}
                        >
                          <GrSubtractCircle
                            className="text-[#EA0000]"
                            size={20}
                          />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      />

      {/* statements */}
      <FStatements financialStatements={[]} />

      <Button
        type="submit"
        className="bg-[#148C59] text-white w-full px-3 py-7 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
        disabled={isLoading}
      >
        {isLoading ? <ScaleLoader height={20} color="#fff" /> : 'Complete'}
      </Button>
    </form>
  );
};

export default Section_1;
