import React, { useState } from 'react';
import ModalForms from '@/components/admin/modal';
import AddNewStatementContent from '@/components/admin/forms/Add_new_statement';
import { RiDeleteBin6Line } from 'react-icons/ri';

const FStatements = ({
  financialStatements,
  companyID,
}: {
  financialStatements: any[];
  companyID: any;
}) => {
  const [open, setOpen] = useState(false);
  const getFileNameFromUrl = (url: string) => {
    if (!url) {
      return '';
    }
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const parts = pathname.split('/');
    return parts[parts.length - 1];
  };

  const handleDelete = (id: any) => {
    console.log(id);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <h2 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">
        Financial Statements
      </h2>
      {/* List statements */}
      <ul className="list-none items-center">
        {financialStatements.length > 0 ? (
          financialStatements.map((statement, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-2 ${index !== financialStatements.length - 1 ? 'border-b border-[#E6EEEA] dark:border-[#39463E]' : ''}`}
            >
              <span>{getFileNameFromUrl(statement)}</span>
              <ModalForms
                FormTitle="Are you sure you want to delete document"
                ButtonStyle="p-0 m-0"
                openDialog={open}
                setDialog={setOpen}
                Icon={
                  <div className="rounded-full flex items-center p-2 bg-[#F5ECEC]">
                    <RiDeleteBin6Line
                      className="text-[#EA0000] cursor-pointer"
                      size={20}
                    />
                  </div>
                }
                onSubmit={() => handleDelete(statement)}
                onCancel={() => handleCancel()}
                SubmitText="Yes"
                CancelText="No"
                SubmitButtonStyle="bg-[#EA0000] hover:bg-[#EA0000] text-white w-1/2 p-3 rounded-2xl flex justify-center items-center"
              />
            </li>
          ))
        ) : (
          <div className="flex items-center justify-center h-full w-full space-y-10 rounded-2xl px-8 py-4">
            <p>No statements available.</p>
          </div>
        )}
      </ul>

      <div className="flex justify-center items-center">
        <AddNewStatementContent companyID={companyID} />
      </div>
    </div>
  );
};

export default FStatements;
