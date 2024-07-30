/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import NewsItem from '@/components/NewsItem/NewsItem';
import { defaultImageUrl } from '@/services/mockData/mock';

export default function Teams({
  data,
  showCheckbox,
  onCheckboxChange,
  selectedIDs,
}: {
  data: any[];
  showCheckbox: boolean;
  onCheckboxChange: (id: string, checked: boolean) => void;
  selectedIDs: string[];
}) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full px-8 py-4">
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      {data?.map((newsItem) => (
        <NewsItem
          key={newsItem.id}
          label="Teams"
          imgURL={defaultImageUrl}
          newsItem={newsItem}
          windowWidth={windowWidth}
          showCheckbox={showCheckbox}
          selectedIds={selectedIDs}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </div>
  );
}
