import React from 'react';
import Image from 'next/image';

interface NewsProps {
  data: any;
}

const mockData = [
  {
    id: 1,
    title:
      'Stanbic Uganda Holdings Reports Record Profits in 2023 Annual Financial Report',
    description:
      'Stanbic Uganda Holdings Limited, one of the leading financial services groups in Uganda, has announced record-breaking profits in its 2023 Annual Financial Report. ',
    imageUrl: 'https://source.unsplash.com/random/finance',
  },
  {
    id: 2,
    title:
      'Stanbic Uganda Holdings Reports Record Profits in 2023 Annual Financial Report',
    description:
      'Stanbic Uganda Holdings Limited, one of the leading financial services groups in Uganda, has announced record-breaking profits in its 2023 Annual Financial Report.',
    imageUrl: 'https://source.unsplash.com/random/technology',
  },
  {
    id: 3,
    title:
      'Stanbic Uganda Holdings Reports Record Profits in 2023 Annual Financial Report',
    description:
      'Stanbic Uganda Holdings Limited, one of the leading financial services groups in Uganda, has announced record-breaking profits in its 2023 Annual Financial Report. ',
    imageUrl: 'https://source.unsplash.com/random/technology',
  },
];

const News = ({ data }: NewsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {mockData.map(newsItem => (
        <div
          key={newsItem.id}
          className="flex items-center gap-4 bg-white hover:bg-gray-100 cursor-pointer rounded-2xl"
          onClick={() => console.log('clicked')}
        >
          <div className="w-64 h-40 relative">
            <Image
              src={newsItem.imageUrl}
              alt={newsItem.title}
              className="w-full h-full object-cover rounded-bl-2xl rounded-tl-2xl"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <span className="bg-green-200 text-green-600 p-2">News</span>
            <h3 className="text-lg font-semibold mt-3">{newsItem.title}</h3>
            <p className="text-sm text-gray-600">{newsItem.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
