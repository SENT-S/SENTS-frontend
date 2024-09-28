import html2canvas from 'html2canvas';
import { useTheme } from 'next-themes';
import React, { useRef } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from 'recharts';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

// Define types for better type checking
type FormattedMetric = {
  metrics: string;
  [key: string]: string | number;
};

interface FinancialChartProps {
  selectedMetric: FormattedMetric | null;
  setSelectedMetric: (metric: FormattedMetric | null) => void;
  chartData: { name: string; value: number }[];
  barWidth: number;
  availableMetrics: FormattedMetric[];
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

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
  const { theme } = useTheme();

  if (active && payload && payload.length) {
    return (
      <div className={`tooltip p-3 ${theme === 'dark' ? 'text-white bg-gray-800' : 'bg-white '}`}>
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const FinancialChart: React.FC<FinancialChartProps> = ({
  selectedMetric,
  setSelectedMetric,
  chartData,
  barWidth,
  availableMetrics,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const exportChartAsImage = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, { useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${selectedMetric?.metrics}-chart.png`;
      link.click();

      // Display a success message
      toast.success('Chart exported successfully', {
        position: 'top-right',
      });
    } else {
      console.error('Chart not found');
    }
  };

  const handleSelectMetric = (metricName: string) => {
    const metric = availableMetrics.find((item) => item.metrics === metricName);
    if (metric) {
      setSelectedMetric(metric);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="icon"
          className="ml-3"
          onClick={() => setSelectedMetric(null)}
        >
          <IoChevronBackOutline />
        </Button>
        <Button className="bg-green-600 text-white hover:bg-green-700" onClick={exportChartAsImage}>
          Export
        </Button>
      </div>
      <div className="p-4 bg-[#F8FAF9] dark:text-white dark:bg-[#39463E] w-auto rounded-2xl shadow">
        <div className="overflow-x-auto md:overflow-visible">
          <div
            ref={chartRef}
            className={`py-2 w-auto ${theme === 'dark' ? 'bg-[#39463E] text-white' : ''}`}
          >
            <div className="w-full px-3 md:px-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col ">
                  <h2 className="text-[#9291A5] font-normal text-[18px]">Chart</h2>
                  <h1 className="font-semibold text-[22px]">{selectedMetric?.metrics}</h1>
                </div>
                <div className="flex justify-end mb-4">
                  <Select onValueChange={handleSelectMetric}>
                    <SelectTrigger className="w-[180px] rounded-full flex justify-around border-none dark:text-white bg-[#E6F6F0] dark:bg-[#8D9D93]">
                      <SelectValue placeholder="Select Metric" className="text-center w-full">
                        {selectedMetric?.metrics}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-[#E6F6F0] rounded-xl">
                      {availableMetrics.map((item, index) => (
                        <SelectItem key={index} value={item.metrics}>
                          {item.metrics}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mb-8">
                <Separator className="my-4 h-[1px] w-full bg-black dark:bg-[#E6EEEA]" />
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
                  tick={{ fill: theme === 'dark' ? 'white' : '#615E83', dy: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme === 'dark' ? 'white' : '#615E83' }}
                  tickFormatter={(value) => {
                    if (value >= 1e18) return Math.round(value / 1e18) + ' Qi';
                    if (value >= 1e15) return Math.round(value / 1e15) + ' Qa';
                    if (value >= 1e12) return Math.round(value / 1e12) + ' T';
                    if (value >= 1e9) return Math.round(value / 1e9) + ' B';
                    if (value >= 1e6) return Math.round(value / 1e6) + ' M';
                    if (value >= 1e3) return Math.round(value / 1e3) + ' K';
                    return value;
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#148C59" barSize={barWidth} shape={<CustomBar />} />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center mt-4 text-sm">
              © {new Date().getFullYear()} Sents. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialChart;
