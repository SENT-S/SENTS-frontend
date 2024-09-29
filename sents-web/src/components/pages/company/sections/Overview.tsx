/* eslint-disable no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';

// Define the structure of the stock data prop
interface StockData {
  company_name: string;
  stock_symbol: string;
}

// Define the structure of the component props
interface OverviewProps {
  data: StockData;
}

// Define the structure of Finnhub's quote response
interface FinnhubQuoteResponse {
  c: number; // Current price
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
}

// Extend the Window interface to include TradingView
declare global {
  interface Window {
    TradingView: any;
  }
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  const tradingViewRef = useRef<HTMLDivElement>(null);
  const [selectedRange, setSelectedRange] = useState<string>('1D');
  const [stockPrice, setStockPrice] = useState<number | null>(null);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);

  const stockSymbol = 'AAPL';
  const { theme } = useTheme();

  // Mapping of button labels to TradingView intervals
  const rangeToInterval: Record<string, string> = {
    '1D': 'D',
    '5D': 'D',
    '1M': 'D',
    '6M': 'W',
    YTD: 'M',
    '1Y': 'M',
    '5Y': 'M',
    ALL: 'W',
  };

  // Function to handle time range change
  const handleRangeChange = (range: string) => {
    if (selectedRange !== range) {
      setSelectedRange(range);
    }
  };

  // Function to fetch stock price and percentage change
  const fetchStockData = async () => {
    try {
      const response: AxiosResponse<FinnhubQuoteResponse> = await axios.get(
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
    fetchStockData();
    // Optionally, set up an interval to refresh data periodically
    // const intervalId = setInterval(fetchStockData, 5 * 60 * 1000); // Refresh every 5 minutes
    // return () => clearInterval(intervalId);
  }, [stockSymbol]);

  useEffect(() => {
    const loadTradingViewScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.TradingView) {
          resolve();
          return;
        }

        const existingScript = document.getElementById('tradingview-script');
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', () =>
            reject(new Error('Failed to load TradingView script')),
          );
          return;
        }

        const script = document.createElement('script');
        script.id = 'tradingview-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
          resolve();
        };
        script.onerror = () => {
          reject(new Error('Failed to load TradingView script'));
        };
        document.head.appendChild(script);
      });
    };

    const initializeWidget = () => {
      if (window.TradingView && tradingViewRef.current) {
        // Clear any existing widget to prevent duplicates
        tradingViewRef.current.innerHTML = '';

        new window.TradingView.widget({
          width: '100%',
          height: 600,
          symbol: `NASDAQ:${stockSymbol}`,
          interval: rangeToInterval[selectedRange] || 'D',
          timezone: 'Africa/Nairobi',
          theme: theme === 'dark' ? 'dark' : 'light',
          style: 3,
          locale: 'en',
          toolbar_bg: theme === 'dark' ? '#1f2937' : '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_widget',
        });
      }
    };

    loadTradingViewScript()
      .then(() => {
        initializeWidget();
      })
      .catch((error) => {
        console.error(error);
      });

    // Re-initialize widget when selectedRange or theme changes
    // Cleanup is handled by clearing the innerHTML in initializeWidget
  }, [selectedRange, theme, stockSymbol]);

  return (
    <div
      className={`w-full h-auto p-4 shadow-md rounded-lg transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'
      }`}
    >
      <div className="py-2">
        <h1 className="text-3xl font-bold">{data.company_name}</h1>
        <h2 className="text-xl mb-2">
          {data.stock_symbol ? `NASDAQ:${data.stock_symbol}` : 'NASDAQ:AAPL'}
        </h2>
      </div>

      {/* Stock Price and Percentage Change */}
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-4xl font-bold">
          {stockPrice !== null ? `$${stockPrice.toFixed(2)}` : 'Loading...'}
        </span>
        {percentageChange !== null && (
          <span
            className={`px-3 py-1 rounded-full text-lg font-semibold ${
              percentageChange >= 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
            }`}
          >
            {percentageChange.toFixed(2)}%
          </span>
        )}
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

      {/* TradingView Widget */}
      <div className="flex justify-center h-auto w-full">
        <div
          className="w-full"
          id="tradingview_widget"
          ref={tradingViewRef}
          style={{ height: '600px' }}
        ></div>
      </div>
    </div>
  );
};

export default Overview;
