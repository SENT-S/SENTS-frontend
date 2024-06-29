import React from 'react';
import { RxPlus } from 'react-icons/rx';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import CompanyCard from '../../../_components/companyCard';

const Preview = ({
  innerStep,
  setInnerStep,
  setStep,
  step,
}: {
  setStep: any;
  step: number;
  innerStep: number;
  setInnerStep: any;
}) => {
  return (
    <div className="space-y-8">
      <CompanyCard />
      <div className="flex justify-between flex-wrap">
        <Button
          className="bg-[#39463E] flex items-center text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#39463ed9] hover:text-white"
          onClick={() => {
            setInnerStep(innerStep - 1);
          }}
        >
          Add New Company <RxPlus className="ml-3" size={18} />
        </Button>
        <Button
          className="bg-[#148C59] flex items-center text-white p-2 md:p-7 rounded-2xl hover:bg-[#148C59d9]"
          onClick={() => {
            setStep(step + 1);
          }}
        >
          Proceed to add financial data
          <FaArrowRightLong className="ml-3" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Preview;
