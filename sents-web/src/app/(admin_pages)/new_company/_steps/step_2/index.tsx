import React from 'react';
import Section_1 from './Section_1';

const index = ({ setStep, step, category, metrics }: any) => {
  return (
    <div className="space-y-8">
      <Section_1
        setStep={setStep}
        step={step}
        category={category}
        metrics={metrics}
      />
    </div>
  );
};

export default index;
