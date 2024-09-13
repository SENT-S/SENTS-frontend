import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

import { Button } from '@/components/ui/button';

type BackButtonProps = {
  onClick?: () => void;
  customClass?: string;
  btnType?: 'button';
};

const CustomBackButton = ({ onClick, customClass, btnType }: BackButtonProps) => {
  return (
    <Button
      type={btnType}
      variant="outline"
      size="icon"
      className={`ml-3 border-[#148C59] dark:border-[#148C59] ${customClass}`}
      onClick={onClick}
    >
      <IoArrowBack />
    </Button>
  );
};

export default CustomBackButton;
