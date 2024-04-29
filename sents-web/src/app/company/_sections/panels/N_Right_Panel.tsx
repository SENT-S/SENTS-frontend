import React from 'react';
import Image from 'next/image';
import Expert1 from '@/public/images/expert1.png';
import Expert2 from '@/public/images/expert2.png';
import { Button } from '@/components/ui/button';

const N_Right_Panel = () => {
  return (
    <div className="space-y-8 w-full">
      <div className="relative space-y-4 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
        <h1 className="text-2xl font-semibold">Talk to our experts</h1>
        <h2 className="text-[40px] font-semibold">
          Coming <br /> Soon!
        </h2>
        <div className="flex justify-end">
          <div className="relative w-48 h-48">
            <Image
              src={Expert1}
              alt="expert"
              fill={true}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl bg-white relative dark:text-white dark:bg-[#39463E80] px-8 py-4">
        <h1 className="text-4xl text-center font-normal mb-3">
          Subscribe to our Newsletter
        </h1>

        <Button className="absolute left-1/2 z-50 transform -translate-x-1/2 px-8 py-2 hover:bg-green-800 bg-[#148C59] text-white rounded-full text-2xl">
          Subscribe
        </Button>
        <div className="flex justify-end">
          <section className="relative w-auto lg:h-auto">
            <Image src={Expert2} alt="expert" className="object-contain" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default N_Right_Panel;
