import React from 'react';
import Image from 'next/image';
import Expert1 from '@/public/images/expert1.png';
import Expert2 from '@/public/images/expert2.png';

const Experts_Buy = () => {
  return (
    <div className="space-y-8 w-full">
      <div className="relative space-y-4 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
        <h1 className="text-2xl font-semibold">Talk to our experts</h1>
        <h2 className="text-[40px] font-semibold">
          Coming <br /> Soon!
        </h2>
        <div className="flex justify-end">
          <div className="relative">
            <Image
              src={Expert1}
              alt="expert"
              width={190}
              height={190}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
        <h1 className="text-2xl font-semibold">Buy from us</h1>
        <h2 className="text-[40px] font-semibold">
          Coming <br /> Soon!
        </h2>
        <div className="flex justify-end">
          <div className="relative">
            <Image
              src={Expert2}
              alt="expert"
              width={190}
              height={190}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experts_Buy;
