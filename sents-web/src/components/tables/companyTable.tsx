'use client';
import Link from 'next/link';
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
  const dispatch = useDispatch();
  const [editableRows, setEditableRows] = useState<{ [key: string]: any }[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [rowIdToDelete, setRowIdToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setEditableRows(rows);
  }, [rows]);

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
    setLoading(true);
    try {
      const editedRows = editableRows.filter((row) => row.isEdited);
      if (editedRows.length === 0) {
        toast.info('No changes detected');
        setShowEdit(false);
        return;
      }

      const updatedRows = editedRows.map((row) => ({
        company_id: row.id,
        company_name: row.company_name,
        stock_symbol: row.stock_symbol,
        sector_or_industry: row.sector_or_industry,
      }));

      const response = await updateCompanyDetails(updatedRows);
      if (response.status === 200) {
        toast.success('Company details updated successfully');
        dispatch(startRefresh());
      } else {
        throw new Error('Failed to update company details');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update company details');
    } finally {
      setLoading(false);
      setShowEdit(false);
    }
  }, [dispatch, editableRows]);

  const handleDelete = useCallback(async () => {
    if (!rowIdToDelete) return;
    setIsDeleting(true);
    try {
      const response = await deleteCompany(rowIdToDelete);
      if (response.status === 200 || response.status === 204) {
        setEditableRows((prevRows) => prevRows.filter((r) => r.id !== rowIdToDelete));
        toast.success('Company deleted successfully');
        dispatch(startRefresh());
      } else {
        throw new Error('Failed to delete company');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete company');
    } finally {
      setIsDeleting(false);
      setShowModal(false);
      setRowIdToDelete(null);
    }
  }, [dispatch, rowIdToDelete]);

  const memoizedColumns = useMemo(() => columns, [columns]);

  const handleOpenModal = (id: string) => {
    setRowIdToDelete(id);
    setShowModal(true);
  };

  const handleCancelEdit = useCallback(() => {
    setShowEdit(false);
    setEditableRows(rows);
  }, [rows]);

  const TableRow = useMemo(
    () =>
      React.memo(function TableRow({ row, rowIndex }: { row: any; rowIndex: number }) {
        const linkHref = isAdmin && !showEdit ? `/edit_company/${row.id}` : `/company/${row.id}`;

        return (
          <div
            key={rowIndex}
            className="flex items-center bg-gray-50 dark:bg-[#39463E] rounded-2xl mt-4 cursor-pointer hover:bg-gray-100"
          >
            {!showEdit ? (
              <Link href={linkHref} className="flex flex-1 items-center">
                {memoizedColumns.map((column, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`px-6 py-4 whitespace-normal text-sm overflow-auto ${column.width || 'w-1/2'}`}
                  >
                    {renderCell ? renderCell(row, column) : row[column.field]}
                  </div>
                ))}
              </Link>
            ) : (
              memoizedColumns.map((column, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`px-6 py-4 whitespace-normal text-sm overflow-auto ${column.width || 'w-1/2'}`}
                >
                  <Input
                    value={row[column.field]}
                    className="w-full h-full p-2 border border-[#8D9D93] dark:border-[#b7dac4] rounded-xl"
                    onChange={(e) => handleInputChange(e, rowIndex, column)}
                  />
                </div>
              ))
            )}
            {showEdit && (
              <ModalTemplate
                FormTitle="Are you sure you want to delete Company?"
                ButtonStyle="p-0 m-0 block relative top-1 right-2 text-[#F96868]"
                disabled={isDeleting}
                loading={isDeleting}
                Icon={
                  <div className="p-1">
                    <RiDeleteBinLine size={20} />
                  </div>
                }
                onSubmit={handleDelete}
                onCancel={() => {
                  setShowModal(false);
                  setRowIdToDelete(null);
                }}
                SubmitText="Yes"
                CancelText="No"
                openDialog={showModal}
                setDialog={() => handleOpenModal(row.id)}
                SubmitButtonStyle="bg-[#EA0000] text-white p-2 rounded-2xl hover:bg-[#EA0000ed9] hover:text-white"
              />
            )}

            {!showEdit && (
              <RiArrowRightSLine
                size={20}
                className="w-8 h-8 hidden md:block relative top-1 right-2 text-gray-400"
              />
            )}
          </div>
        );
      }),
    [
      memoizedColumns,
      renderCell,
      handleInputChange,
      showEdit,
      isAdmin,
      showModal,
      isDeleting,
      handleDelete,
    ],
  );

  return (
    <div className="space-y-8">
      {isAdmin && (
        <EditControls
          showEdit={showEdit}
          loading={loading}
          handleEditCompany={handleEditCompany}
          handleCancelEdit={handleCancelEdit}
          setShowEdit={setShowEdit}
        />
      )}
      <div className="flex flex-col relative">
        {isTableLoading && (
          <div className="absolute inset-0 bg-white dark:bg-opacity-30 bg-opacity-50 cursor-not-allowed flex items-center justify-center z-10">
            <div className="loader"></div>
          </div>
        )}
        <div className="overflow-x-auto">
          <div className="align-middle inline-block w-full max-w-full min-w-[660px]">
            <div className="overflow-hidden shadow-sm">
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
                    <TableRow key={rowIndex} row={row} rowIndex={rowIndex} />
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

// Extracted Edit Controls Component
const EditControls = React.memo(
  ({ showEdit, loading, handleEditCompany, handleCancelEdit, setShowEdit }: any) => (
    <div className="flex justify-between items-center">
      <Button
        className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl hover:bg-[#e4f2eb] hover:text-[39463E]"
        onClick={() => setShowEdit(!showEdit)}
      >
        {showEdit ? 'Done Editing' : 'Edit Company'}
        <FiEdit className="ml-3" size={18} />
      </Button>
      {!showEdit && (
        <Link
          className="bg-[#39463E] m-0 flex items-center text-white p-2 md:p-4 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#39463ed9] hover:text-white"
          href={'/new_company'}
        >
          Add New Company <RxPlus className="ml-3" size={18} />
        </Link>
      )}
      {showEdit && (
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
            onClick={handleCancelEdit}
            disabled={loading}
          >
            Cancel <MdCancel className="ml-3" size={20} />
          </Button>
        </div>
      )}
    </div>
  ),
);

EditControls.displayName = 'EditControls';

export default CompanyTable;
