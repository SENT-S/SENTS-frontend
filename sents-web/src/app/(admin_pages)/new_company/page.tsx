'use client';
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts';
import Stepper from '@/components/ui/Stepper';
import Step_1 from './_steps/step_1';
import Step_2 from './_steps/step_2';
import {
  getAllFinancialDataCategories,
  getAllFinancialMetrics,
} from '@/services/apis/companies';

const page = () => {
  const [step, setStep] = useState(1);
  const steps = ['Step 1', 'Step 2'];
  const [category, setCategory] = useState([]);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesRes, metricsRes] = await Promise.all([
        getAllFinancialDataCategories(),
        getAllFinancialMetrics(),
      ]);

      setCategory(categoriesRes);
      setMetrics(metricsRes.data);
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8 text-center">
        <h1>Add new Company</h1>
        <Stepper currentStep={step} steps={steps} />

        {/* Display steps */}
        {step === 1 && <Step_1 setStep={setStep} step={step} />}
        {step === 2 && (
          <Step_2
            setStep={setStep}
            step={step}
            category={category}
            metrics={metrics}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default page;
