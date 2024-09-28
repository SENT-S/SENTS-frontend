/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';

interface OverviewProps {
  data: any;
}

const Overview = ({ data }: OverviewProps) => {
  const tradingViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear any existing widget instances to prevent duplicates
    if (tradingViewRef.current) {
      tradingViewRef.current.innerHTML = '';
    }

    // Create a new script element
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          // **Required Parameters**
          width: '100%',
          height: 600,
          symbol: data.stock_symbols || 'NASDAQ:AAPL',
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_widget',
        });
      } else {
        console.error('TradingView library is not available.');
      }
    };

    // Append the script to the tradingViewRef div
    if (tradingViewRef.current) {
      tradingViewRef.current.appendChild(script);
    }

    return () => {
      if (tradingViewRef.current) {
        tradingViewRef.current.innerHTML = '';
      }
    };
  }, [data.stock_symbol]);

  return (
    <div className="w-full h-auto p-4">
      <div className="py-2 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">{data?.company_name}</h1>
          <h2 className="text-xl font-thin mb-2">{data?.stock_symbol}</h2>
        </div>
        <h2 className="text-3xl text-green-600 font-semibold">Live Trading Chart</h2>
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
