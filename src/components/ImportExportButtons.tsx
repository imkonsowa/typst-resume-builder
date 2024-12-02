import React, { useRef } from 'react';
import { ResumeData } from '../types/resume';
import { exportResumeAsJson, importResumeFromJson } from '../utils/resumeStorage';

interface ImportExportButtonsProps {
  onImport: (data: ResumeData) => void;
  resumeData: ResumeData;
}

export const ImportExportButtons: React.FC<ImportExportButtonsProps> = ({
  onImport,
  resumeData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await importResumeFromJson(file);
      onImport(importedData);
    } catch (error) {
      alert('Error importing resume: ' + (error as Error).message);
    }
    
    // Reset input so the same file can be imported again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex space-x-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
      <button
        type="button"
        onClick={handleImportClick}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Import Resume
      </button>
      <button
        type="button"
        onClick={() => exportResumeAsJson(resumeData)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Export Resume
      </button>
    </div>
  );
};