import React from 'react';
import { Button } from '@/components/ui/button';
import Section_1 from './Section_1';

const index = ({ setStep, step }: { setStep: any; step: number }) => {
  return (
    <div className="space-y-8">
      <Section_1 />

      <Button
        onClick={() => {
          if (step === 2) {
            alert('Company added successfully');
            // back to step 1
            setStep(1);
            return;
          }
          setStep(step + 1);
        }}
        className="bg-[#148C59] text-white w-full px-3 py-7 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
      >
        Complete
      </Button>
    </div>
  );
};

export default index;
