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
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleClick = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="space-y-8 w-full">
      <div>
        <h1 className="text-2xl font-semibold">
          Stanbic Uganda Holdings Limited
        </h1>
        <h2 className="text-xl font-thin mb-2">SBU</h2>
        <span className="font-semibold text-lg">Quarterly Financials</span>
      </div>
      <div className="bg-gray-100 dark:text-white dark:bg-[#0E120F] rounded-2xl flex justify-between py-3 px-4 overflow-x-auto">
        {PastLinks.map(link => (
          <nav
            key={link.value}
            className={`cursor-pointer min-w-[150px] text-center p-2 rounded-xl ${
              selectedLink === link.value
                ? 'bg-gray-300 dark:bg-[#39463E80]'
                : ''
            }`}
            onClick={() => setSelectedLink(link.value)}
          >
            {link.name}
          </nav>
        ))}
      </div>
      <div className="relative flex justify-center w-full h-auto">
        <Image
          src={FinancialImage}
          alt="financials"
          className="object-contain w-full h-auto md:w-auto md:h-auto"
        />
      </div>
    </div>
  );
};

export default Financials;
