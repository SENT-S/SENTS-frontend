'use client';
import MainLayout from '@/components/layout';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SubNav from '@/components/admin/Navs/SubNav';
import { FiEdit } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import {
  financialStatements,
  countryList,
  companyList,
} from '@/services/mockData/mock';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ModalForms from '@/components/admin/forms/layout';
import AddNewStatementContent from '@/components/admin/forms/contents/Add_new_statement';

const Financials = () => {
  const [selectedCountry, setSelectedCountry] = useState('Uganda');
  const [selectedCompany, setSelectedCompany] = useState('Company');
  const [selectedLink, setSelectedLink] = useState('Financial Summary');
  const [showEdit, setShowEdit] = useState(false);

  const handleSelectCountry = (value: string) => {
    setSelectedCountry(value);
  };

  const handleSelectCompany = (value: string) => {
    setSelectedCompany(value);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">
          Financials
        </h1>
        <div className="flex gap-6 items-center">
          <Select onValueChange={handleSelectCountry}>
            <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
              <SelectValue
                placeholder="Select Country"
                className="text-center w-full"
              >
                {selectedCountry}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
              {countryList.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleSelectCompany}>
            <SelectTrigger className="rounded-2xl p-7 flex justify-between border-none dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
              <SelectValue
                placeholder="Select Country"
                className="text-center w-full"
              >
                {selectedCompany}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
              {companyList.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Nav */}
        <SubNav
          links={[
            'Financial Summary',
            'Profit & Loss',
            'Balance Sheet',
            'Cashflow Statement',
            'Financial Analysis',
          ]}
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
          bgColor={false}
        />
        {/* Edit Button */}
        <Button
          className="bg-[#39463E] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#46554c] hover:text-[39463E]"
          onClick={() => setShowEdit(!showEdit)}
        >
          Edit Table <FiEdit className="ml-3" size={18} />
        </Button>

        {/* Table */}

        {/* Statements */}
        <div>
          <h2 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">
            Financial Statements
          </h2>
          <ul className="list-none items-center">
            {financialStatements.length > 0 ? (
              financialStatements.map((statement, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between p-2 ${index !== financialStatements.length - 1 ? 'border-b border-[#E6EEEA] dark:border-[#39463E]' : ''}`}
                >
                  <span>{statement.name}</span>
                  <ModalForms
                    FormTitle="Are you sure you want to delete document"
                    ButtonStyle="p-0 m-0"
                    Icon={
                      <div className="rounded-full flex items-center p-2 bg-[#F5ECEC]">
                        <RiDeleteBin6Line
                          className="text-[#EA0000] cursor-pointer"
                          size={20}
                        />
                      </div>
                    }
                    onSubmit={() => null}
                    onCancel={() => null}
                    SubmitText="Yes"
                    CancelText="No"
                    SubmitButtonStyle="bg-[#EA0000]"
                  />
                </li>
              ))
            ) : (
              <div className="flex items-center justify-center h-full w-full space-y-10 rounded-2xl bg-white dark:text-white dark:bg-[#39463E80] px-8 py-4">
                <p>No data available.</p>
              </div>
            )}
          </ul>

          <div className="flex justify-center items-center">
            <ModalForms
              ButtonText="Add New Statement"
              FormTitle="Add a New Statement"
              onSubmit={() => null}
              ButtonStyle="bg-[#148C59] text-white p-7 rounded-2xl hover:bg-[#1d6346] hover:text-[39463E]"
            >
              <AddNewStatementContent />
            </ModalForms>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Financials;
