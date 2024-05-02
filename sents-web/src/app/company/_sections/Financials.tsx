import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Curve,
} from 'recharts';
import { FinancialData } from '@/services/mockData/mock';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';
import SubNav from '@/components/navigation/SubNav';
import { Button } from '@/components/ui/button';
import { IoChevronBackOutline } from 'react-icons/io5';

const CustomBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return (
    <path
      d={`M${x},${y + height} 
         H${x + width} 
         V${y + 10} 
         Q${x + width},${y} ${x + width - 10},${y} 
         H${x + 10} 
         Q${x},${y} ${x},${y + 10} 
         Z`}
      fill={fill}
    />
  );
};

const Financials = ({
  data,
  financialData,
}: {
  data: any;
  financialData: any[];
}) => {
  const { theme } = useTheme();
  const [selectedLink, setSelectedLink] = useState<any>('Financial Summary');
  const [selectedMetric, setSelectedMetric] = useState<{
    [key: string]: string | number;
  } | null>(null);
  const years = ['FY19', 'FY20', 'FY21', 'FY22', 'FY23'];

  const handleViewChart = (item: { [key: string]: string | number }) => {
    setSelectedMetric(item);
  };

  const handleSelectMetric = (metricName: string) => {
    const selectedMetric = selectedData.find(
      item => item.metrics === metricName,
    );
    if (selectedMetric) {
      setSelectedMetric(selectedMetric);
    } else {
      // Handle the case where the metric is not found
      console.error(`Metric ${metricName} not found`);
    }
  };

  const TableData = {
    'Financial Summary': FinancialData,
    'Profit & Loss': FinancialData.slice(0, 5),
    'Balance Sheet': FinancialData.slice(5, 10),
    'Cashflow Statement': FinancialData.slice(1, 5),
    'Financial Analysis': FinancialData.slice(5, 10),
  };

  const selectedData = TableData[selectedLink as keyof typeof TableData];

  const chartData = selectedMetric
    ? years.map(year => {
        const value = selectedMetric[year as keyof typeof selectedMetric];
        // Check if the value is a percentage
        if (typeof value === 'string' && value.endsWith('%')) {
          // Remove the '%' sign and convert to a number
          return {
            name: year,
            value: parseFloat(value.slice(0, -1)),
          };
        } else {
          return { name: year, value };
        }
      })
    : [];

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No data available.</p>
      </div>
    );
  }

  const filteredData = useMemo(
    () => financialData[selectedLink],
    [financialData, selectedLink],
  );

  return (
    <div className="space-y-8 w-full">
      <div>
        <h1 className="text-2xl font-semibold">
          {data?.company_name && data.company_name}
        </h1>
        <h2 className="text-xl font-thin mb-2">
          {data?.stock_symbol && data.stock_symbol}
        </h2>
        <span className="font-semibold text-lg">Yearly Financials</span>
      </div>

      {!selectedMetric ? (
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
            bgColor={true}
          />
          <div className="relative shadow-md rounded-2xl w-full h-auto">
            <Table className="min-w-full text-black dark:text-white bg-[#1EF1A5]">
              <TableHeader>
                <TableRow className="text-black font-semibold">
                  <TableHead className="w-1/6 py-2">Metrics</TableHead>
                  {years.map(year => (
                    <TableHead key={year} className="w-[13%] py-2">
                      {year}
                    </TableHead>
                  ))}
                  <TableHead className="w-1/3 py-2">Chart</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white dark:bg-[#39463E]">
                {selectedData.map(
                  (item: { [key: string]: string | number }, index: number) => (
                    <TableRow
                      key={index}
                      className={`
            ${index === selectedData.length - 1 ? 'rounded-b-xl' : ''}
            hover:bg-[#E6F6F0] dark:hover:bg-[#8D9D9380] cursor-pointer
          `}
                    >
                      <TableCell className="py-2">{item.metrics}</TableCell>
                      {years.map(year => (
                        <TableCell key={year} className="flex-grow py-2">
                          {item[year]}
                        </TableCell>
                      ))}
                      <TableCell className="w-2/6 py-2">
                        <a
                          href="#"
                          onClick={() => handleViewChart(item)}
                          className="text-[#148C59] z-50"
                        >
                          view chart
                        </a>
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <>
          <Button
            variant="outline"
            size="icon"
            className="ml-3"
            onClick={() => setSelectedMetric(null)}
          >
            <IoChevronBackOutline />
          </Button>
          <div className="p-4 bg-[#F8FAF9] dark:text-white dark:bg-[#39463E] w-auto rounded-2xl shadow">
            <div className="px-6 mb-3 w-full flex flex-wrap items-center justify-between">
              <div className="flex flex-col justify-start">
                <h2 className="text-[#9291A5] font-normal text-[18px]">
                  Chart
                </h2>
                <h1 className="font-semibold text-[22px]">
                  {selectedMetric?.metrics}
                </h1>
              </div>

              <div>
                <Select onValueChange={handleSelectMetric}>
                  <SelectTrigger className="w-[180px] rounded-full flex justify-around border-none dark:text-white bg-[#E6F6F0] dark:bg-[#8D9D93]">
                    <SelectValue
                      placeholder="Select Metric"
                      className="text-center w-full"
                    />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-white">
                    {FinancialData.map((item, index) => (
                      <SelectItem key={index} value={item.metrics}>
                        {item.metrics}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="ml-6 mb-4">
              <Separator className="my-4 h-[1px] w-full dark:bg-[#E6EEEA]" />
            </div>
            <div className="overflow-x-auto md:overflow-visible">
              <div className="min-w-[600px]">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="6 6" vertical={false} />
                    <XAxis
                      dataKey="name"
                      strokeWidth={1}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme === 'dark' ? 'white' : '#615E83' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme === 'dark' ? 'white' : '#615E83' }}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="#148C59"
                      barSize={60}
                      shape={<CustomBar />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Financials;
