/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';

interface OverviewProps {
  data: any;
}

const Overview = ({ data }: OverviewProps) => {
  const tradingViewRef = useRef<HTMLDivElement>(null);
  const [selectedRange, setSelectedRange] = useState<string>('D');
  const [stockPrice, setStockPrice] = useState<number | null>(null);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);

  const stockSymbol = 'AAPL';
  const { theme } = useTheme();

  // Function to handle time range change
  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  // Function to fetch stock price and percentage change
  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`,
      );

      if (response.data) {
        setStockPrice(response.data.c);
        const change = ((response.data.c - response.data.pc) / response.data.pc) * 100;
        setPercentageChange(change);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    // Fetch stock data when component mounts
    fetchStockData();

    let script: HTMLScriptElement | null = null;

    if (tradingViewRef.current) {
      // Clear any existing widget instances to prevent duplicates
      tradingViewRef.current.innerHTML = '';

      // Create a new script element
      script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        if (window.TradingView) {
          new window.TradingView.widget({
            width: '100%',
            height: 600,
            symbol: `NASDAQ:${stockSymbol}`,
            interval: selectedRange,
            timezone: 'Africa/Nairobi',
            theme: theme === 'dark' ? 'dark' : 'light',
            style: '3',
            locale: 'en',
            toolbar_bg: theme === 'dark' ? '#1f2937' : '#f1f3f6',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: 'tradingview_widget',
          });
        } else {
          console.error('TradingView library is not available.');
        }
      };

      // Append the script to the tradingViewRef div
      tradingViewRef.current.appendChild(script);
    }

    return () => {
      if (tradingViewRef.current) {
        tradingViewRef.current.innerHTML = '';
      }
      if (script) {
        script.onload = null; // Prevent memory leaks
      }
    };
  }, [stockSymbol, selectedRange, theme]);

  return (
    <div
      className={`w-full h-auto p-4 shadow-md rounded-lg transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'
      }`}
    >
      <div className="py-2">
        <h1 className="text-3xl font-bold">{data?.company_name}</h1>
        <h2 className="text-xl mb-2">{data?.stock_symbol || 'NASDAQ:AAPL'}</h2>
      </div>

      {/* Stock Price and Percentage Change */}
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-4xl font-bold">
          {stockPrice !== null ? `$${stockPrice.toFixed(2)}` : 'Loading...'}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-lg font-semibold ${
            percentageChange !== null && percentageChange >= 0
              ? 'text-green-600 bg-green-100'
              : 'text-red-600 bg-red-100'
          }`}
        >
          {percentageChange !== null ? `${percentageChange.toFixed(2)}%` : ''}
        </span>
      </div>

      {/* Time Range Buttons */}
      <div className="flex justify-end mb-4 space-x-2">
        {[
          { label: '1D', tooltip: '1 Day' },
          { label: '5D', tooltip: '5 Days' },
          { label: '1M', tooltip: '1 Month' },
          { label: '6M', tooltip: '6 Months' },
          { label: 'YTD', tooltip: 'Year to Date' },
          { label: '1Y', tooltip: '1 Year' },
          { label: '5Y', tooltip: '5 Years' },
          { label: 'ALL', tooltip: 'All Time' },
        ].map(({ label, tooltip }) => (
          <div key={label} className="relative group">
            <button
              onClick={() => handleRangeChange(label)}
              className={`px-4 py-2 font-medium border rounded transition-all duration-300 ${
                selectedRange === label
                  ? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
                  : theme === 'dark'
                    ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden w-max px-2 py-1 text-xs text-white bg-gray-800 rounded group-hover:block">
              {tooltip}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center h-auto w-full">
        <section
          className="w-full"
          id="tradingview_widget"
          ref={tradingViewRef}
          style={{ height: '600px' }}
        ></section>
      </div>
    </div>
  );
};

export default Overview;
