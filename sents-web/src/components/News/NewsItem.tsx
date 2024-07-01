import React, { useState } from 'react';
import Image from 'next/image';

const NewsItem = ({
  label,
  showCheckbox,
  imgURL,
  newsItem,
  windowWidth,
  onCheckboxChange,
  selectedIds,
}: {
  label: string;
  imgURL: string;
  newsItem: any;
  windowWidth: number;
  showCheckbox: boolean;
  onCheckboxChange: (id: string, checked: boolean) => void;
  selectedIds?: string[];
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-row">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        key={newsItem.id}
        className="flex items-center w-full gap-4 bg-gray-100 dark:text-white dark:bg-[#39463E80] h-auto hover:bg-[#E6EEEA] cursor-pointer rounded-2xl relative transition-colors duration-200 ease-in-out"
        onClick={() => {
          window.open(newsItem.link_to_news_page, '_blank');
        }}
      >
        <div className="w-64 h-40 relative">
          <Image
            src={imgURL}
            alt={newsItem.headline}
            className="w-full  h-full object-cover rounded-bl-2xl rounded-tl-2xl"
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="max-w-xl text-left">
          <span
            className={`${hovered ? 'bg-green-700 text-white' : 'bg-green-200'} px-2 py-1 text-green-600 p-[3px] transition-colors duration-200 ease-in-out`}
          >
            {label}
          </span>
          <h3 className="text-sm md:text-lg font-semibold mt-3">
            {windowWidth < 768
              ? `${newsItem?.headline.slice(0, 40)}...`
              : newsItem?.headline}
          </h3>
          <p className="text-sm text-gray-600 dark:text-white">
            {windowWidth < 768
              ? `${newsItem?.short_description.slice(0, 50)}...`
              : newsItem?.short_description}
          </p>
        </div>
        <span
          className={`absolute md:w-auto bottom-0 right-0 ${hovered ? 'bg-green-200 dark:text-black' : 'bg-green-700 text-white'} rounded-tl-2xl rounded-br-2xl px-2 py-1 text-sm transition-colors duration-200 ease-in-out`}
        >
          {newsItem?.news_source}
        </span>
      </div>
      {showCheckbox && (
        <input
          type="checkbox"
          className="bg-gray-700 ml-2 -mr-2 cursor-pointer checked:bg-gray-700 checked:border-transparent checked:text-white transition-colors duration-200 ease-in-out"
          id={`news-${newsItem.id}`}
          onChange={e => onCheckboxChange(newsItem?.id, e.target.checked)}
          checked={selectedIds?.includes(newsItem?.id)}
        />
      )}
    </div>
  );
};

export default NewsItem;
