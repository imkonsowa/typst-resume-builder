import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ResumeData } from '../types/resume';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'resumeData';

const defaultValues: ResumeData = {
  firstName: '',
  lastName: '',
  position: '',
  email: '',
  phone: '',
  location: '',
  socialLinks: [], // Initialize as empty array
  summary: '',
  experiences: [],
  education: [],
  technicalSkills: '',
  softSkills: ''
};

export function useResumeData() {
  const [storedData, setStoredData] = useLocalStorage<ResumeData>(STORAGE_KEY, defaultValues);

  const methods = useForm<ResumeData>({
    defaultValues: {
      ...defaultValues,
      ...storedData,
      socialLinks: Array.isArray(storedData.socialLinks) ? storedData.socialLinks : []
    }
  });

  const { watch, reset } = methods;
  const formData = watch();

  // Memoize the update function to prevent infinite loops
  const updateStorage = useCallback((data: ResumeData) => {
    setStoredData(data);
  }, [setStoredData]);

  // Update localStorage when form data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateStorage(formData);
    }, 500); // Debounce updates to prevent excessive writes

    return () => clearTimeout(timeoutId);
  }, [formData, updateStorage]);

  return {
    ...methods,
    formData
  };
}
