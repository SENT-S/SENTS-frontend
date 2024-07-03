import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Section_1 from './Section_1';
import Section_2 from './Section_2';
import Preview from './Preview';
import { resetCompanyFields } from '@/lib/ReduxSlices/create_company';
import { useDispatch, useSelector } from '@/lib/utils';
import { IoArrowBack } from 'react-icons/io5';

function index({ setStep, step }: { setStep: any; step: number }) {
  const dispatch = useDispatch();
  const companyFields = useSelector(state => state.company);
  const [innerStep, setInnerStep] = useState(1);

  const handleFormSubmit = () => {
    setInnerStep(innerStep + 1);
    console.log(companyFields);
    dispatch(resetCompanyFields());
  };

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
        >
          {innerStep === 2 ? 'Submit' : 'Next'}
        </Button>
      )}
    </div>
  );
}

export default index;
