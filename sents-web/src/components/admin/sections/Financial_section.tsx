/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FiEdit } from 'react-icons/fi';
import { GoPlusCircle } from 'react-icons/go';
import { GrSubtractCircle } from 'react-icons/gr';
import { MdDone, MdCancel } from 'react-icons/md';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'sonner';

import FStatements from '@/components/admin/FStatements';
import SubNav from '@/components/admin/Navs/SubNav';
import Add_new_metric from '@/components/forms/modals/Add_new_metric';
import ModalTemplate from '@/components/forms/ModalTemplate';
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
import getCurrencySymbol from '@/hooks/getCurrencySymbol';
import { formatData, getYearRanges, getRangeYears } from '@/hooks/tableFunctions';
import { addCompanyFinancialData, updateCompanyFinancialData } from '@/utils/apiClient';

type Row = {
  metrics: string;
  category: any[];
  [key: string]: string | string[] | any;
};

interface FinancialSectionProps {
  financialStatements: any[];
  FinancialData: any;
  companyID: any;
  metrics: any;
  category: any;
  countryName: string;
  setRefresh: (value: boolean) => void;
}

function areArraysEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false;
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}

function findCommonCategories(row: any, categoryList: any[], FinancialData: any) {
  if (!row || !row.metrics) {
    return [];
  }

  if (row?.category && Array.isArray(row.category)) {
    if (row.category.length > 0 && typeof row.category[0] === 'object') {
      return row.category;
    }
    return row.category
      .map((categoryId: any) => categoryList.find((category: any) => category.value === categoryId))
      .filter(Boolean);
  } else {
    const commonCategories = [];
    for (const category in FinancialData) {
      if (FinancialData[category][row.metrics]) {
        commonCategories.push(category);
      }
    }
    return commonCategories
      .map((commonCategory) => categoryList.find((item: any) => item.label === commonCategory))
      .filter(Boolean);
  }
}

