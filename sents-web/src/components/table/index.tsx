/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { RiArrowRightSLine, RiDeleteBinLine } from 'react-icons/ri';
import { Input } from '@/components/ui/input';
import ModalForms from '@/components/admin/modal';
import { RxPlus } from 'react-icons/rx';
import { FiEdit } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { MdDone } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/utils/types';
import { useRouter } from 'next/navigation';

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
}

const TableComponent: React.FC<TableProps> = ({
  columns,
  rows,
  onRowClick,
  renderCell,
}) => {
  const router = useRouter();
  const { data: session } = useSession() as {
    data: CustomSession;
  };
  const [rowData, setRowData] = useState<{ [key: string]: any }>({});
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const isAdmin = session?.user?.role === 'ADMIN';

  const handleDelete = (row: { [key: string]: any }) => {
    setShowModal(false);
  };

  const handleCancelDeleteCompany = () => {
    setShowModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    column: TableColumn
  ) => {
    setRowData({ ...rowData, [column.field]: e.target.value });
  };

  const handleEditCompany = () => {};

  return (
    <div className="space-y-8">
      {/* Admin features */}
      {isAdmin && (
        <div className="flex justify-between items-center">
          <Button
            className="bg-[#39463E] flex items-center text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#39463ed9] hover:text-white"
            onClick={() => router.push(`/new_company`)}
          >
            Add New Company <RxPlus className="ml-3" size={18} />
          </Button>
          {showEdit ? (
            <div className="flex flex-wrap gap-2">
              <Button
                className="bg-[#148C59] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#148C59ed9] hover:text-white"
                onClick={handleEditCompany}
              >
                Done <MdDone className="ml-3" size={20} />
              </Button>
              <Button
                type="button"
                className="bg-[#EA0000] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#EA0000ed9] hover:text-white"
                onClick={() => {
                  setShowEdit(false);
                }}
              >
                Cancel <MdCancel className="ml-3" size={20} />
              </Button>
            </div>
          ) : (
            <Button
              className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
              onClick={() => setShowEdit(!showEdit)}
            >
              Edit Company <FiEdit className="ml-3" size={18} />
            </Button>
          )}
        </div>
      )}
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
                      onClick={() =>
                        isAdmin
                          ? showEdit
                            ? null
                            : router.push(`/edit_company/${row.id}`)
                          : router.push(`/company/${row.id}`)
                      }
                    >
                      {columns.map((column: TableColumn, cellIndex: number) => (
                        <div
                          key={cellIndex}
                          className={`px-6 py-4 whitespace-normal text-sm overflow-auto ${column.width || 'w-1/2'}`}
                        >
                          {showEdit ? (
                            <Input
                              value={row[column.field]}
                              className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#b7dac4] rounded-xl"
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
                                onClick={() => setShowModal(true)}
                              />
                            </div>
                          }
                          onSubmit={() => handleDelete(row)}
                          onCancel={handleCancelDeleteCompany}
                          SubmitText="Yes"
                          CancelText="No"
                          openDialog={showModal}
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
    </div>
  );
};

export default TableComponent;
