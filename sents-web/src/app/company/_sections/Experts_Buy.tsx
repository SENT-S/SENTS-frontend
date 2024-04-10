import React from 'react';
import Image from 'next/image';
import Expert1 from '@/public/images/expert1.png';
import Expert2 from '@/public/images/expert2.png';

const Experts_Buy = () => {
  return (
    <div className="space-y-8">
      <div className="relative space-y-4 rounded-2xl bg-white px-8 py-4">
        <h1 className="text-2xl font-semibold">Talk to our experts</h1>
        <h2 className="text-[40px] leading-10 font-semibold">
          Coming <br /> Soon!
        </h2>
        <div className="flex justify-end">
          <div className="relative w-52 h-52">
            <Image
              src={Expert1}
              alt="expert"
              fill={true}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div className="relative space-y-4 rounded-2xl bg-white px-8 py-4">
        <h1 className="text-2xl font-semibold">Buy from us</h1>
        <h2 className="text-[40px] leading-10 font-semibold">
          Coming <br /> Soon!
        </h2>
        <div className="flex justify-end">
          <div className="relative w-52 h-52">
            <Image
              src={Expert2}
              alt="expert"
              fill={true}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experts_Buy;
