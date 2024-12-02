import React from 'react';
import { Input } from './Input';
import { TrashIcon } from '@heroicons/react/24/outline';
import { UseFormRegister } from 'react-hook-form';
import { ResumeData } from '../types/resume';

interface EducationFormProps {
  index: number;
  onRemove: () => void;
  register: UseFormRegister<ResumeData>;
}

export const EducationForm: React.FC<EducationFormProps> = ({ index, onRemove, register }) => {
  return (
    <div className="relative border border-gray-200 rounded-lg p-4 mb-4">
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Institution"
          placeholder="University/School name"
          {...register(`education.${index}.institution`)}
        />
        <Input
          label="Degree"
          placeholder="Degree/Certificate"
          {...register(`education.${index}.degree`)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="month"
          {...register(`education.${index}.startDate`)}
        />
        <Input
          label="End Date"
          type="month"
          {...register(`education.${index}.endDate`)}
        />
      </div>
      
      <Input
        label="Field of Study"
        placeholder="Major/Concentration"
        {...register(`education.${index}.fieldOfStudy`)}
      />
    </div>
  );
};