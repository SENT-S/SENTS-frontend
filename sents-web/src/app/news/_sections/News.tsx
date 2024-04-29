import React, { useState } from 'react';
import Image from 'next/image';
import { mockData } from '@/services/mockData/mock';

export default function News() {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
      {mockData.map(newsItem => {
        const [hovered, setHovered] = useState(false);
        return (
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            key={newsItem.id}
            className="flex items-center gap-4 bg-gray-100 dark:text-white dark:bg-[#39463E80] h-auto hover:bg-[#E6EEEA] cursor-pointer rounded-2xl relative"
            onClick={() => console.log('clicked')}
          >
            <div className="w-64 h-40 relative">
              <Image
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="w-full h-full object-cover rounded-bl-2xl rounded-tl-2xl"
                fill={true}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <span
                className={`${hovered ? 'bg-green-700 text-white' : 'bg-green-200'} px-2 py-1 text-green-600 p-[3px]`}
              >
                News
              </span>
              <h3 className="text-sm md:text-lg font-semibold mt-3">
                {window.innerWidth < 768
                  ? `${newsItem.title.slice(0, 50)}...`
                  : newsItem.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-white">
                {`${newsItem.description}`}
              </p>
            </div>
            <span
              className={`absolute bottom-0 right-0 ${hovered ? 'bg-green-200 dark:text-black' : 'bg-green-700 text-white'} rounded-tl-2xl rounded-br-2xl px-2 py-1 text-sm `}
            >
              stanbic uganda
            </span>
          </div>
        );
      })}
    </div>
  );
}
