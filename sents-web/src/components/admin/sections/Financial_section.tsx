'use client';
import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
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
import getCurrencySymbol from '@/utils/getCurrencySymbol';
import { MdCancel } from 'react-icons/md';

type Row = {
  metrics: string;
  [key: string]: string | number | string[];
};

const Financial_section = ({
  financialStatements,
  FinancialData,
  companyID,
  metrics,
  category,
  countryName,
  setRefresh,
}: {
  financialStatements: any[];
  FinancialData: any;
  companyID: any;
  metrics: any;
  category: any;
  countryName: string;
  setRefresh: (value: boolean) => void;
}) => {
  const [selectedLink, setSelectedLink] = useState('Financial Summary');
  const [showEdit, setShowEdit] = useState(false);
  const yearRanges = getYearRanges();
  const [yearRange, setYearRange] = useState(yearRanges[0]);
  const [newYears, setNewYears] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categoryList = category.map((item: any) => ({
    value: item.id,
    label: item.category_name,
  }));

  const metricsList = metrics.map((item: any) => ({
    value: item.id,
    label: item.metric_name,
  }));

  useEffect(() => {
    const rangeYears = getRangeYears(yearRange);
    setNewYears(rangeYears);
  }, [yearRange]);

  const TableData: any = categoryList.reduce((acc: any, category: any) => {
    acc[category.label] = formatData(FinancialData.data[category.label]);
    return acc;
  }, {});

  const [rows, setRows] = useState<Row[]>(() => {
    const selectedData = TableData[selectedLink];
    return [...selectedData];
  });

  useEffect(() => {
    const selectedData = TableData[selectedLink];
    setRows([...selectedData]);
  }, [selectedLink]);

  useEffect(() => {
    setRows([...TableData[selectedLink]]);
  }, [selectedLink, newYears]);

  const getEmptyRow = (years: string[]) => {
    let row: Row = { metrics: '' };
    years.forEach(year => {
      const actualYear = 'FY’' + year.slice(3);
      row[actualYear] = '';
    });
    return row;
  };

  const addRow = () => {
    setRows(prevRows => [...prevRows, getEmptyRow(newYears)]);
  };

  const clearRow = (rowIndex: number) => {
    setRows(prevRows => prevRows.filter((_, index) => index !== rowIndex));
  };

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

  const handleSelectChange = (value: any, rowIndex: number, column: string) => {
    setRows(prevRows =>
      prevRows.map((row, index) => {
        if (index === rowIndex) {
          return { ...row, [column]: String(value) };
        }
        return row;
      }),
    );
  };

  const handleDelete = async (rowIndex: number, name: string) => {
    if (name === 'delete') {
      clearRow(rowIndex);
    } else {
      console.log('Cancel delete company');
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const selectedCategoryId = categoryList.find(
        (item: any) => item.label === selectedLink,
      )?.value; // Get the ID of the selected link

      const formData = rows.flatMap(row => {
        const { metrics, ...years } = row;
        const metricId = metricsList.find(
          (item: any) =>
            item.label === metrics || item.value === Number(metrics),
        )?.value;

        return Object.entries(years).map(([year, value]) => {
          let data: any = {
            company: Number(companyID),
            year: Number('20' + year.slice(-2)),
            category: [selectedCategoryId],
            value: String(value),
          };

          if (metricId) data.metric = metricId;

          return data;
        });
      });

      const response = await createUpdateFinancialData(formData);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.message);
      }

      setRefresh(true);
      setShowEdit(!showEdit);
      toast.success(response.message, {
        style: {
          background: 'green',
          color: 'white',
          border: 'none',
        },
        position: 'top-center',
        duration: 5000,
      });
    } catch (error: any) {
      toast.error(error.message, {
        style: { background: 'red', color: 'white', border: 'none' },
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* subNav */}
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
                className="bg-[#148C59] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#148C59ed9] hover:text-white"
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
                className="bg-[#EA0000] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#EA0000ed9] hover:text-white"
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
              // disabled={true}
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
            <Table className="min-w-full text-black dark:text-white">
              {/* table header */}
              <TableHeader className="bg-[#1EF1A5]">
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
                      No Financial Data Available
                    </TableCell>
                  </TableRow>
                ) : (
                  currentItems.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell
                        className="text-left"
                        style={{
                          width: 'max-content',
                          minWidth: '180px',
                        }}
                      >
                        {showEdit ? (
                          <div className="relative">
                            <ReactSelect
                              name="metrics"
                              key={rowIndex}
                              options={metricsList}
                              isClearable={false}
                              className="react-select-container relative dark:text-black"
                              classNamePrefix="react-select"
                              placeholder="Metrics"
                              defaultValue={metricsList.find(
                                (item: any) =>
                                  item.label === row.metrics ||
                                  item.value === Number(row.metrics),
                              )}
                              onChange={(item: any) =>
                                handleSelectChange(
                                  item.value,
                                  rowIndex,
                                  'metrics',
                                )
                              }
                            />
                          </div>
                        ) : (
                          metricsList.find(
                            (item: any) =>
                              item.label === row.metrics ||
                              item.value === Number(row.metrics),
                          )?.label || '__'
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
                          ) : isNaN(Number(row[year])) ||
                            Number(row[year]) === 0 ? (
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
                        <TableCell className="flex justify-center">
                          <ModalForms
                            FormTitle="Are you sure you want to delete?"
                            ButtonStyle="p-0 m-0"
                            disabled
                            Icon={
                              <div className="w-8 h-8 hidden md:block relative top-1 right-2 text-[#F96868]">
                                <GrSubtractCircle
                                  className="text-[#EA0000]"
                                  size={20}
                                />
                              </div>
                            }
                            onSubmit={() => handleDelete(rowIndex, 'delete')}
                            onCancel={() => handleDelete(rowIndex, 'cancel')}
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
    </div>
  );
};

export default Financial_section;
