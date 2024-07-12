import React from 'react';
import Section_1 from './Section_1';

const index = ({ setStep, step }: { setStep: any; step: number }) => {
  return (
    <div className="space-y-8">
      <Section_1 setStep={setStep} step={step} />
    </div>
  );
};

export default index;
