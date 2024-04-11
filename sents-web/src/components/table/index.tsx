import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

interface TableProps {
  headers: string[];
  rows: { [key: string]: any }[];
  onRowClick?: (row: { [key: string]: any }) => void;
  renderCell?: (row: { [key: string]: any }, column: string) => JSX.Element;
}

const TableComponent: React.FC<TableProps> = ({
  headers,
  rows,
  onRowClick,
  renderCell,
}) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden">
            <div className="bg-white dark:text-[#FFFFFF] dark:bg-[#39463E80] p-6 rounded-2xl">
              <div className="flex text-left text-sm leading-4 font-medium capitalize tracking-wider">
                {headers.map((header, index) => (
                  <div key={index} className="px-6 py-3 font-semibold w-1/2">
                    {header}
                  </div>
                ))}
                {/* Empty div for the arrow icon alignment */}
                <div className="w-8"></div>
              </div>
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex items-center bg-gray-50 dark:bg-[#39463E] rounded-2xl mt-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {headers.map((header, cellIndex) => (
                    <div
                      key={cellIndex}
                      className="px-6 py-4 whitespace-normal text-sm min-w-52 w-1/2 overflow-auto"
                    >
                      {renderCell ? renderCell(row, header) : row[header]}
                    </div>
                  ))}
                  <div className="w-8 h-8 relative top-1 right-2 text-gray-400">
                    <RiArrowRightSLine size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
