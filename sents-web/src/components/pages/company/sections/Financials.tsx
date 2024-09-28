import React, { useState, useEffect } from 'react';
import { PiMicrosoftExcelLogoDuotone } from 'react-icons/pi';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import { FinancialChart } from '../charts';

import SubNav from '@/components/admin/Navs/SubNav';
import { Button } from '@/components/ui/button';
import CustomPagination from '@/components/ui/customPagination';
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
import { getYearRanges, getRangeYears, formatData } from '@/hooks/tableFunctions';

// Define types for better type checking
type FormattedMetric = {
  metrics: string;
  [key: string]: string | number;
};

type TableData = {
  [key: string]: FormattedMetric[];
};

const Financials = ({
  data,
  financialData,
  category,
}: {
  data: any;
  financialData: any[];
  category: any[];
}) => {
  const [barWidth, setBarWidth] = useState(60);
  const [selectedLink, setSelectedLink] = useState<string>('Financial Summary');
  const [selectedMetric, setSelectedMetric] = useState<FormattedMetric | null>(null);
  const currentYear = new Date().getFullYear();
  const yearRanges = getYearRanges();

  const chartYears = Array.from({ length: 5 }, (_, i) => `${currentYear - i - 1}`).reverse();
  const [yearRange, setYearRange] = useState(yearRanges[0]);
  const [newYears, setNewYears] = useState<string[]>([]);

  const categoryList = category.map((item) => ({
    value: item.id,
    label: item.category_name,
  }));

  useEffect(() => {
    setNewYears(getRangeYears(yearRange));
  }, [yearRange]);

  useEffect(() => {
    const handleResize = () => {
      setBarWidth(window.innerWidth < 768 ? 10 : 60);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const TableData: TableData = {
    'Financial Summary': formatData(financialData['Financial Summary' as any]),
    'Profit & Loss': formatData(financialData['Profit & Loss' as any]),
    'Balance Sheet': formatData(financialData['Balance Sheet' as any]),
    'Cashflow Statement': formatData(financialData['Cashflow Statement' as any]),
    'Financial Analysis': formatData(financialData['Financial Analysis' as any]),
  };

  const selectedData = TableData[selectedLink];

  const handleViewChart = (item: FormattedMetric) => {
    setSelectedMetric(item);
  };

  const chartData = selectedMetric
    ? newYears.map((year, index) => {
        const value = selectedMetric[year];
        return {
          name: chartYears[index],
          value:
            typeof value === 'string' && value.endsWith('%')
              ? parseFloat(value.slice(0, -1))
              : Number(value),
        };
      })
    : [];

  const exportTableAsExcel = () => {
    if (!selectedData || !data?.company_name) {
      toast.error('No data available to export', {
        position: 'top-right',
      });
      return;
    }
    toast.success('Data exported successfully', {
      position: 'top-right',
    });
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(selectedData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${data.company_name}-${selectedLink}.xlsx`);
  };

  return (
    <div className="space-y-8 w-full">
      <div>
        <h1 className="text-2xl font-semibold">{data?.company_name}</h1>
        <h2 className="text-xl font-thin mb-2">{data?.stock_symbol}</h2>
        <span className="font-semibold text-lg">Yearly Financials</span>
      </div>

      {!selectedMetric ? (
        <div className="space-y-5">
          <SubNav
            links={categoryList.map((item) => item.label)}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            bgColor
          />
          {selectedData && selectedData.length > 0 && (
            <div className="flex justify-between gap-3 items-center">
              <Select onValueChange={(value) => setYearRange(value)} defaultValue={yearRanges[0]}>
                <SelectTrigger className="rounded-2xl p-2 md:p-4 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
                  <SelectValue placeholder="Range">{yearRange}</SelectValue>
                </SelectTrigger>
                <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
                  {yearRanges.map((range, index) => (
                    <SelectItem key={index} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={exportTableAsExcel}
              >
                <PiMicrosoftExcelLogoDuotone className="mr-2" size={20} />
                Excel
              </Button>
            </div>
          )}
          <CustomPagination
            items={selectedData}
            itemsPerPage={10}
            render={(currentItems) => (
              <div className="relative shadow-md rounded-2xl w-full h-auto">
                <Table className="min-w-full text-black dark:text-white bg-[#1EF1A5]">
                  <TableHeader>
                    <TableRow className="text-black font-semibold">
                      <TableHead className="w-1/6 py-2">Metrics</TableHead>
                      {newYears.map((year) => (
                        <TableHead key={year} className="w-[13%] py-2">
                          {year}
                        </TableHead>
                      ))}
                      <TableHead className="w-1/3 py-2">Chart</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white dark:bg-[#39463E]">
                    {currentItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="py-8 text-center">
                          No Financial Data Available
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentItems.map((item, index) => (
                        <TableRow
                          key={index}
                          className={`${
                            index === currentItems.length - 1 ? 'rounded-b-xl' : ''
                          } hover:bg-[#E6F6F0] dark:hover:bg-[#8D9D9380] cursor-pointer`}
                        >
                          <TableCell
                            className="py-2"
                            style={{ width: 'max-content', minWidth: '180px' }}
                          >
                            {item.metrics}
                          </TableCell>
                          {newYears.map((year) => (
                            <TableCell key={year} className="flex-grow py-2">
                              {isNaN(Number(item[year])) || Number(item[year]) === 0
                                ? '__'
                                : Number(item[year]).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: getCurrencySymbol(data?.company_country),
                                  })}
                            </TableCell>
                          ))}
                          <TableCell
                            className="py-2"
                            style={{ width: 'max-content', minWidth: '120px' }}
                          >
                            <button
                              onClick={() => handleViewChart(item)}
                              className="text-[#148C59] z-50"
                            >
                              view chart
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          />
        </div>
      ) : (
        <FinancialChart
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          chartData={chartData}
          barWidth={barWidth}
          availableMetrics={selectedData}
        />
      )}
    </div>
  );
};

export default Financials;