const FinancialTable = ({
  rows,
  showEdit,
  newYears,
  metricsList,
  categoryList,
  handleInputChange,
  handleSelectChange,
  handleDelete,
  countryName,
  currentItems,
  FinancialData,
}: {
  rows: Row[];
  showEdit: boolean;
  newYears: string[];
  metricsList: any[];
  categoryList: any[];
  handleInputChange: any;
  handleSelectChange: any;
  handleDelete: any;
  countryName: string;
  currentItems: Row[];
  FinancialData: any;
}) => {
  return (
    <div className="shadow-sm rounded-2xl w-full h-auto relative">
      <Table className="min-w-full overflow-hidden text-black dark:text-white">
        <TableHeader className="bg-[#1EF1A5]">
          <TableRow className="text-black text-lg font-bold">
            <TableHead className="w-1/6 py-2 text-center">Metrics</TableHead>
            {newYears.map((year) => (
              <TableHead key={year} className="w-[13%] py-2 text-center">
                {year}
              </TableHead>
            ))}
            {showEdit && <TableHead className="w-1/6 py-2 text-center">Category</TableHead>}
            {showEdit && <TableHead className="w-1/6 py-2 text-center">Clear</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white dark:bg-[#39463E]">
          {currentItems.length === 0 && !showEdit ? (
            <TableRow>
              <TableCell className="text-center" colSpan={newYears.length + 3}>
                No Financial Data Available
              </TableCell>
            </TableRow>
          ) : (
            currentItems.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell
                  className="text-left"
                  style={{ width: 'max-content', minWidth: '180px' }}
                >
                  {showEdit ? (
                    <CustomSelect
                      options={metricsList}
                      onChange={(selectedOption: any) =>
                        handleSelectChange(rowIndex, 'metrics', selectedOption.value)
                      }
                      defaultValue={
                        metricsList.find(
                          (item: any) =>
                            item.label === row.metrics || item.value === Number(row.metrics),
                        ) || null
                      }
                      placeholder="Select metrics..."
                      className="w-auto"
                    />
                  ) : (
                    metricsList.find(
                      (item: any) =>
                        item.label === row.metrics || item.value === Number(row.metrics),
                    )?.label || '__'
                  )}
                </TableCell>

                {newYears.map((year) => (
                  <TableCell key={year} className="text-center">
                    {showEdit ? (
                      <Input
                        type="text"
                        value={row[year]}
                        className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#b7dac4] rounded-xl"
                        onChange={(e) => handleInputChange(e, rowIndex, year)}
                      />
                    ) : isNaN(Number(row[year])) || Number(row[year]) === 0 ? (
                      '__'
                    ) : (
                      Number(row[year]).toLocaleString('en-US', {
                        style: 'currency',
                        currency: getCurrencySymbol(countryName),
                      })
                    )}
                  </TableCell>
                ))}

                {showEdit && (
                  <TableCell className="text-center">
                    <CustomSelect
                      options={categoryList}
                      multi
                      onChange={(selectedOptions: any) =>
                        handleSelectChange(rowIndex, 'category', selectedOptions)
                      }
                      defaultValue={
                        row.category || findCommonCategories(row, categoryList, FinancialData)
                      }
                      placeholder="Category"
                      className="w-auto"
                    />
                  </TableCell>
                )}

                {showEdit && (
                  <TableCell className="flex justify-center">
                    <ModalTemplate
                      FormTitle="Are you sure you want to delete?"
                      ButtonStyle="p-0 m-0"
                      disabled
                      Icon={
                        <div className="w-8 h-8 hidden md:block relative top-1 right-2 text-[#F96868] cursor-not-allowed">
                          <GrSubtractCircle className="text-[#EA0000]" size={20} />
                        </div>
                      }
                      onSubmit={() => handleDelete(rowIndex)}
                      onCancel={() => null}
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
  );
};

const Financial_section = ({
  financialStatements,
  FinancialData,
  companyID,
  metrics,
  category,
  countryName,
  setRefresh,
}: FinancialSectionProps) => {
  const [selectedLink, setSelectedLink] = useState('Financial Summary');
  const [showEdit, setShowEdit] = useState(false);
  const yearRanges = getYearRanges();
  const [yearRange, setYearRange] = useState(yearRanges[0]);
  const newYears = useMemo(() => getRangeYears(yearRange), [yearRange]);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);

  const categoryList = useMemo(
    () =>
      category?.map((item: any) => ({
        value: item.id,
        label: item.category_name,
      })) || [],
    [category],
  );

  const metricsList = useMemo(
    () =>
      metrics?.map((item: any) => ({
        value: item.id,
        label: item.metric_name,
      })) || [],
    [metrics],
  );

  const TableData: any = useMemo(() => {
    return categoryList.reduce((acc: any, category: any) => {
      if (FinancialData && category.label in FinancialData) {
        acc[category.label] = formatData(FinancialData[category.label]);
      }
      return acc;
    }, {});
  }, [categoryList, FinancialData]);

  useEffect(() => {
    const selectedData = TableData[selectedLink] || [];
    setRows(selectedData);
  }, [selectedLink, TableData]);

  const getEmptyRow = useCallback(
    (years: string[]) => {
      const row: Row = {
        metrics: '',
        category: [categoryList.find((item: any) => item.label === selectedLink)],
      };
      years.forEach((year) => {
        row[year] = '';
      });
      return row;
    },
    [categoryList, selectedLink],
  );

  const addRow = useCallback(() => {
    setRows((prevRows) => [...prevRows, getEmptyRow(newYears)]);
  }, [getEmptyRow, newYears]);

  const clearRow = useCallback((rowIndex: number) => {
    setRows((prevRows) => prevRows.filter((_, index) => index !== rowIndex));
  }, []);

  const handleInputChange = useCallback((e: any, rowIndex: number, column: any) => {
    const value = e.target.value;
    setRows((prevRows) =>
      prevRows.map((row, index) => {
        if (index === rowIndex) {
          return { ...row, [column]: value };
        }
        return row;
      }),
    );
  }, []);

  const handleSelectChange = useCallback((rowIndex: number, column: string, value: any) => {
    setRows((prevRows) =>
      prevRows.map((row, index) => (index === rowIndex ? { ...row, [column]: value } : row)),
    );
  }, []);

  const handleDelete = useCallback(
    (rowIndex: number) => {
      clearRow(rowIndex);
    },
    [clearRow],
  );

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const updatedRows: any[] = [];
        const newRows: any[] = [];

        rows.forEach((row) => {
          const { metrics, category, ...years } = row;

          if (!metrics) {
            // Skip processing this row as 'metrics' is empty or undefined
            return;
          }

          const metricId = metricsList.find(
            (item: any) => item.label === metrics || item.value === Number(metrics),
          )?.value;

          if (!metricId) {
            // Skip processing this row as 'metricId' could not be found
            return;
          }

          let selectedCategoryId: number[] = [];
          if (category && Array.isArray(category)) {
            selectedCategoryId = category.map((cat: any) => cat.value);
          } else {
            selectedCategoryId = findCommonCategories(row, categoryList, FinancialData)
              .map((item: any) => (item && item.value !== undefined ? item.value : item))
              .filter(Boolean);
          }

          const initialRow = TableData[selectedLink]?.find((r: Row) => r.metrics === metrics);
          let initialCategories: any[] = [];
          if (initialRow) {
            initialCategories = findCommonCategories(initialRow, categoryList, FinancialData);
          }
          const initialCategoryIds = initialCategories.map((cat: any) => cat.value);
          const categoryChanged = !areArraysEqual(selectedCategoryId, initialCategoryIds);

          Object.entries(years).forEach(([year, value]) => {
            const initialValue = initialRow ? initialRow[year] : undefined;
            const processedValue = value === '' ? '' : String(value);

            const data = {
              company: Number(companyID),
              year: Number('20' + year.slice(-2)),
              category: selectedCategoryId,
              value: processedValue,
              metric: metricId,
            };

            if (initialValue !== undefined) {
              if (processedValue !== initialValue || categoryChanged) {
                updatedRows.push(data);
              }
            } else {
              newRows.push(data);
            }
          });
        });

        if (updatedRows.length === 0 && newRows.length === 0) {
          toast.info('No changes detected. Please make some changes before submitting.', {
            position: 'bottom-right',
          });
          setIsLoading(false);
          return;
        }

        if (updatedRows.length > 0) {
          const updateResponse = await updateCompanyFinancialData(updatedRows);
          if (updateResponse.status !== 200 && updateResponse.status !== 201) {
            throw new Error(updateResponse.message || updateResponse.error);
          }
        }

        if (newRows.length > 0) {
          const addResponse = await addCompanyFinancialData(newRows);
          if (addResponse.status !== 200 && addResponse.status !== 201) {
            throw new Error(addResponse.message || addResponse.error);
          }
        }

        setRefresh(true);
        setShowEdit(false);
        toast.success('Financial data updated successfully', {
          position: 'bottom-right',
        });
      } catch (error: any) {
        console.info(error);
        toast.error(error.message, {
          position: 'bottom-right',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [
      rows,
      metricsList,
      companyID,
      TableData,
      selectedLink,
      categoryList,
      FinancialData,
      setRefresh,
    ],
  );

  return (
    <div className="space-y-8">
      <SubNav
        links={categoryList.map((item: any) => item.label)}
        selectedLink={selectedLink}
        setSelectedLink={setSelectedLink}
        bgColor={true}
        addCat={true}
      />

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-4">
          {showEdit ? (
            <div className="flex items-center gap-4">
              <Button
                type="button"
                className="bg-[#148C59] text-white p-2 md:p-7 rounded-2xl hover:bg-[#148C59ed9] hover:text-white"
                onClick={handleFormSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ScaleLoader height={20} color="#fff" />
                ) : (
                  <>
                    Done <MdDone className="ml-3" size={20} />
                  </>
                )}
              </Button>
              <Button
                type="button"
                className="bg-[#EA0000] text-white p-2 md:p-7 rounded-2xl hover:bg-[#EA0000ed9] hover:text-white"
                onClick={() => {
                  setShowEdit(!showEdit);
                  setRows([...TableData[selectedLink]]);
                }}
                disabled={isLoading}
              >
                Cancel <MdCancel className="ml-3" size={20} />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              className="bg-[#39463E] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#46554c] hover:text-[39463E]"
              onClick={() => {
                setShowEdit(!showEdit);
              }}
            >
              Edit Table <FiEdit className="ml-3" size={18} />
            </Button>
          )}
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

      <CustomPagination
        items={rows}
        itemsPerPage={5}
        render={(currentItems) => (
          <FinancialTable
            rows={rows}
            showEdit={showEdit}
            newYears={newYears}
            metricsList={metricsList}
            categoryList={categoryList}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleDelete={handleDelete}
            countryName={countryName}
            currentItems={currentItems}
            FinancialData={FinancialData}
          />
        )}
      />

      <FStatements financialStatements={financialStatements} companyID={companyID} />
    </div>
  );
};

export default Financial_section;
