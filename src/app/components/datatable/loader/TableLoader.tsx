import React from 'react';

interface TableLoaderProps {
  columnCount: number;
}

const TableLoader: React.FC<TableLoaderProps> = ({ columnCount }) => {
  return (
    <div className="pt-2">
      {/* Desktop View */}
      <div className="hidden md:block">
        {Array.from({ length: 3 }).map((_, rowIdx) => (
          <div key={rowIdx} className="py-2 border-b border-gray-200 flex">
            {Array.from({ length: columnCount }).map((_, colIdx) => (
              <div key={colIdx} className="w-1/4 pr-2 pb-4 flex-1">
                <span className="block h-3 bg-gray-300 rounded w-full animate-pulse"></span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="py-2 border-b border-gray-200">
            <span className="block h-3 bg-gray-300 rounded w-full animate-pulse"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLoader;
