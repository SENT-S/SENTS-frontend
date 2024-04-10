import React from 'react';
import Image from 'next/image';
import { mockData } from '@/services/mockData/mock';

interface NewsProps {
  data: any;
}

const News = ({ data }: NewsProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {mockData.map(newsItem => (
        <div
          key={newsItem.id}
          className="flex items-center gap-4 bg-white dark:text-white dark:bg-[#39463E80] h-auto hover:bg-gray-100 cursor-pointer rounded-2xl"
          onClick={() => console.log('clicked')}
        >
          <div className="w-64 h-40 relative">
            <Image
              src={newsItem.imageUrl}
              alt={newsItem.title}
              className="w-full h-full object-cover rounded-bl-2xl rounded-tl-2xl"
              fill={true}
            />
          </div>
          <div>
            <span className="bg-green-200 px-2 py-1 text-green-600 p-[3px]">
              News
            </span>
            <h3 className="text-sm md:text-lg font-semibold mt-3">
              {window.innerWidth < 768
                ? `${newsItem.title.slice(0, 50)}...`
                : newsItem.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-white">
              {`${newsItem.description.slice(0, 100)}...`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
