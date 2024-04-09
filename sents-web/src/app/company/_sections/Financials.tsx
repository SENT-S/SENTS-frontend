import React, { useState } from 'react';
import Image from 'next/image';
import FinancialImage from '@/public/images/financial.png';

interface FinancialProps {
  data: any;
}

const PastLinks = [
  { name: 'December 2023', value: 'december-2021' },
  { name: 'September 2023', value: 'september-2021' },
  { name: 'June 2023', value: 'june-2021' },
  { name: 'March 2023', value: 'march-2021' },
];

const Financials = ({ data }: FinancialProps) => {
  const [selectedLink, setSelectedLink] = useState(PastLinks[0].value);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Stanbic Uganda Holdings Limited
        </h1>
        <h2 className="text-xl font-thin mb-2">SBU</h2>
        <span className="font-semibold text-lg">Quarterly Financials</span>
      </div>
      <div className="bg-gray-100 rounded-2xl flex justify-between py-3 px-4">
        {PastLinks.map(link => (
          <div
            key={link.value}
            className={`cursor-pointer p-2 rounded-xl ${
              selectedLink === link.value ? 'bg-gray-300 ' : ''
            }`}
            onClick={() => setSelectedLink(link.value)}
          >
            {link.name}
          </div>
        ))}
      </div>
      <div className="relative w-full h-auto">
        <Image
          src={FinancialImage}
          alt="financials"
          objectFit="contain"
          className="rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Financials;
