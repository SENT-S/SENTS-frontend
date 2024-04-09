import React from 'react';
import { useRouter } from 'next/navigation';
import { RiArrowRightSLine } from 'react-icons/ri';

interface RelationsProps {
  data: any;
}

const mockdata = [
  { id: 1, name: 'Umeme Limited.', symbol: 'UMEME' },
  { id: 2, name: 'Jubilee Holding Limited', symbol: 'JHL' },
  { id: 3, name: 'DFCU Group', symbol: 'DFCU' },
  { id: 4, name: 'Alphabet Inc.', symbol: 'GOOGL' },
];

const Relations = ({ data }: RelationsProps) => {
  const router = useRouter();

  const handleStockClick = (id: number) => {
    router.push(`/company/${id}`);
  };

  return (
    <div className="space-y-4 rounded-2xl bg-white px-8 py-4">
      <h1 className="text-2xl font-semibold">Related Stocks</h1>
      <ul className="list-none divide-y divide-gray-200 space-y-3">
        {mockdata.map(stock => (
          <li
            key={stock.id}
            className="flex justify-between items-center py-2 cursor-pointer"
            onClick={() => handleStockClick(stock.id)}
          >
            <div>
              <p className="font-medium">{stock.name}</p>
              <p className="text-gray-500">{stock.symbol}</p>
            </div>
            <RiArrowRightSLine size={24} className="text-green-600" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Relations;
