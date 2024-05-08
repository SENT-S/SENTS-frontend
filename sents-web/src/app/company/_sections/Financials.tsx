import React, { useState, useEffect, useRef } from 'react';
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
import html2canvas from 'html2canvas';
import { TooltipProps } from 'recharts';
import { PiMicrosoftExcelLogoDuotone } from 'react-icons/pi';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

// Define types for better type checking
type FormattedMetric = {
  metrics: string;
  [key: string]: string | number;
};

type YearData = {
  value: string;
};

type MetricData = {
  [year: string]: YearData;
};

type FinancialData = {
  [metric: string]: MetricData;
};

type TableData = {
  [key: string]: FormattedMetric[];
};

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

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({
  active,
  payload,
  label,
}) => {
  const { theme } = useTheme(); // Assuming you're using a theme context

  if (active && payload && payload.length) {
    return (
      <div
        className={`tooltip p-3 ${theme === 'dark' ? 'text-white bg-gray-800' : 'bg-white '}`}
      >
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

// Function to format the data
const formatData = (data: FinancialData): FormattedMetric[] => {
  if (!data) {
    return [];
  }

  return Object.keys(data).map(metric => {
    const formattedMetric: FormattedMetric = {
      metrics: metric,
    };
    const yearData = data[metric];
    Object.keys(yearData).forEach(year => {
      formattedMetric[`FY${year.slice(-2)}`] = yearData[year].value;
    });
    return formattedMetric;
  });
};

const Financials = ({
  data,
  financialData,
}: {
  data: any;
  financialData: any[];
}) => {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  const [exported, setExported] = useState(false);
  const [barWidth, setBarWidth] = useState(60);
  const [selectedLink, setSelectedLink] = useState<string>('Financial Summary');
  const [selectedMetric, setSelectedMetric] = useState<FormattedMetric | null>(
    null,
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 5 },
    (_, i) => `FY${String(currentYear - i - 1).slice(-2)}`,
  ).reverse();

  const chartYears = Array.from(
    { length: 5 },
    (_, i) => `${currentYear - i - 1}`,
  ).reverse();

  useEffect(() => {
    const handleResize = () => {
      setBarWidth(window.innerWidth < 768 ? 10 : 60);
    };

    window.addEventListener('resize', handleResize);

    // Call the function initially
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const TableData: TableData = {
    'Financial Summary': formatData(financialData['Financial Summary' as any]),
    'Profit & Loss': formatData(financialData['Profit & Loss' as any]),
    'Balance Sheet': formatData(financialData['Balance Sheet' as any]),
    'Cashflow Statement': formatData(
      financialData['Cashflow Statement' as any],
    ),
    'Financial Analysis': formatData(
      financialData['Financial Analysis' as any],
    ),
  };

  const selectedData = TableData[selectedLink];

  const handleViewChart = (item: FormattedMetric) => {
    setSelectedMetric(item);
  };

  const handleSelectMetric = (metricName: string) => {
    const selectedMetric = selectedData.find(
      item => item.metrics === metricName,
    );
    if (selectedMetric) {
      setSelectedMetric(selectedMetric);
    } else {
      console.error(`Metric ${metricName} not found`);
    }
  };

  const chartData = selectedMetric
    ? years.map((year, index) => {
        const value = selectedMetric[year];
        // Check if the value is a percentage
        if (typeof value === 'string' && value.endsWith('%')) {
          // Remove the '%' sign and convert to a number
          return {
            name: chartYears[index],
            value: parseFloat(value.slice(0, -1)),
          };
        } else {
          return { name: chartYears[index], value: Number(value) };
        }
      })
    : [];

  const exportChartAsImage = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, { useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      let link = document.createElement('a');
      link.href = imgData;
      link.download = `${data?.company_name && data.company_name}-${selectedLink}.png`;
      link.click();

      // Display a success message
      toast.success('Chart exported successfully', {
        position: 'top-right',
        style: { background: 'green', color: 'white', border: 'none' },
        duration: 5000,
      });
    } else {
      console.error('Chart not found');
    }
  };

  const exportTableAsExcel = () => {
    // Check if data is available
    if (!selectedData || !data?.company_name) {
      toast.error('No data available to export', {
        position: 'top-right',
        style: { background: 'red', color: 'white', border: 'none' },
        duration: 5000,
      });
      return;
    }

    // Display a success message
    toast.success('Data exported successfully', {
      position: 'top-right',
      style: { background: 'green', color: 'white', border: 'none' },
      duration: 5000,
    });

    // Create a new workbook and a new worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(selectedData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate the filename
    const filename = `${data.company_name}-${selectedLink}.xlsx`;

    // Write the workbook to a file
    XLSX.writeFile(wb, filename);
  };

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
        <div className="space-y-5">
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
          {selectedData && selectedData.length > 0 && (
            <div className="flex justify-end gap-3 items-center">
              <Button
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={() => {
                  exportTableAsExcel();
                }}
              >
                <PiMicrosoftExcelLogoDuotone className="mr-2" size={20} />
                Excel
              </Button>
            </div>
          )}
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
                {selectedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  selectedData.map(
                    (
                      item: { [key: string]: string | number },
                      index: number,
                    ) => (
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
                            {isNaN(Number(item[year]))
                              ? '__'
                              : Number(item[year]).toLocaleString()}
                          </TableCell>
                        ))}
                        <TableCell className="w-2/6 py-2">
                          <a
                            href="#"
                            onClick={() =>
                              handleViewChart(item as FormattedMetric)
                            }
                            className="text-[#148C59] z-50"
                          >
                            view chart
                          </a>
                        </TableCell>
                      </TableRow>
                    ),
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="icon"
              className="ml-3"
              onClick={() => setSelectedMetric(null)}
            >
              <IoChevronBackOutline />
            </Button>
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                exportChartAsImage();
              }}
            >
              Export
            </Button>
          </div>
          <div className="p-4 bg-[#F8FAF9] dark:text-white dark:bg-[#39463E] w-auto rounded-2xl shadow">
            <div className="flex justify-end">
              <Select onValueChange={handleSelectMetric}>
                <SelectTrigger className="w-[180px] rounded-full flex justify-around border-none dark:text-white bg-[#E6F6F0] dark:bg-[#8D9D93]">
                  <SelectValue
                    placeholder="Select Metric"
                    className="text-center w-full"
                  />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  {selectedData.map((item, index) => (
                    <SelectItem key={index} value={item.metrics}>
                      {item.metrics}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="overflow-x-auto md:overflow-visible">
              <div
                className={`py-2 w-auto ${theme === 'dark' ? 'bg-[#39463E] text-white' : ''}`}
                ref={chartRef}
              >
                <div className="w-full px-3 md:px-6">
                  <div className="flex flex-col justify-start">
                    <h2 className="text-[#9291A5] font-normal text-[18px]">
                      Chart
                    </h2>
                    <h1 className="font-semibold text-[22px]">
                      {selectedMetric?.metrics}
                    </h1>
                  </div>
                  <div className="mb-8">
                    <Separator className="my-4 h-[1px] w-full dark:bg-[#E6EEEA]" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData} className="-ml-3 md:-ml-0">
                    <CartesianGrid strokeDasharray="6 6" vertical={false} />
                    <XAxis
                      dataKey="name"
                      strokeWidth={1}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: theme === 'dark' ? 'white' : '#615E83',
                        dy: 10,
                      }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme === 'dark' ? 'white' : '#615E83' }}
                      tickFormatter={value => {
                        if (value >= 1e18) {
                          return Math.round(value / 1e18) + ' ' + 'Qi';
                        } else if (value >= 1e15) {
                          return Math.round(value / 1e15) + ' ' + 'Qa';
                        } else if (value >= 1e12) {
                          return Math.round(value / 1e12) + ' ' + 'T';
                        } else if (value >= 1e9) {
                          return Math.round(value / 1e9) + ' ' + 'B';
                        } else if (value >= 1e6) {
                          return Math.round(value / 1e6) + ' ' + 'M';
                        } else if (value >= 1e3) {
                          return Math.round(value / 1e3) + ' ' + 'K';
                        } else {
                          return value;
                        }
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="value"
                      fill="#148C59"
                      barSize={barWidth}
                      shape={<CustomBar />}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="text-center mt-4 text-sm">
                  © {currentYear} Sents. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Financials;
