import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Section_1 from './Section_1';
import Section_2 from './Section_2';
import Preview from './Preview';

function index({ setStep, step }: { setStep: any; step: number }) {
  const [innerStep, setInnerStep] = useState(1);
  return (
    <div className="space-y-8">
      {innerStep === 1 && <Section_1 />}
      {innerStep === 2 && <Section_2 />}
      {innerStep === 3 && (
        <Preview
          innerStep={innerStep}
          setInnerStep={setInnerStep}
          setStep={setStep}
          step={step}
        />
      )}

      {innerStep !== 3 && (
        <Button
          onClick={() => {
            setInnerStep(innerStep + 1);
          }}
          className="bg-[#148C59] text-white w-full px-3 py-7 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
        >
          {innerStep === 2 ? 'Submit' : 'Next'}
        </Button>
      )}
    </div>
  );
}

export default index;
