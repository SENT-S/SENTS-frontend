import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MdOutlineCloudUpload } from 'react-icons/md';
import FormModal from '../modal';

const AddNewStatement = ({ companyID }: any) => {
  const [document, setDocument] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setDocument(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (document) {
      const data = Object.fromEntries(formData.entries());
      console.log('Form Data:', data);
    }

    // clear form after
    e.target.reset();
    setDocument(null);
  };

  return (
    <FormModal
      ButtonText="Add New Statement"
      FormTitle="Add a New Statement"
      onSubmit={handleSubmit}
      ButtonStyle="bg-[#39463E] text-white p-4 rounded-2xl hover:bg-[#39463ece]"
    >
      <div className="space-y-3">
        <Input
          type="text"
          name="document_name"
          placeholder="Enter Document Name"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <div className="flex items-center rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-4 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white">
          <Input
            type="file"
            name="document"
            accept=".pdf,.xlsx,.xls,.doc,.docx"
            id="fileUpload"
            className="w-full border-none hidden"
            onChange={handleFileChange}
          />
          <Label
            htmlFor="fileUpload"
            className="w-full border-none cursor-pointer"
          >
            {document ? document.name : 'Upload Document'}
          </Label>
          <MdOutlineCloudUpload className="ml-0" size={18} />
        </div>
      </div>
    </FormModal>
  );
};

export default AddNewStatement;
