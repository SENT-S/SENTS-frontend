import React, { useCallback, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'sonner';

import Preview from './Preview';
import Section_1 from './Section_1';
import Section_2 from './Section_2';

import { Button } from '@/components/ui/button';
import CustomBackButton from '@/components/ui/customBackButton';
import { createCompanyAPI } from '@/lib/ReduxSlices/create_company';
import { setInnerStep } from '@/lib/ReduxSlices/stepSlice';
import { useDispatch, useSelector } from '@/lib/utils';

const Index = () => {
  const dispatch = useDispatch();
  const companyFields = useSelector((state) => state.company);
  const innerStep = useSelector((state) => state.steps.innerStep);
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
          toast.error('All fields must be filled to create a company', { position: 'top-center' });
          return;
        }

        const formattedData = { ...companyFields };
        await dispatch(createCompanyAPI(formattedData));

        dispatch(setInnerStep(3));
        toast.success('Company created successfully', { position: 'top-center' });
      }
    } catch (error) {
      console.error('Failed to create company', error);
      toast.error('Failed to create company, please try again', { position: 'top-center' });
    } finally {
      setIsSubmitting(false);
    }
  }, [companyFields, innerStep, dispatch, isSubmitting]);

  return (
    <div className="space-y-8">
      <RenderSection innerStep={innerStep} dispatch={dispatch} />
      <RenderButton
        innerStep={innerStep}
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

// Component to render sections based on the step
const RenderSection = ({ innerStep, dispatch }: any) => {
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
};

// Component to render the button based on the step
const RenderButton = ({ innerStep, handleFormSubmit, isSubmitting }: any) => {
  if (innerStep === 3) return null;

  const buttonText =
    innerStep === 2 ? isSubmitting ? <ScaleLoader height={20} color="#fff" /> : 'Submit' : 'Next';

  return (
    <Button
      type="button"
      onClick={handleFormSubmit}
      className="bg-[#148C59] text-white w-full px-3 py-7 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
      disabled={isSubmitting}
    >
      {buttonText}
    </Button>
  );
};

export default Index;
