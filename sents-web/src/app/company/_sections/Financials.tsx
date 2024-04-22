import React, { useState } from 'react';
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

interface FinancialProps {
  data: any;
}

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

const Financials = ({ data }: FinancialProps) => {
  const { theme } = useTheme();
  const [selectedMetric, setSelectedMetric] = useState('');
  const [selectedItem, setSelectedItem] = useState<{
    [key: string]: string | number;
  } | null>(null);
  const years = ['FY19', 'FY20', 'FY21', 'FY22', 'FY23'];

  const handleViewChart = (item: { [key: string]: string | number }) => {
    setSelectedItem(item);
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    const selectedValue = event.target.value as string; // Adjust the type assertion as necessary
    setSelectedMetric(selectedValue);
  };

  const chartData = selectedItem
    ? years.map(year => ({
        name: year,
        value: selectedItem[year as keyof typeof selectedItem],
      }))
    : [];

  const chartData1 = selectedMetric
    ? FinancialData.filter(item => item.metrics === selectedMetric)
        .map(item =>
          years.map(year => ({
            name: year,
            value: item[year as keyof typeof item],
          })),
        )
        .flat()
    : [];

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

      {!selectedItem ? (
        <div className="space-y-8">
          <SubNav
            links={[
              'Financial Summary',
              'Profit & Loss',
              'Balance Sheet',
              'Cashflow Statement',
              'Financial Analysis',
            ]}
            selectedLink="Financial Summary"
            setSelectedLink={() => {}}
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
                {FinancialData.map(
                  (item: { [key: string]: string | number }, index: number) => (
                    <TableRow
                      key={index}
                      className={`
            ${index === FinancialData.length - 1 ? 'rounded-b-xl' : ''}
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
        <div className="p-4 bg-[#F8FAF9] dark:text-white dark:bg-[#39463E] w-auto rounded-2xl shadow">
          <div className="px-6 mb-3 w-full flex flex-wrap items-center justify-between">
            <div className="flex flex-col justify-start">
              <h2 className="text-[#9291A5] font-normal text-[18px]">Chart</h2>
              <h1 className="font-semibold text-[22px]">Revenue</h1>
            </div>

            <div>
              <Select>
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
      )}
    </div>
  );
};

export default Financials;
