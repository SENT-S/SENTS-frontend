import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GoPlusCircle } from 'react-icons/go';
import { GrSubtractCircle } from 'react-icons/gr';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'sonner';

import FStatements from '@/components/admin/FStatements';
import Add_new_category from '@/components/forms/modals/Add_new_category';
import Add_new_metric from '@/components/forms/modals/Add_new_metric';
import { Button } from '@/components/ui/button';
import CustomPagination from '@/components/ui/customPagination';
import CustomSelect from '@/components/ui/CustomSelect';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getYearRanges, getRangeYears } from '@/hooks/tableFunctions';
import { resetCompanyFields } from '@/lib/ReduxSlices/create_company';
import { stopRefresh } from '@/lib/ReduxSlices/refreshSlice';
import { setStep, setInnerStep } from '@/lib/ReduxSlices/stepSlice';
import { useDispatch, useSelector } from '@/lib/utils';
import { addCompanyFinancialData } from '@/utils/apiClient';
import { getCompany } from '@/utils/apiClient';

type Row = {
  metrics: string;
  category: string[];
  [key: string]: string | string[];
};

const Section_1 = ({ metrics, category }: { metrics: any; category: any }) => {
  const dispatch = useDispatch();
  const yearRanges = useMemo(() => getYearRanges(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [yearRange, setYearRange] = useState(yearRanges[0]);
  const [newYears, setNewYears] = useState<string[]>([]);
  const createdCompanyData = useSelector((state) => state.company.response);
  const companyID = useMemo(() => Number(createdCompanyData?.data?.id), [createdCompanyData]);
  const isRefreshing = useSelector((state) => state.refresh.isRefreshing);
  const [financialStatements, setFinancialStatements] = useState<any>([]);
  const innerStep = useSelector<any>((state) => state.steps.innerStep);

  const fetchCompanies = useCallback(async () => {
    try {
      const companyData = await getCompany(companyID);

      setFinancialStatements(companyData.company_documents);
    } catch (error) {
      console.error('Failed to fetch company', error);
    } finally {
      dispatch(stopRefresh());
    }
  }, [companyID, dispatch]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies, isRefreshing]);

  // Change the format of the data from categories and metric to react-select format
  const categoryList = useMemo(
    () =>
      category.map((item: any) => ({
        value: item.id,
        label: item.category_name,
      })),
    [category],
  );

  const metricsList = useMemo(
    () =>
      metrics.map((item: any) => ({
        value: item.id,
        label: item.metric_name,
      })),
    [metrics],
  );

  useEffect(() => {
    const rangeYears = getRangeYears(yearRange);
    setNewYears(rangeYears);
  }, [yearRange]);

  const getEmptyRow = useCallback((years: string[]): Row => {
    const row: Row = { metrics: '', category: [] }; // Initialize category as an empty array
    years.forEach((year) => {
      const actualYear = '20' + year.slice(3);
      row[actualYear] = '';
    });
    return row;
  }, []);

  // Initialize rows state with one empty row
  const [rows, setRows] = useState<Row[]>([getEmptyRow(newYears)]);

  // Function to handle adding a new row
  const addRow = useCallback(() => {
    setRows((prevRows) => [...prevRows, getEmptyRow(newYears)]);
  }, [getEmptyRow, newYears]);

  // Function to handle input change in the table
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, column: string) => {
      const value = e.target.value;
      setRows((prevRows) => {
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
    },
    [],
  );

  // Function to handle select change in the table
  const handleSelectChange = useCallback((value: any, rowIndex: number, column: string) => {
    setRows((prevRows) => {
      return prevRows.map((row, index) => {
        if (index === rowIndex) {
          if (column === 'category') {
            // For multi-select dropdown
            const newValues = Array.isArray(value) ? value.map((item: any) => item.value) : [];
            return { ...row, [column]: newValues };
          } else {
            // For single-select dropdown
            return { ...row, [column]: value };
          }
        } else {
          return row;
        }
      });
    });
  }, []);

  // Function to handle clearing a row
  const clearRow = useCallback((rowIndex: number) => {
    setRows((prevRows) => prevRows.filter((_, index) => index !== rowIndex));
  }, []);

  const handleFormSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        // Convert rows state to an array of objects where each object represents a row
        const formData = rows.flatMap((row) => {
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
        const response = await addCompanyFinancialData(formData);

        // Check if the request was successful
        if (response.status !== 201 && response.status !== 200) {
          throw new Error(response.detail || 'Failed to add financial data');
        }

        // Show success message
        toast.success(response.message, {
          position: 'top-center',
        });
      } catch (error: any) {
        toast.error(error.message || 'An error occurred, please try again', {
          position: 'top-center',
        });
      } finally {
        // Reset rows state to initial state after form submission
        setRows([getEmptyRow(newYears)]);
        dispatch(setStep(1));
        dispatch(setInnerStep(1));
        dispatch(resetCompanyFields());
        setIsLoading(false);
      }
    },
    [rows, companyID, getEmptyRow, newYears, dispatch],
  );

  return (
    <div className="space-y-8">
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0]">Add Financials</h2>
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <div>
          <Select
            onValueChange={(value) => setYearRange(value)}
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
        <div className="flex flex-wrap gap-4 items-center">
          <Button
            type="button"
            className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
            onClick={addRow}
          >
            Add row <GoPlusCircle className="ml-3" size={18} />
          </Button>
          <Add_new_category ButtonText="Add Category" />
          <Add_new_metric />
        </div>
      </div>
      {/* table */}
      <CustomPagination
        items={rows}
        itemsPerPage={5}
        render={(currentItems: any) => (
          <div className="relative shadow-md rounded-2xl w-full h-auto">
            <Table className="min-w-full text-black dark:text-white bg-[#1EF1A5]">
              {/* table header */}
              <TableHeader>
                <TableRow className="text-black text-lg font-bold">
                  <TableHead className="w-1/6 py-2 text-center">Metrics</TableHead>
                  {newYears.map((year) => (
                    <TableHead key={year} className="w-[13%] py-2 text-center">
                      {year}
                    </TableHead>
                  ))}
                  <TableHead className="w-1/6 py-2 text-center">Category</TableHead>
                  {rows.length > 1 && (
                    <TableHead className="w-1/6 py-2 text-center">Clear</TableHead>
                  )}
                </TableRow>
              </TableHeader>

              {/* table body */}
              <TableBody className="bg-white dark:bg-[#39463E]">
                {currentItems.map((row: any, rowIndex: any) => (
                  <TableRow key={rowIndex}>
                    <TableCell className="text-center">
                      <CustomSelect
                        options={metricsList}
                        onChange={(item: any) =>
                          handleSelectChange(item.value, rowIndex, 'metrics')
                        }
                        defaultValue={metricsList.find((item: any) => item.value === row.metrics)}
                        placeholder="Select metrics..."
                        className="w-auto"
                      />
                    </TableCell>
                    {newYears.map((year) => (
                      <TableCell key={year} className="text-center">
                        <Input
                          type="text"
                          value={row['20' + year.slice(3)] || ''}
                          className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#b7dac4] rounded-xl"
                          onChange={(e) => handleInputChange(e, rowIndex, '20' + year.slice(3))}
                        />
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <CustomSelect
                        options={categoryList}
                        multi
                        onChange={(item: any) => handleSelectChange(item, rowIndex, 'category')}
                        defaultValue={row.category.map((cat: any) =>
                          categoryList.find((item: any) => item.value === cat),
                        )}
                        placeholder="Category"
                        className="w-auto"
                      />
                    </TableCell>
                    {rows.length > 1 && (
                      <TableCell className="text-center">
                        <Button type="button" onClick={() => clearRow(rowIndex)}>
                          <GrSubtractCircle className="text-[#EA0000]" size={20} />
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
      <FStatements financialStatements={financialStatements} companyID={companyID} />

      <Button
        type="button"
        onClick={handleFormSubmit}
        className="bg-[#148C59] text-white w-full px-3 py-7 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
        disabled={isLoading}
      >
        {isLoading ? <ScaleLoader height={20} color="#fff" /> : 'Complete'}
      </Button>
    </div>
  );
};

export default Section_1;
