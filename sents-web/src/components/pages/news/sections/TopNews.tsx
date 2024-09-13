/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import CustomNewsCard from '@/components/ui/customNewsCard';
import { defaultImageUrl } from '@/services/mockData/mock';

export default function TopNews({
  data,
  showCheckbox,
  onCheckboxChange,
  selectedIDs,
}: {
  data: any[];
  showCheckbox: boolean;
  onCheckboxChange: (id: string, checked: boolean) => void;
  selectedIDs: number[];
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
      <div className="flex items-center justify-center h-full w-full space-y-10 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      {data?.map((newsItem) => (
        <CustomNewsCard
          key={newsItem.id}
          label="Top News"
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
