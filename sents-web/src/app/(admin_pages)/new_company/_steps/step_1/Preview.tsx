import React, { useCallback } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { RxPlus } from 'react-icons/rx';

import CompanyCard from '@/components/admin/companyCard';
import { Button } from '@/components/ui/button';
import { resetCompanyFields } from '@/lib/ReduxSlices/create_company';
import { setStep, setInnerStep } from '@/lib/ReduxSlices/stepSlice';
import { useSelector, useDispatch } from '@/lib/utils';

const Preview = () => {
  const dispatch = useDispatch();
  const companyFields = useSelector((state) => state.company);

  // Handle adding a new company
  const handleAddNewCompany = useCallback(() => {
    dispatch(setInnerStep(1));
    dispatch(resetCompanyFields());
  }, [dispatch]);

  // Handle proceeding to add financial data
  const handleProceedToFinancialData = useCallback(() => {
    dispatch(setStep(2));
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <CompanyCard
        title={companyFields.company_name}
        symbol={companyFields.stock_symbol}
        description={companyFields.about_company}
      />
      <div className="flex justify-between flex-wrap">
        {/* Add New Company Button */}
        <ActionButton
          text="Add New Company"
          icon={<RxPlus className="ml-3" size={18} />}
          onClick={handleAddNewCompany}
          bgColor="bg-[#39463E]"
          hoverColor="hover:bg-[#39463ed9]"
        />

        {/* Proceed to Add Financial Data Button */}
        <ActionButton
          text="Proceed to add financial data"
          icon={<FaArrowRightLong className="ml-3" size={18} />}
          onClick={handleProceedToFinancialData}
          bgColor="bg-[#148C59]"
          hoverColor="hover:bg-[#148C59d9]"
        />
      </div>
    </div>
  );
};

export default Preview;

// Reusable ActionButton Component
const ActionButton = ({
  text,
  icon,
  onClick,
  bgColor,
  hoverColor,
}: {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  bgColor: string;
  hoverColor: string;
}) => {
  return (
    <Button
      type="button"
      className={`${bgColor} flex items-center text-white p-2 md:p-7 rounded-2xl dark:text-white ${hoverColor}`}
      onClick={onClick}
    >
      {text} {icon}
    </Button>
  );
};
