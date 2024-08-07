import React, { useState } from 'react';
import { toast } from 'sonner';

import CustomModalField from '../../ui/customModalField';
import ModalTemplate from '../ModalTemplate';

import { fetchCategories } from '@/lib/ReduxSlices/metric_category';
import { useDispatch } from '@/lib/utils';
import { addFinancialDataCategory } from '@/services/apis/companies';
import { categorySchema } from '@/utils/validations';
import { fieldOptions } from '@/utils/validations';

type Add_new_categoryProps = {
  ButtonText?: string;
  Icon?: React.ReactNode;
  ButtonStyle?: string;
};

const Add_new_category = ({ ButtonText, Icon, ButtonStyle }: Add_new_categoryProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    // Set loading to true before starting the async operation
    setLoading(true);

    try {
      // Attempt to add the financial data category
      const res = await addFinancialDataCategory(data);

      if (res.status === 201) {
        dispatch(fetchCategories());

        // Display a success message
        toast.success('Financial data category added successfully', {
          style: {
            background: 'green',
            color: 'white',
            border: 'none',
          },
          position: 'top-center',
          duration: 5000,
        });
      } else {
        if (res.error) {
          let errorMessage = '';

          if (res.error.category_name) {
            errorMessage = `${Object.keys(res.error)}: ${Object.values(res.error.category_name)}`;
          } else {
            errorMessage = res.error;
          }

          throw new Error(errorMessage);
        }
      }
    } catch (error: any) {
      // Extract the error message
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';

      // Log any errors that occur
      toast.error(errorMessage, {
        style: { background: 'red', color: 'white', border: 'none' },
        position: 'top-center',
        duration: 5000,
      });
    } finally {
      // Set loading to false after the async operation finishes
      setLoading(false);
    }
  };

  return (
    <ModalTemplate
      ButtonText={ButtonText}
      FormTitle="Add a New Category"
      onSubmit={handleSubmit}
      Icon={Icon}
      ButtonStyle={
        ButtonStyle ||
        'bg-[#E6EEEA] text-[#39463E] p-2 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]'
      }
      loading={loading}
      formSchema={categorySchema}
      defaultValues={{ category_name: '', category_description: '' }}
    >
      <div className="space-y-3">
        <CustomModalField name="category_name" placeholder="Enter Category Name" />

        <CustomModalField
          name="category_description"
          placeholder="Enter Category Description"
          fieldType={fieldOptions.TEXTAREA}
        />
      </div>
    </ModalTemplate>
  );
};

export default Add_new_category;
