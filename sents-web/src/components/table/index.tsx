/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { RiArrowRightSLine, RiDeleteBinLine } from 'react-icons/ri';
import { Input } from '@/components/ui/input';
import ModalForms from '@/components/admin/modal';

interface TableColumn {
  field: string;
  label: string;
  width?: string;
}

interface TableProps {
  columns: TableColumn[];
  rows: { [key: string]: any }[];
  onRowClick?: (row: { [key: string]: any }) => void;
  renderCell?: (
    row: { [key: string]: any },
    column: TableColumn
  ) => JSX.Element;
  showEdit?: boolean;
}

const TableComponent: React.FC<TableProps> = ({
  columns,
  rows,
  onRowClick,
  renderCell,
  showEdit,
}) => {
  const [rowData, setRowData] = useState<{ [key: string]: any }>({});

  const handleEdit = (row: { [key: string]: any }) => {
    setRowData(row);
  };

  const handleCancelDeleteCompany = () => {
    console.log('Cancel delete company');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    column: TableColumn
  ) => {
    setRowData({ ...rowData, [column.field]: e.target.value });
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden">
            <div className="bg-white dark:text-[#FFFFFF] dark:bg-[#39463E80] p-6 rounded-2xl">
              <div className="flex text-left text-sm leading-4 font-medium capitalize tracking-wider">
                {columns.map((column, index) => (
                  <div
                    key={index}
                    className={`px-6 py-3 font-semibold ${column.width || 'w-1/2'}`}
                  >
                    {column.label}
                  </div>
                ))}
                {showEdit && <div className="w-8"></div>}
              </div>
              {rows.length > 0 ? (
                rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex items-center bg-gray-50 dark:bg-[#39463E] rounded-2xl mt-4 cursor-pointer hover:bg-gray-100"
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {columns.map((column: TableColumn, cellIndex: number) => (
                      <div
                        key={cellIndex}
                        className={`px-6 py-4 whitespace-normal text-sm overflow-auto ${column.width || 'w-1/2'}`}
                      >
                        {showEdit ? (
                          <Input
                            value={row[column.field]}
                            className="bg-white"
                            onChange={(e) => handleInputChange(e, column)}
                          />
                        ) : renderCell ? (
                          renderCell(row, column)
                        ) : (
                          row[column.field]
                        )}
                      </div>
                    ))}

                    {showEdit ? (
                      <ModalForms
                        FormTitle="Are you sure you want to delete Company?"
                        ButtonStyle="p-0 m-0"
                        Icon={
                          <div className="w-8 h-8 hidden md:block relative top-1 right-2 text-[#F96868]">
                            <RiDeleteBinLine
                              size={20}
                              onClick={() => handleEdit(row)}
                            />
                          </div>
                        }
                        onSubmit={() => handleEdit(row)}
                        onCancel={handleCancelDeleteCompany}
                        SubmitText="Yes"
                        CancelText="No"
                        SubmitButtonStyle="bg-[#EA0000]"
                      />
                    ) : (
                      <div className="w-8 h-8 hidden md:block relative top-1 right-2 text-gray-400">
                        <RiArrowRightSLine size={20} />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center py-2">
                  No data available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
