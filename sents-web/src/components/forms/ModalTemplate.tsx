'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ScaleLoader } from 'react-spinners';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import useOutsideClick from '@/hooks/useOutsideClick';

interface Props {
  ButtonText?: string;
  CancelText?: string;
  SubmitText?: string;
  SubmitButtonStyle?: string;
  CancelButtonStyle?: string;
  ButtonStyle?: string;
  FormTitle: string;
  Icon?: React.ReactNode;
  onCancel?: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  openDialog?: boolean;
  // eslint-disable-next-line no-unused-vars
  setDialog?: (value: boolean) => void;
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
  formSchema?: z.ZodSchema<any> | any;
  defaultValues?: any;
}

const ModalTemplate = (props: Props) => {
  const ref = useRef(null);
  useOutsideClick(ref, () => {
    if (props.onCancel) {
      props.onCancel();
    }
  });

  const form = useForm({
    resolver: zodResolver(props.formSchema),
    defaultValues: props.defaultValues,
  });

  async function onSubmit(values: React.FormEvent<HTMLFormElement>) {
    props.onSubmit(values);
    form.reset();
  }

  return (
    <Dialog open={props.openDialog} onOpenChange={(open) => props.setDialog?.(open)}>
      <DialogTrigger
        disabled={props.disabled}
        onClick={() => props.setDialog?.(true)}
        className={`${props.ButtonStyle || 'bg-[#39463E] text-white dark:bg-[#39463E] dark:text-white hover:bg-[#39463ed9] hover:text-white hover:dark:bg-[#39463ed9] hover:dark:text-white'} p-2 md:p-4 rounded-2xl flex items-center`}
      >
        {props.ButtonText}
        {props.Icon}
      </DialogTrigger>
      <DialogContent
        ref={ref}
        className="bg-white space-y-3 max-w-md p-12 dark:bg-[#1E1E1E] dark:text-white"
      >
        <DialogTitle className="text-center text-[#39463E] dark:text-gray-300">
          {props.FormTitle}
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            encType={props.formProps?.encType || 'application/x-www-form-urlencoded'}
            {...props.formProps}
          >
            {props.children}
            <footer className="w-full mt-4 space-y-3">
              <Button
                type="submit"
                className={`${props.SubmitButtonStyle || 'bg-[#148C59] hover:bg-[#148c5ad7]'} text-white w-full p-3 rounded-2xl flex justify-center items-center`}
                disabled={props.loading}
              >
                {props.loading ? (
                  <ScaleLoader height={20} color="#fff" />
                ) : (
                  props.SubmitText || 'Submit'
                )}
              </Button>
              {props.CancelText && (
                <Button
                  className={`${props.CancelButtonStyle || 'bg-[#F5ECEC] hover:bg-[#f5ececd8] text-[#EA0000]'} w-full p-3 rounded-2xl flex justify-center items-center`}
                  type="button"
                  onClick={props.onCancel}
                >
                  {props.CancelText || 'Cancel'}
                </Button>
              )}
            </footer>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTemplate;
