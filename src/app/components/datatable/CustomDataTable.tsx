import { useState, useMemo, ReactNode } from 'react';
import InputField from '@/app/components/input/InputField';
import TableLoader from '@/app/components/datatable/loader/TableLoader';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column[];
  loading?: boolean;
  actions?: (row: T) => ReactNode;
}

const CustomDataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  actions,
}: DataTableProps<T>) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.some((column) =>
        String(row[column.key]).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search, columns]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const isPaginationDisabled = filteredData.length === 0;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <InputField
        type="text"
        placeHolder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        {loading  && paginatedData.length > 0 ? (
          <TableLoader columnCount={columns.length + (actions ? 1 : 0)} />
        ) : (
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-transparent text-gray">
                {columns.map((column) => (
                  <th key={column.key} className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column.label}
                  </th>
                ))}
                {actions && <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition-colors">
                    {columns.map((column) => (
                      <td key={column.key} className="p-4 border-b border-gray-200">
                        {row[column.key] !== undefined && row[column.key] !== null
                          ? String(row[column.key])
                          : "N/A"}
                      </td>
                    ))}
                    {actions && (
                      <td className="p-4 border-b border-gray-200">
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0)} className="p-4 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {!loading && (
        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-700">
            Showing {(currentPage - 1) * rowsPerPage + 1} -{" "}
            {Math.min(currentPage * rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length} results
          </span>

          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || isPaginationDisabled}
              className="px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 text-sm"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1 || isPaginationDisabled}
              className="px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 text-sm"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || isPaginationDisabled}
              className="px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 text-sm"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || isPaginationDisabled}
              className="px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 text-sm"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDataTable;
