'use client';
import React, { useState } from 'react';
import MainLayout from '@/components/layout';
import Stepper from '@/components/ui/Stepper';
import { Button } from '@/components/ui/button';
import Step_1 from './_steps/Step_1';
import Step_2 from './_steps/Step_2';
import Step_3 from './_steps/Step_3';
import Step_4 from './_steps/Step_4';

const page = () => {
  const [step, setStep] = useState(1);
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
  return (
    <MainLayout>
      <div className="space-y-8 text-center">
        <h1>Add new Company</h1>
        <Stepper currentStep={step} steps={steps} />

        {/* Display steps */}
        {step === 1 && <Step_1 />}
        {step === 2 && <Step_2 />}
        {step === 3 && <Step_3 />}
        {step === 4 && <Step_4 />}

        {/* Button to change / increase steps but should not pass the length of steps */}
        <Button
          onClick={() => setStep(step + 1)}
          className="bg-[#148C59] text-white w-full p-3 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
        >
          Next
        </Button>
      </div>
    </MainLayout>
  );
};

export default page;
