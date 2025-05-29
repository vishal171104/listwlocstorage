import React from "react";

interface SpinnerProps {
  isLoading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="w-16 h-16 border-8 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
  );
};

export default Spinner;
