'use client';
import React from 'react';
import { PuffLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <PuffLoader color="#098412" size={75} />
    </div>
  );
};

export default Loading;
