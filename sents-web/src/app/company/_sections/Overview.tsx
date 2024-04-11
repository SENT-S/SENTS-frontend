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
      <div className="flex justify-end h-auto w-full">
        <div className="relative left-4 w-full md:w-[300px] lg:w-[500px] h-[200px] md:h-[300px] lg:h-[500px]">
          <Image
            src={OveriewImage}
            alt="overview"
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
