import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import FormModal from './modal';
import { Textarea } from '@/components/ui/textarea';
import { addFinancialMetric } from '@/services/apis/companies';

const Add_new_metric = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Set loading to true before starting the async operation
    setLoading(true);

    try {
      // Attempt to add the financial metric
      const res = await addFinancialMetric(data);
      console.log(res);

      // If successful, clear the form
      e.target.reset();
    } catch (error) {
      // Log any errors that occur
      console.error('Failed to add financial metric:', error);
    } finally {
      // Set loading to false after the async operation finishes
      setLoading(false);
    }
  };
  return (
    <FormModal
      ButtonText="Add Metric"
      FormTitle="Add a New Metric"
      onSubmit={handleSubmit}
      ButtonStyle="bg-[#E6EEEA] text-[#39463E] p-2 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
      loading={loading}
    >
      <div className="space-y-3">
        <Input
          type="text"
          name="metric_name"
          placeholder="Enter Metric Name"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
        <Textarea
          name="metric_description"
          placeholder="Enter Metric Description"
          className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] max-h-[150px] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
        />
      </div>
    </FormModal>
  );
};

export default Add_new_metric;
