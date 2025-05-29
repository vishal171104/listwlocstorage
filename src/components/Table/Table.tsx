import React from 'react';

type TableSize = 'sm' | 'md' | 'lg';
type TableData = (string | number | React.ReactNode)[][];

interface TableProps {
  headers?: string[];
  data?: TableData;
  className?: string;
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  size?: TableSize;
}

export const Table: React.FC<TableProps> = ({ 
  headers = [], 
  data = [], 
  className = "",
  striped = true,
  hover = true,
  bordered = true,
  size = "md"
}) => {
  const sizeClasses: Record<TableSize, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const cellPadding: Record<TableSize, string> = {
    sm: "px-3 py-2",
    md: "px-6 py-4",
    lg: "px-8 py-6"
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className={`min-w-full bg-white ${bordered ? 'border border-gray-200' : ''} rounded-lg ${sizeClasses[size]}`}>
        {headers.length > 0 && (
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header: string, index: number) => (
                <th 
                  key={index}
                  className={`${cellPadding[size]} text-left font-medium text-gray-500 uppercase tracking-wider ${bordered ? 'border-b border-gray-200' : ''}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className={bordered ? "divide-y divide-gray-200" : ""}>
          {data.map((row, rowIndex: number) => (
            <tr 
              key={rowIndex}
              className={`
                ${striped && rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                ${hover ? "hover:bg-gray-100 transition-colors duration-150" : ""}
              `}
            >
              {row.map((cell, cellIndex: number) => (
                <td 
                  key={cellIndex}
                  className={`${cellPadding[size]} whitespace-nowrap text-gray-900`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
};
export default Table;
