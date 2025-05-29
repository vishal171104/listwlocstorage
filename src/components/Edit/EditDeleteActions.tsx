import React from 'react';

interface EditDeleteActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export const EditDeleteActions: React.FC<EditDeleteActionsProps> = ({ onEdit, onDelete, className }) => {
  return (
    <div className={`flex space-x-2 ${className ?? ''}`}>
      <button
        onClick={onEdit}
        aria-label="Edit"
        className="text-blue-600 hover:text-blue-800 focus:outline-none"
        title="Edit"
      >
        ✏️
      </button>
      <button
        onClick={onDelete}
        aria-label="Delete"
        className="text-red-600 hover:text-red-800 focus:outline-none"
        title="Delete"
      >
        🗑️
      </button>
    </div>
  );
};
