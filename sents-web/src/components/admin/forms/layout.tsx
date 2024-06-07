'use client';
import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useOutsideClick from '@/utils/useOutsideClick';

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
}

const layout = (props: Props) => {
  const ref = useRef(null);
  useOutsideClick(ref, () => {
    if (props.onCancel) {
      props.onCancel();
    }
  });

  return (
    <Dialog>
      <DialogTrigger
        className={`${props.ButtonStyle ? props.ButtonStyle : 'bg-[#39463E] text-white dark:bg-[#39463E] dark:text-white hover:bg-[#39463ed9] hover:text-white hover:dark:bg-[#39463ed9] hover:dark:text-white'} p-2 md:p-4 rounded-2xl flex items-center`}
      >
        {props.ButtonText}
        {props.Icon}
      </DialogTrigger>
      <DialogContent
        ref={ref}
        className="bg-white space-y-3 max-w-md p-12 dark:bg-[#1E1E1E] dark:text-white"
      >
        <DialogTitle className="text-center text-[#39463E]">
          {props.FormTitle}
        </DialogTitle>
        <div>
          <form onSubmit={props.onSubmit}>
            {props.children}
            <footer className="w-full mt-4 space-y-3">
              <button
                className={`${props.SubmitButtonStyle ? props.SubmitButtonStyle : 'bg-[#148C59]'} text-white w-full p-3 rounded-2xl flex justify-center items-center`}
                type="submit"
              >
                {props.loading ? 'Loading...' : props.SubmitText || 'Submit'}
              </button>
              {props.CancelText && (
                <button
                  className={`${props.CancelButtonStyle ? props.CancelButtonStyle : 'bg-[#F5ECEC] text-[#EA0000]'} w-full p-3 rounded-2xl flex justify-center items-center`}
                  type="button"
                  onClick={props.onCancel}
                >
                  {props.CancelText || 'Cancel'}
                </button>
              )}
            </footer>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default layout;
