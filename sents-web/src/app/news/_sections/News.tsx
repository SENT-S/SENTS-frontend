import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { defaultImageUrl } from '@/services/mockData/mock';

const NewsItem = ({
  newsItem,
  windowWidth,
}: {
  newsItem: any;
  windowWidth: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      key={newsItem.id}
      className="flex items-center gap-4 bg-gray-100 dark:text-white dark:bg-[#39463E80] h-auto hover:bg-[#E6EEEA] cursor-pointer rounded-2xl relative transition-colors duration-200 ease-in-out"
      onClick={() => console.log('clicked')}
    >
      <div className="w-64 h-40 relative">
        <Image
          src={defaultImageUrl}
          alt={newsItem.headline}
          className="w-full h-full object-cover rounded-bl-2xl rounded-tl-2xl"
          fill={true}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div>
        <span
          className={`${hovered ? 'bg-green-700 text-white' : 'bg-green-200'} px-2 py-1 text-green-600 p-[3px] transition-colors duration-200 ease-in-out`}
        >
          News
        </span>
        <h3 className="text-sm md:text-lg font-semibold mt-3">
          {windowWidth < 768
            ? `${newsItem.headline.slice(0, 40)}...`
            : newsItem.headline}
        </h3>
        <p className="text-sm text-gray-600 dark:text-white">
          {windowWidth < 768
            ? `${newsItem.short_description.slice(0, 50)}...`
            : newsItem.short_description}
        </p>
      </div>
      <span
        className={`absolute bottom-0 right-0 ${hovered ? 'bg-green-200 dark:text-black' : 'bg-green-700 text-white'} rounded-tl-2xl rounded-br-2xl px-2 py-1 text-sm transition-colors duration-200 ease-in-out`}
      >
        {newsItem.news_source}
      </span>
    </div>
  );
};

export default function News({ data }: { data: any[] }) {
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
          newsItem={newsItem}
          windowWidth={windowWidth}
        />
      ))}
    </div>
  );
}
