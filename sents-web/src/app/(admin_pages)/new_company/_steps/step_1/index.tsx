import React, { useState, useEffect, useCallback } from 'react';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'sonner';

import Preview from './Preview';
import Section_1 from './Section_1';
import Section_2 from './Section_2';

import { Button } from '@/components/ui/button';
import CustomBackButton from '@/components/ui/customBackButton';
import { createCompanyAPI } from '@/lib/ReduxSlices/create_company';
import { useDispatch, useSelector } from '@/lib/utils';

function Index({ setStep, step }: { setStep: any; step: number }) {
  const dispatch = useDispatch();
  const companyFields = useSelector((state) => state.company);
  const [innerStep, setInnerStep] = useState(1);

  const handleFormSubmit = useCallback(async () => {
    try {
      // Check if all fields are filled
      const allFieldsFilled = Object.values(companyFields).every((field) => field !== '');
      const formattedData = {
        company_name: companyFields.company_name,
        stock_symbol: companyFields.stock_symbol,
        company_country: companyFields.company_country,
        sector_or_industry: companyFields.sector_or_industry,
        about_company: companyFields.about_company,
        mission_statement: companyFields.mission_statement,
        vision_statement: companyFields.vision_statement,
        ceo: companyFields.ceo,
        number_of_employees: companyFields.number_of_employees,
        year_founded: companyFields.year_founded,
        website_url: companyFields.website_url,
      };

      if (innerStep === 1) {
        setInnerStep((prevStep) => prevStep + 1);
      }

      if (innerStep === 2) {
        if (!allFieldsFilled) {
          toast.error('All fields must be filled to create a company', {
            position: 'top-center',
          });
          return;
        }
        await dispatch(createCompanyAPI(formattedData));
      }
    } catch (error) {
      console.error('Failed to create company', error);
      toast.error('Failed to create company, please try again', {
        position: 'top-center',
      });
    }
  }, [companyFields, innerStep, dispatch]);

  useEffect(() => {
    if (companyFields.response && companyFields.response.status === 201) {
      setInnerStep((prevStep) => prevStep + 1);
      toast.success('Company created successfully', {
        position: 'top-center',
      });
    } else if (companyFields.response && companyFields.response.status !== 201) {
      toast.error(companyFields.response.error, {
        position: 'top-center',
      });
    }
  }, [companyFields.response]);

  return (
    <div className="space-y-8">
      {innerStep === 1 && <Section_1 />}
      {innerStep === 2 && (
        <>
          <div className="flex items-center justify-between">
            <CustomBackButton onClick={() => setInnerStep(innerStep - 1)} />
          </div>
          <Section_2 />
        </>
      )}
      {innerStep === 3 && (
        <Preview innerStep={innerStep} setInnerStep={setInnerStep} setStep={setStep} step={step} />
      )}

      {innerStep !== 3 && (
        <Button
          onClick={handleFormSubmit}
          className="bg-[#148C59] text-white w-full px-3 py-7 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
          disabled={companyFields?.isLoading}
        >
          {innerStep === 2 ? (
            companyFields?.isLoading ? (
              <ScaleLoader height={20} color="#fff" />
            ) : (
              'Submit'
            )
          ) : (
            'Next'
          )}
        </Button>
      )}
    </div>
  );
}

export default Index;
