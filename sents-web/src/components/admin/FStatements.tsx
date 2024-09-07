import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'sonner';

import AddNewStatementContent from '@/components/forms/modals/Add_new_statement';
import ModalTemplate from '@/components/forms/ModalTemplate';
import { deleteCompanyDocument } from '@/utils/apiClient';

const FStatements = ({
  financialStatements,
  companyID,
}: {
  financialStatements: any[];
  companyID: any;
}) => {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  const getFileNameFromUrl = (url: string) => {
    if (!url) {
      return '';
    }
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const parts = pathname.split('/');
    return parts[parts.length - 1];
  };

  const handleDelete = async (id: any, index: number) => {
    try {
      const response = await deleteCompanyDocument(id);
      if (response.status === 200) {
        toast.success('Document deleted successfully', {
          position: 'bottom-right',
        });
        setOpen((prev) => ({ ...prev, [index]: false }));
      } else {
        toast.error('Failed to delete document', {
          position: 'bottom-right',
        });
      }
    } catch (error) {
      toast.error('An error occurred while deleting the document', {
        position: 'bottom-right',
      });
      console.log(error);
    }
  };

  const handleCancel = (index: number) => {
    setOpen((prev) => ({ ...prev, [index]: false }));
  };

  const handleOpen = (index: number) => {
    setOpen((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div>
      <h2 className="text-[#0D4222] dark:text-[#E6F6F0] text-left">Financial Statements</h2>
      {/* List statements */}
      <ul className="list-none items-center">
        {financialStatements.length > 0 ? (
          financialStatements.map((statement, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-2 ${index !== financialStatements.length - 1 ? 'border-b border-[#E6EEEA] dark:border-[#39463E]' : ''}`}
            >
              <span>{getFileNameFromUrl(statement.docurl)}</span>
              <ModalTemplate
                FormTitle="Are you sure you want to delete document"
                ButtonStyle="p-0 m-0"
                openDialog={open[index] || false}
                setDialog={() => handleOpen(index)}
                Icon={
                  <div className="rounded-full flex items-center p-2 bg-[#F5ECEC]">
                    <RiDeleteBin6Line
                      className="text-[#EA0000] cursor-pointer"
                      size={20}
                      onClick={() => handleOpen(index)}
                    />
                  </div>
                }
                onSubmit={() => handleDelete(statement.docid, index)}
                onCancel={() => handleCancel(index)}
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
