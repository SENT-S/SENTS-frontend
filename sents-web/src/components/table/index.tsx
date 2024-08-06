/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { RiArrowRightSLine, RiDeleteBinLine } from 'react-icons/ri';
import { Input } from '@/components/ui/input';
import ModalForms from '@/components/admin/modal';
import { RxPlus } from 'react-icons/rx';
import { FiEdit } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { MdDone, MdCancel } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateCompanyDetails, deleteCompany } from '@/services/apis/companies';

interface TableColumn {
  field: string;
  label: string;
  width?: string;
}

interface TableProps {
  columns: TableColumn[];
  rows: { [key: string]: any }[];
  onRowClick?: (row: { [key: string]: any }) => void;
  renderCell?: (row: { [key: string]: any }, column: TableColumn) => JSX.Element;
}

const TableComponent: React.FC<TableProps> = ({ columns, rows, onRowClick, renderCell }) => {
  const router = useRouter();
  const { data: session } = useSession() as { data: CustomSession };
  const [editableRows, setEditableRows] = useState<{ [key: string]: any }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [rowIdToDelete, setRowIdToDelete] = useState<string | null>(null);
  const isAdmin = session?.user?.role === 'ADMIN';
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditableRows(rows);
  }, [rows]);

  const handleDelete = async () => {
    if (!rowIdToDelete) return;

    const updatedRows = editableRows.filter((r) => r.id !== rowIdToDelete);
    setEditableRows(updatedRows);
    setShowModal(false);
    setRowIdToDelete(null);

    try {
      setLoading(true);
      const response = await deleteCompany(rowIdToDelete);

      if (response.status === 200 || response.status === 204) {
        toast.success('Company deleted successfully', {
          style: { background: 'green', color: 'white', border: 'none' },
          duration: 5000,
          position: 'top-center',
        });
      } else {
        throw new Error('Failed to delete company');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete company', {
        style: { background: 'red', color: 'white', border: 'none' },
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDeleteCompany = () => {
    setShowModal(false);
    setRowIdToDelete(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    column: TableColumn,
  ) => {
    const updatedRows = [...editableRows];
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      [column.field]: e.target.value,
      isEdited: true,
    };
    setEditableRows(updatedRows);
  };

  const handleEditCompany = async () => {
    try {
      const editedRows = editableRows.filter((row) => row.isEdited);
      const updatedRows = editedRows.map((row) => ({
        company_id: row.id,
        company_name: row.company_name,
        stock_symbol: row.stock_symbol,
        sector_or_industry: row.sector_or_industry,
      }));

      setLoading(true);
      if (updatedRows.length > 0) {
        const response = await updateCompanyDetails(updatedRows);

        if (response.status === 200) {
          toast.success('Company details updated successfully', {
            style: { background: 'green', color: 'white', border: 'none' },
            duration: 5000,
            position: 'top-center',
          });
        } else {
          throw new Error('Failed to update company details');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update company details', {
        style: { background: 'red', color: 'white', border: 'none' },
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
      setShowEdit(false);
    }
  };

  return (
    <div className="space-y-8">
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
                {loading ? (
                  <>Updating...</>
                ) : (
                  <>
                    Done <MdDone className="ml-3" size={20} />
                  </>
                )}
              </Button>
              <Button
                type="button"
                className="bg-[#EA0000] text-white p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#EA0000ed9] hover:text-white"
                onClick={() => {
                  setShowEdit(false);
                  setEditableRows(rows);
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
                {editableRows.length > 0 ? (
                  editableRows.map((row, rowIndex) => (
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
                              onChange={(e) => handleInputChange(e, rowIndex, column)}
                            />
                          ) : renderCell ? (
                            renderCell(row, column)
                          ) : (
                            row[column.field]
                          )}
                        </div>
                      ))}

                      {showEdit && (
                        <div className="w-8 h-8 hidden md:block relative top-1 right-2 text-[#F96868]">
                          <RiDeleteBinLine
                            size={20}
                            onClick={(e) => {
                              e.stopPropagation();
                              setRowIdToDelete(row.id);
                              setShowModal(true);
                            }}
                          />
                        </div>
                      )}
                      {!showEdit && (
                        <div className="w-8 h-8 hidden md:block relative top-1 right-2 text-gray-400">
                          <RiArrowRightSLine size={20} />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center py-2">No data available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalForms
        FormTitle="Are you sure you want to delete Company?"
        ButtonStyle="p-0 m-0"
        disabled={loading}
        Icon={null}
        onSubmit={handleDelete}
        onCancel={handleCancelDeleteCompany}
        SubmitText="Yes"
        CancelText="No"
        openDialog={showModal}
        SubmitButtonStyle="bg-[#EA0000] text-white p-2 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#EA0000ed9] hover:text-white"
      />
    </div>
  );
};

export default TableComponent;
