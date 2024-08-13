import React, { useState } from 'react';
import { toast } from 'sonner';

import CustomModalField from '../../ui/customModalField';
import ModalTemplate from '../ModalTemplate';

import { addCompanyDocuments } from '@/utils/apiClient';
import { fieldOptions, financialStatementSchema } from '@/utils/validations';

const AddNewStatement = ({ companyID }: { companyID: number }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('company_document', data.company_document);
    formData.append('company', companyID.toString());
    setLoading(true);
    try {
      const res = await addCompanyDocuments(formData);
      if (res.status === 201 || res.status === 200) {
        toast.success('Document added successfully', {
          style: { background: 'green', color: 'white', border: 'none' },
          position: 'top-center',
          duration: 5000,
        });
      } else {
        throw new Error('Failed to add document');
      }
    } catch (error: any) {
      toast.error('An error occurred, please try again', {
        style: { background: 'red', color: 'white', border: 'none' },
        position: 'top-center',
        duration: 5000,
      });
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <ModalTemplate
      ButtonText="Add New Statement"
      FormTitle="Add a New Statement"
      onSubmit={handleSubmit}
      loading={loading}
      openDialog={showModal}
      setDialog={setShowModal}
      ButtonStyle="bg-[#39463E] text-white p-4 rounded-2xl hover:bg-[#39463ece]"
      formProps={{ encType: 'multipart/form-data' }}
      formSchema={financialStatementSchema}
      defaultValues={{
        company_document: null,
      }}
    >
      <CustomModalField
        type="file"
        name="company_document"
        placeholder="Upload document"
        fieldType={fieldOptions.FILE}
        acceptedTypes=".pdf, .doc, .docx, .xls, .xlsx"
      />
    </ModalTemplate>
  );
};

export default AddNewStatement;
