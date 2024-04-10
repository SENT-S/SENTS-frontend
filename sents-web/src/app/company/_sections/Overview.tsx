import React from 'react';
import Image from 'next/image';
import OveriewImage from '@/public/images/overview.png';

interface OverviewProps {
  data: any;
}

const Overview = ({ data }: OverviewProps) => {
  return (
    <div className="w-full h-auto">
      <div className="w-full relative flex justify-center mt-6 mb-12">
        <h1 className="text-3xl font-semibold">Coming Soon!</h1>
      </div>
      <div className="relative left-4 flex justify-end">
        <Image
          src={OveriewImage}
          alt="overview"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Overview;
