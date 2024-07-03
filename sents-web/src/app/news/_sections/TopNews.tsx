import React, { useState, useEffect } from 'react';
import NewsItem from '@/components/NewsItem/NewsItem';

export default function TopNews({
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

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      {data?.map(newsItem => (
        <NewsItem
          key={newsItem.id}
          label="Top News"
          imgURL={'https://source.unsplash.com/random/finance'}
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
