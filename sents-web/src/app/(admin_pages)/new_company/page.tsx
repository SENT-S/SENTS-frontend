'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import Step_1 from './_steps/step_1';
import Step_2 from './_steps/step_2';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Stepper from '@/components/ui/Stepper';
import MainLayout from '@/layouts';
import { fetchMetrics, fetchCategories } from '@/lib/ReduxSlices/metric_category';
import { useSelector, useDispatch } from '@/lib/utils';

const steps = ['Step 1', 'Step 2'];

const AddCompanyPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const financialMetrics = useSelector<any>((state) => state.metricCategory.metricList);
  const financialDataCategories = useSelector<any>((state) => state.metricCategory.categoryList);

  useEffect(() => {
    dispatch(fetchMetrics());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="space-y-8 mt-4 text-center">
        <Breadcrumb className="bg-white rounded-md shadow-md p-4 dark:bg-[#39463E80]">
          <BreadcrumbList>
            <BreadcrumbItem>
              <div
                role="button"
                tabIndex={0}
                className="text-green-600 cursor-pointer"
                onClick={() => router.push('/dashboard')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    router.push('/dashboard');
                  }
                }}
              >
                Dashboard
              </div>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add new Company</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1>Add new Company</h1>
        <Stepper currentStep={step} steps={steps} />

        {/* Display steps */}
        {step === 1 && <Step_1 setStep={setStep} step={step} />}
        {step === 2 && (
          <Step_2
            setStep={setStep}
            category={financialDataCategories?.data || financialDataCategories}
            metrics={financialMetrics}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default AddCompanyPage;
