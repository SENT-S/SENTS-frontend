import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

interface TableProps {
  data: { [key: string]: string }[] | null;
  isLoading?: boolean;
}

const Table: React.FC<TableProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <PulseLoader color="#2563EB" loading={true} size={15} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-60 text-xl text-gray-500">
        No data
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full min-w-max">
        <thead>
          <tr className="bg-[#b5c6e6]">
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? 'bg-gray-200' : ''}
            >
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} className="border px-4 py-2">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
