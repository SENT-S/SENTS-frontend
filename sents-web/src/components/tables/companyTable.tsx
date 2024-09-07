'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDone, MdCancel } from 'react-icons/md';
import { RiArrowRightSLine, RiDeleteBinLine } from 'react-icons/ri';
import { RxPlus } from 'react-icons/rx';
import { toast } from 'sonner';

import ModalTemplate from '@/components/forms/ModalTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { startRefresh } from '@/lib/ReduxSlices/refreshSlice';
import { useDispatch } from '@/lib/utils';
import { updateCompanyDetails, deleteCompany } from '@/utils/apiClient';

interface TableColumn {
  field: string;
  label: string;
  width?: string;
}

interface TableProps {
  isAdmin?: boolean;
  columns: TableColumn[];
  rows: { [key: string]: any }[];
  onRowClick?: (row: { [key: string]: any }) => void;
  renderCell?: (row: { [key: string]: any }, column: TableColumn) => JSX.Element;
  isTableLoading?: boolean;
}

const CompanyTable: React.FC<TableProps> = ({
  columns,
  rows,
  onRowClick,
  renderCell,
  isAdmin,
  isTableLoading = false,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [editableRows, setEditableRows] = useState<{ [key: string]: any }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [rowIdToDelete, setRowIdToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditableRows(rows);
  }, [rows]);

  const handleDelete = useCallback(async () => {
    if (!rowIdToDelete) return;

    try {
      setLoading(true);
      const response = await deleteCompany(rowIdToDelete);

      if (response.status === 200 || response.status === 204) {
        setEditableRows((prevRows) => prevRows.filter((r) => r.id !== rowIdToDelete));
        toast.success('Company deleted successfully', { position: 'top-center' });
        dispatch(startRefresh());
      } else {
        throw new Error('Failed to delete company');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete company', { position: 'top-center' });
    } finally {
      setShowModal(false);
      setShowEdit(false);
      setRowIdToDelete(null);
      setLoading(false);
    }
  }, [dispatch, rowIdToDelete]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, column: TableColumn) => {
      setEditableRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[rowIndex] = {
          ...updatedRows[rowIndex],
          [column.field]: e.target.value,
          isEdited: true,
        };
        return updatedRows;
      });
    },
    [],
  );

  const handleEditCompany = useCallback(async () => {
    try {
      setLoading(true);
      const editedRows = editableRows.filter((row) => row.isEdited);
      const updatedRows = editedRows.map((row) => ({
        company_id: row.id,
        company_name: row.company_name,
        stock_symbol: row.stock_symbol,
        sector_or_industry: row.sector_or_industry,
      }));

      if (updatedRows.length > 0) {
        const response = await updateCompanyDetails(updatedRows);

        if (response.status === 200) {
          toast.success('Company details updated successfully', { position: 'top-center' });
          dispatch(startRefresh());
        } else {
          throw new Error('Failed to update company details');
        }
      }

      toast.info('No changes detected', { position: 'top-center' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update company details', { position: 'top-center' });
    } finally {
      setLoading(false);
      setShowEdit(false);
    }
  }, [dispatch, editableRows]);

  const memoizedColumns = useMemo(() => columns, [columns]);

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
                className="bg-[#148C59] text-white p-2 md:p-7 rounded-2xl hover:bg-[#148C59ed9] hover:text-white"
                onClick={handleEditCompany}
                disabled={loading}
              >
                {loading ? (
                  'Updating...'
                ) : (
                  <>
                    Done <MdDone className="ml-3" size={20} />
                  </>
                )}
              </Button>
              <Button
                type="button"
                className="bg-[#EA0000] text-white p-2 md:p-7 rounded-2xl hover:bg-[#EA0000ed9] hover:text-white"
                onClick={() => {
                  setShowEdit(false);
                  setEditableRows(rows);
                }}
                disabled={loading}
              >
                Cancel <MdCancel className="ml-3" size={20} />
              </Button>
            </div>
          ) : (
            <Button
              className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl hover:bg-[#e4f2eb] hover:text-[39463E]"
              onClick={() => setShowEdit(!showEdit)}
            >
              Edit Company <FiEdit className="ml-3" size={18} />
            </Button>
          )}
        </div>
      )}
      <div className="flex flex-col relative">
        {isTableLoading && (
          <div className="absolute inset-0 bg-white dark:bg-opacity-30 bg-opacity-50 cursor-not-allowed flex items-center justify-center z-10">
            <div className="loader"></div>
          </div>
        )}
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="overflow-hidden">
              <div className="bg-white dark:text-[#FFFFFF] dark:bg-[#39463E80] p-6 rounded-2xl">
                <div className="flex text-left text-sm leading-4 font-medium capitalize tracking-wider">
                  {memoizedColumns.map((column, index) => (
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
                      role="button"
                      tabIndex={0}
                      className="flex items-center bg-gray-50 dark:bg-[#39463E] rounded-2xl mt-4 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        if (isAdmin && !showEdit) {
                          router.push(`/edit_company/${row.id}`);
                        } else if (!isAdmin) {
                          router.push(`/company/${row.id}`);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          if (isAdmin && !showEdit) {
                            router.push(`/edit_company/${row.id}`);
                          } else if (!isAdmin) {
                            router.push(`/company/${row.id}`);
                          }
                        }
                      }}
                    >
                      {memoizedColumns.map((column: TableColumn, cellIndex: number) => (
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
                        <ModalTemplate
                          FormTitle="Are you sure you want to delete Company?"
                          ButtonStyle="p-0 m-0 block relative top-1 right-2 text-[#F96868]"
                          disabled={loading}
                          Icon={
                            <RiDeleteBinLine
                              size={20}
                              onClick={(e) => {
                                e.stopPropagation();
                                setRowIdToDelete(row.id);
                                setShowModal(true);
                              }}
                            />
                          }
                          onSubmit={handleDelete}
                          onCancel={() => {
                            setShowModal(false);
                            setRowIdToDelete(null);
                          }}
                          SubmitText="Yes"
                          CancelText="No"
                          openDialog={showModal}
                          SubmitButtonStyle="bg-[#EA0000] text-white p-2 rounded-2xl hover:bg-[#EA0000ed9] hover:text-white"
                        />
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
    </div>
  );
};

export default CompanyTable;
