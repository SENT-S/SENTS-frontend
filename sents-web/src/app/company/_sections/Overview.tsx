/* eslint-disable no-unused-vars */
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
        <section className="relative left-4 w-auto lg:h-auto">
          <Image
            src={OveriewImage}
            alt="overview"
            className="object-contain"
            priority={true}
          />
        </section>
      </div>
    </div>
  );
};

export default Overview;
