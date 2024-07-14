'use client';
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts';
import Stepper from '@/components/ui/Stepper';
import Step_1 from './_steps/step_1';
import Step_2 from './_steps/step_2';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  getAllFinancialDataCategories,
  getAllFinancialMetrics,
} from '@/services/apis/companies';

const steps = ['Step 1', 'Step 2'];

const fetchFinancialData = async () => {
  const [categoriesRes, metricsRes] = await Promise.all([
    getAllFinancialDataCategories(),
    getAllFinancialMetrics(),
  ]);

  return { categories: categoriesRes, metrics: metricsRes.data };
};

const AddCompanyPage = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState([]);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchFinancialData().then(({ categories, metrics }) => {
      setCategory(categories);
      setMetrics(metrics);
    });
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8 mt-4 text-center">
        <Breadcrumb className="bg-white rounded-md shadow-md p-4 dark:bg-[#39463E80]">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="text-green-600">
                Dashboard
              </BreadcrumbLink>
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
          <Step_2 setStep={setStep} category={category} metrics={metrics} />
        )}
      </div>
    </MainLayout>
  );
};

export default AddCompanyPage;
