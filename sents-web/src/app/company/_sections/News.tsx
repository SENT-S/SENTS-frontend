import React, { useState, useEffect } from 'react';

import CustomNewsCard from '@/components/ui/customNewsCard';
import CustomPagination from '@/components/ui/customPagination';
import { defaultImageUrl } from '@/services/mockData/mock';

interface NewsProps {
  data: any;
}

const News = ({ data }: NewsProps) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <CustomPagination
        items={data}
        itemsPerPage={4}
        render={(currentItems: any) => {
          return (
            <div className="grid grid-cols-1 gap-4">
              {currentItems.map((newsItem: any) => (
                <CustomNewsCard
                  key={newsItem.id}
                  label={newsItem.news_category}
                  imgURL={defaultImageUrl}
                  newsItem={newsItem}
                  windowWidth={windowWidth}
                  showCheckbox={false}
                  onCheckboxChange={() => {}}
                  selectedIds={[]}
                />
              ))}
            </div>
          );
        }}
      />
    </div>
  );
};

export default News;
