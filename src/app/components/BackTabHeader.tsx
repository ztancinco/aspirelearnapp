import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface BackTabHeaderProps {
  title: string;
  onBack: () => void;
}

const BackTabHeader: React.FC<BackTabHeaderProps> = ({ title, onBack }) => {
  return (
    <div className="flex items-center p-4">
      <button
        onClick={onBack}
        className="flex items-center text-teal-700 hover:text-teal-900 transition"
      >
        <ArrowLeftIcon className="h-6 w-6 mr-2" />
      </button>
      <h2 className="text-2xl font-semibold text-teal-800">{title}</h2>
    </div>
  );
};

export default BackTabHeader;
