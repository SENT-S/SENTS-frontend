import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MdOutlineCloudUpload } from 'react-icons/md';
import FormModal from '../modal';
import { addCompanyDocuments } from '@/services/apis/companies';
import { toast } from 'sonner';

const AddNewStatement = ({ companyID }: { companyID: number }) => {
  const [document, setDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setDocument(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!document) {
      toast.error('Please upload a document', {
        style: { background: 'red', color: 'white', border: 'none' },
        position: 'top-center',
        duration: 5000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('company_document', document);
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
        // Reset form
        setDocument(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
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
    <FormModal
      ButtonText="Add New Statement"
      FormTitle="Add a New Statement"
      onSubmit={handleSubmit}
      loading={loading}
      openDialog={showModal}
      setDialog={setShowModal}
      ButtonStyle="bg-[#39463E] text-white p-4 rounded-2xl hover:bg-[#39463ece]"
      formProps={{ encType: 'multipart/form-data' }}
    >
      <div className="space-y-3">
        <div className="flex items-center rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-4 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white">
          <Input
            type="file"
            name="company_document"
            accept=".pdf,.xlsx,.xls,.doc,.docx"
            id="fileUpload"
            ref={fileInputRef}
            className="w-full border-none hidden"
            onChange={handleFileChange}
          />
          <Label htmlFor="fileUpload" className="w-full border-none cursor-pointer">
            {document ? document.name : 'Upload Document'}
          </Label>
          <MdOutlineCloudUpload className="ml-0" size={18} />
        </div>
      </div>
    </FormModal>
  );
};

export default AddNewStatement;
