import React from 'react';
import { UseFormRegister, useFieldArray, Control } from 'react-hook-form';
import { ResumeData } from '../types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { 
  GitHub, 
  Linkedin, 
  Twitter, 
  Globe,
  Dribbble,
  BookOpen,
  Edit3,
  Link as LinkIcon
} from 'react-feather';

interface SocialLinksProps {
  register: UseFormRegister<ResumeData>;
  control: Control<ResumeData>;
}

const SOCIAL_PLATFORMS = [
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'github', label: 'GitHub', icon: GitHub },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'portfolio', label: 'Portfolio', icon: Globe },
  { value: 'dribbble', label: 'Dribbble', icon: Dribbble },
  { value: 'medium', label: 'Medium', icon: BookOpen },
  { value: 'devto', label: 'Dev.to', icon: Edit3 },
  { value: 'custom', label: 'Other', icon: LinkIcon }
];

export const SocialLinks: React.FC<SocialLinksProps> = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks'
  });

  const addSocialLink = () => {
    append({ platform: 'linkedin', url: '', customLabel: '' });
  };

  const getPlatformIcon = (platform: string) => {
    const found = SOCIAL_PLATFORMS.find(p => p.value === platform);
    const Icon = found?.icon || LinkIcon;
    return <Icon size={20} className="text-gray-600" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Social Links</h3>
        <button
          type="button"
          onClick={addSocialLink}
          className="flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Link
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="flex-none">
              {getPlatformIcon(field.platform)}
            </div>
            
            <div className="flex-1 flex gap-2">
              <select
                {...register(`socialLinks.${index}.platform`)}
                className="w-40 px-3 py-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                {SOCIAL_PLATFORMS.map(platform => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
              
              <input
                type="url"
                placeholder="https://"
                {...register(`socialLinks.${index}.url`)}
                className="flex-1 px-3 py-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              />
              
              {field.platform === 'custom' && (
                <input
                  type="text"
                  placeholder="Label"
                  {...register(`socialLinks.${index}.customLabel`)}
                  className="w-32 px-3 py-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
              )}
            </div>
            
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex-none p-2 text-gray-400 hover:text-red-500"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};