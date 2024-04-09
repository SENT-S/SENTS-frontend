import React from 'react';
import Image from 'next/image';
import OveriewImage from '@/public/images/overview.png';

interface OverviewProps {
  data: any;
}

const Overview = ({ data }: OverviewProps) => {
  return (
    <div>
      <div className="w-full flex justify-center mt-6 mb-12">
        <h1 className="text-3xl font-semibold">Coming Soon!</h1>
      </div>
      <div className="relative w-auto h-auto md:h-[500px]">
        <Image
          src={OveriewImage}
          alt="overview"
          objectFit="contain"
          className="absolute right-[-86px] bottom-0"
        />
      </div>
    </div>
  );
};

export default Overview;
