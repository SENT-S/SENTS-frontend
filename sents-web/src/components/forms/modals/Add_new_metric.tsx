import React, { useState } from 'react';
import { toast } from 'sonner';

import CustomModalField from '../../ui/customModalField';
import ModalTemplate from '../ModalTemplate';

import { fetchMetrics } from '@/lib/ReduxSlices/metric_category';
import { useDispatch } from '@/lib/utils';
import { addFinancialMetric } from '@/utils/apiClient';
import { fieldOptions } from '@/utils/validations';
import { metricSchema } from '@/utils/validations';

const Add_new_metric = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (data: any) => {
    // Set loading to true before starting the async operation
    setLoading(true);

    try {
      // Attempt to add the financial metric
      const res = await addFinancialMetric(data);

      if (res.status === 201) {
        dispatch(fetchMetrics());

        // Display a success message
        toast.success('Financial data metric added successfully', {
          position: 'top-center',
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
        position: 'top-center',
      });
    } finally {
      // Set loading to false after the async operation finishes
      setLoading(false);
    }
  };
  return (
    <ModalTemplate
      ButtonText="Add Metric"
      FormTitle="Add a New Metric"
      onSubmit={handleSubmit}
      ButtonStyle="bg-[#E6EEEA] text-[#39463E] p-2 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
      loading={loading}
      formSchema={metricSchema}
      defaultValues={{ metric_name: '', metric_description: '' }}
    >
      <div className="space-y-3">
        <CustomModalField name="metric_name" placeholder="Enter Metric Name" />
        <CustomModalField
          name="metric_description"
          placeholder="Enter Metric Description"
          fieldType={fieldOptions.TEXTAREA}
        />
      </div>
    </ModalTemplate>
  );
};

export default Add_new_metric;
