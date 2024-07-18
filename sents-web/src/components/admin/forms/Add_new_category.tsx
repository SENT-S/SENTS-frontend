import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import FormModal from '../modal';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { addFinancialDataCategory } from '@/services/apis/companies';
import { fetchCategories } from '@/lib/ReduxSlices/metric_category';
import { useDispatch } from '@/lib/utils';

type Add_new_categoryProps = {
  ButtonText?: string;
  Icon?: React.ReactNode;
  ButtonStyle?: string;
};

const Add_new_category = ({
  ButtonText,
  Icon,
  ButtonStyle,
}: Add_new_categoryProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Set loading to true before starting the async operation
    setLoading(true);

    try {
      // Attempt to add the financial data category
      const res = await addFinancialDataCategory(data);

      if (res.status === 201) {
        // If successful, clear the form
        e.target.reset();

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
      // Log any errors that occur
      toast.error(error, {
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
    <FormModal
      ButtonText={ButtonText}
      FormTitle="Add a New Category"
      onSubmit={handleSubmit}
      Icon={Icon}
      ButtonStyle={
        ButtonStyle ||
        'bg-[#E6EEEA] text-[#39463E] p-2 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]'
      }
      loading={loading}
    >
      <div className="space-y-3">
        <Input
          type="text"
          name="category_name"
          placeholder="Enter Category Name"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <Textarea
          name="category_description"
          placeholder="Enter Category Description"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] max-h-[150px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
      </div>
    </FormModal>
  );
};

export default Add_new_category;
