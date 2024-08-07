import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IoArrowBack } from 'react-icons/io5';
import Section_1 from './Section_1';
import Section_2 from './Section_2';
import Preview from './Preview';
import { useDispatch, useSelector } from '@/lib/utils';
import { createCompany } from '@/lib/ReduxSlices/create_company';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'sonner';

function index({ setStep, step }: { setStep: any; step: number }) {
  const dispatch = useDispatch();
  const companyFields = useSelector(state => state.company);
  const [innerStep, setInnerStep] = useState(1);

  const handleFormSubmit = async () => {
    try {
      // Check if all fields are filled
      const allFieldsFilled = Object.values(companyFields).every(
        field => field !== '',
      );

      if (innerStep === 1) {
        setInnerStep(prevStep => prevStep + 1);
      }

      if (innerStep === 2) {
        if (!allFieldsFilled) {
          toast.error('All fields must be filled to create a company', {
            style: { background: 'red', color: 'white', border: 'none' },
            duration: 5000,
            position: 'top-center',
          });
          return;
        }
        return await dispatch(createCompany(companyFields));
      }
    } catch (error) {
      console.error('Failed to create company', error);
      toast.error('Failed to create company, please try again', {
        style: { background: 'red', color: 'white', border: 'none' },
        duration: 5000,
        position: 'top-center',
      });
    }
  };

  useEffect(() => {
    if (companyFields.response && companyFields.response.status === 201) {
      setInnerStep(prevStep => prevStep + 1);
      toast.success('Company created successfully', {
        style: {
          background: 'green',
          color: 'white',
          border: 'none',
        },
        position: 'top-center',
        duration: 5000,
      });
    } else if (
      companyFields.response &&
      companyFields.response.status !== 201
    ) {
      toast.error(companyFields.response.error, {
        style: { background: 'red', color: 'white', border: 'none' },
        duration: 5000,
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
            <Button
              variant="outline"
              size="icon"
              className="ml-3"
              onClick={() => setInnerStep(innerStep - 1)}
            >
              <IoArrowBack />
            </Button>
          </div>
          <Section_2 />
        </>
      )}
      {innerStep === 3 && (
        <Preview
          innerStep={innerStep}
          setInnerStep={setInnerStep}
          setStep={setStep}
          step={step}
        />
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

export default index;
