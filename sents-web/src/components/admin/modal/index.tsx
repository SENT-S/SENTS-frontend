'use client';
import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useOutsideClick from '@/utils/useOutsideClick';
import { ScaleLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';

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
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const Index = (props: Props) => {
  const ref = useRef(null);
  useOutsideClick(ref, () => {
    if (props.onCancel) {
      props.onCancel();
    }
  });

  return (
    <Dialog>
      <DialogTrigger
        disabled={props.disabled}
        className={`${props.ButtonStyle ? props.ButtonStyle : 'bg-[#39463E] text-white dark:bg-[#39463E] dark:text-white hover:bg-[#39463ed9] hover:text-white hover:dark:bg-[#39463ed9] hover:dark:text-white'} p-2 md:p-4 rounded-2xl flex items-center`}
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
        <div>
          <form onSubmit={props.onSubmit}>
            {props.children}
            <footer className="w-full mt-4 space-y-3">
              <Button
                type="submit"
                className={`${props.SubmitButtonStyle ? props.SubmitButtonStyle : 'bg-[#148C59] hover:bg-[#148c5ad7]'} text-white w-full p-3 rounded-2xl flex justify-center items-center`}
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
                  className={`${props.CancelButtonStyle ? props.CancelButtonStyle : 'bg-[#F5ECEC] hover:bg-[#f5ececd8] text-[#EA0000]'} w-full p-3 rounded-2xl flex justify-center items-center`}
                  type="button"
                  onClick={props.onCancel}
                >
                  {props.CancelText || 'Cancel'}
                </Button>
              )}
            </footer>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
