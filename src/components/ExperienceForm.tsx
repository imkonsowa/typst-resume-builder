import React, { useState } from 'react';
import { Input } from './Input';
import { TextArea } from './TextArea';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { UseFormRegister, UseFieldArrayReturn, Control, useFieldArray } from 'react-hook-form';
import { ResumeData } from '../types/resume';

interface ExperienceFormProps {
    index: number;
    onRemove: () => void;
    register: UseFormRegister<ResumeData>;
    control: Control<ResumeData>;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
                                                                  index,
                                                                  onRemove,
                                                                  register,
                                                                  control
                                                              }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `experiences.${index}.descriptions`
    });

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
                    label="Company"
                    placeholder="Company name"
                    {...register(`experiences.${index}.company`)}
                />
                <Input
                    label="Position"
                    placeholder="Job title"
                    {...register(`experiences.${index}.position`)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Start Date"
                    type="month"
                    format="yyyy-MM"
                    {...register(`experiences.${index}.startDate`)}
                />
                <div className="space-y-2">
                    <Input
                        label="End Date"
                        type="month"
                        disabled={Boolean(register(`experiences.${index}.isPresent`).value)}
                        {...register(`experiences.${index}.endDate`)}
                    />
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            {...register(`experiences.${index}.isPresent`)}
                        />
                        <label className="text-sm text-gray-600">
                            I currently work here
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                        Description Items
                    </label>
                    <button
                        type="button"
                        onClick={() => append({ text: '' })}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                    >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Item
                    </button>
                </div>

                {fields.map((field, descIndex) => (
                    <div key={field.id} className="relative">
                        <Input
                            placeholder="Describe a responsibility or achievement"
                            className="w-full pr-10"
                            {...register(`experiences.${index}.descriptions.${descIndex}.text`)}
                        />
                        <button
                            type="button"
                            onClick={() => remove(descIndex)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
