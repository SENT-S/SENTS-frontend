import { RiArrowRightSLine } from 'react-icons/ri';

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
    column: TableColumn,
  ) => JSX.Element;
}

const TableComponent: React.FC<TableProps> = ({
  columns,
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
                {columns.map((column, index) => (
                  <div
                    key={index}
                    className={`px-6 py-3 font-semibold ${column.width || 'w-1/2'}`}
                  >
                    {column.label}
                  </div>
                ))}
                <div className="hidden md:block w-8"></div>
              </div>
              {rows.length > 0 ? (
                rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex items-center bg-gray-50 dark:bg-[#39463E] rounded-2xl mt-4 cursor-pointer hover:bg-gray-100"
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {columns.map((column, cellIndex) => (
                      <div
                        key={cellIndex}
                        className={`px-6 py-4 whitespace-normal text-sm overflow-auto ${column.width || 'w-1/2'}`}
                      >
                        {renderCell
                          ? renderCell(row, column)
                          : row[column.field]}
                      </div>
                    ))}
                    <div className="w-8 h-8 hidden md:block relative top-1 right-2 text-gray-400">
                      <RiArrowRightSLine size={20} />
                    </div>
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
