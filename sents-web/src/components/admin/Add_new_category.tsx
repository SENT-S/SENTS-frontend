import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import FormModal from './modal';

const Add_new_category = () => {
  const [document, setDocument] = useState<File | null>(null);

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
      ButtonText="Add Category"
      FormTitle="Add a New Category"
      onSubmit={handleSubmit}
      ButtonStyle="bg-[#E6EEEA] text-[#39463E] p-2 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
    >
      <div className="space-y-3">
        <Input
          type="text"
          name="category_name"
          placeholder="Enter Category Name"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
      </div>
    </FormModal>
  );
};

export default Add_new_category;
