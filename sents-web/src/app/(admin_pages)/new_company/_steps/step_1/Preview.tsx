import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxPlus } from "react-icons/rx";

import CompanyCard from "@/components/admin/companyCard";
import { Button } from "@/components/ui/button";
import { resetCompanyFields } from "@/lib/ReduxSlices/create_company";
import { useSelector, useDispatch } from "@/lib/utils";

const Preview = ({
  innerStep,
  setInnerStep,
  setStep,
  step,
}: {
  setStep: any;
  step: number;
  innerStep: number;
  setInnerStep: any;
}) => {
  const dispatch = useDispatch();
  const companyFields = useSelector((state) => state.company);
  return (
    <div className="space-y-8">
      <CompanyCard
        title={companyFields.company_name}
        symbol={companyFields.stock_symbol}
        description={companyFields.about_company}
      />
      <div className="flex justify-between flex-wrap">
        <Button
          className="bg-[#39463E] flex items-center text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#39463ed9] hover:text-white"
          onClick={() => {
            setInnerStep(innerStep - 2);
            dispatch(resetCompanyFields());
          }}
        >
          Add New Company <RxPlus className="ml-3" size={18} />
        </Button>
        <Button
          className="bg-[#148C59] flex items-center text-white p-2 md:p-7 rounded-2xl hover:bg-[#148C59d9]"
          onClick={() => {
            setStep(step + 1);
          }}
        >
          Proceed to add financial data
          <FaArrowRightLong className="ml-3" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Preview;
