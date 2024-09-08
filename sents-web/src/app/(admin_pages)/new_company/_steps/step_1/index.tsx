import React, { useCallback, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'sonner';

import Preview from './Preview';
import Section_1 from './Section_1';
import Section_2 from './Section_2';

import { Button } from '@/components/ui/button';
import CustomBackButton from '@/components/ui/customBackButton';
import { createCompanyAPI, resetCompanyFields } from '@/lib/ReduxSlices/create_company';
import { setInnerStep } from '@/lib/ReduxSlices/stepSlice';
import { useDispatch, useSelector } from '@/lib/utils';

function Index() {
  const dispatch = useDispatch();
  const companyFields = useSelector((state) => state.company);
  const innerStep = useSelector<any>((state) => state.steps.innerStep);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (innerStep === 1) {
        dispatch(setInnerStep(2));
      } else if (innerStep === 2) {
        const allFieldsFilled = Object.values(companyFields).every((field) => field !== '');
        if (!allFieldsFilled) {
          toast.error('All fields must be filled to create a company', {
            position: 'top-center',
          });
          return;
        }

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

        await dispatch(createCompanyAPI(formattedData));
        dispatch(setInnerStep(3));
        toast.success('Company created successfully', {
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Failed to create company', error);
      toast.error('Failed to create company, please try again', {
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [companyFields, innerStep, dispatch, isSubmitting]);

  const renderSection = useCallback(() => {
    switch (innerStep) {
      case 1:
        return <Section_1 />;
      case 2:
        return (
          <>
            <div className="flex items-center justify-between">
              <CustomBackButton btnType="button" onClick={() => dispatch(setInnerStep(1))} />
            </div>
            <Section_2 />
          </>
        );
      case 3:
        return <Preview />;
      default:
        return null;
    }
  }, [innerStep, dispatch]);

  const renderButton = useCallback(() => {
    if (innerStep === 3) return null;

    return (
      <Button
        type="button"
        onClick={handleFormSubmit}
        className="bg-[#148C59] text-white w-full px-3 py-7 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
        disabled={isSubmitting}
      >
        {innerStep === 2 ? (
          isSubmitting ? (
            <ScaleLoader height={20} color="#fff" />
          ) : (
            'Submit'
          )
        ) : (
          'Next'
        )}
      </Button>
    );
  }, [innerStep, isSubmitting, handleFormSubmit]);

  return (
    <div className="space-y-8">
      {renderSection()}
      {renderButton()}
    </div>
  );
}

export default Index;
