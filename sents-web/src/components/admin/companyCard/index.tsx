import React from 'react';

const Index = ({
  title,
  symbol,
  description,
}: {
  title: string;
  symbol: string;
  description: string;
}) => {
  return (
    <div className="px-6 py-2 text-left border border-[#39463E] bg-[#E6EEEA] rounded-lg space-y-1">
      <h3>{title}</h3>
      <h5>{symbol}</h5>
      <p>{description}</p>
    </div>
  );
};

export default Index;
