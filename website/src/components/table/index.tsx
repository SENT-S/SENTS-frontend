/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface TableComponentProps {
  data: any[];
  columns?: string[];
  showSearch?: boolean;
  customRender?: {
    [key: string]: (
      row: any,
      column: string,
      rowIndex: number,
      columnIndex: number,
    ) => JSX.Element;
  };
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  columns,
  showSearch = false,
  customRender,
}) => {
  const [itemsToShow, setItemsToShow] = useState(10);
  const [search, setSearch] = useState('');
  const headers = columns || Object.keys(data[0]);

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      (value as string).toString().toLowerCase().includes(search.toLowerCase()),
    ),
  );

  return (
    <div className="flex flex-col space-y-4 w-full">
      {showSearch && (
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="p-2 border text-gray-500 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      <div className="flex bg-white rounded-2xl p-3 overflow-x-auto">
        {headers.map((header, index) => (
          <div key={index} className="flex-1 p-2 font-semibold">
            {header}
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-3 overflow-x-auto">
        {filteredData.length > 0 ? (
          filteredData.slice(0, itemsToShow).map((row, rowIndex) => (
            <div key={rowIndex} className="flex md:flex-row hover:bg-gray-100">
              {headers.map((value, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`flex-1 py-3 px-2 ${
                    rowIndex < Math.min(itemsToShow, filteredData.length) - 1 &&
                    'border-b border-gray-300'
                  } `}
                >
                  {customRender && customRender[value]
                    ? customRender[value](row, value, rowIndex, cellIndex)
                    : row[value]}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <h2>No results found</h2>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end mt-4">
        <label htmlFor="itemsToShow" className="mr-2 text-sm font-medium">
          Show items:
        </label>
        <select
          id="itemsToShow"
          value={itemsToShow}
          onChange={e => setItemsToShow(Number(e.target.value))}
          className="bg-white cursor-pointer w-auto py-2 pl-3 pr-4 mt-1 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
        </select>
      </div>
    </div>
  );
};

export default TableComponent;
