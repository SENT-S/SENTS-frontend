'use client';
import React, { useState } from 'react';
import MainLayout from '@/layouts';
import Stepper from '@/components/ui/Stepper';
import Step_1 from './_steps/step_1';
import Step_2 from './_steps/step_2';

const page = () => {
  const [step, setStep] = useState(1);
  const steps = ['Step 1', 'Step 2'];
  return (
    <MainLayout>
      <div className="space-y-8 text-center">
        <h1>Add new Company</h1>
        <Stepper currentStep={step} steps={steps} />

        {/* Display steps */}
        {step === 2 && <Step_1 setStep={setStep} step={step} />}
        {step === 1 && <Step_2 setStep={setStep} step={step} />}
      </div>
    </MainLayout>
  );
};

export default page;
