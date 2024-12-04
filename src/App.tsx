import { useState, useEffect, useCallback } from 'react';
import { FormSection } from './components/FormSection';
import { Input } from './components/Input';
import { TextArea } from './components/TextArea';
import { ExperienceForm } from './components/ExperienceForm';
import { EducationForm } from './components/EducationForm';
import { SocialLinks } from './components/SocialLinks';
import { ResumePreview } from './components/ResumePreview';
import { ImportExportButtons } from './components/ImportExportButtons';
import { generatePDF } from './utils/pdfGenerator';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useResumeData } from './hooks/useResumeData';
import type { ResumeData } from './types/resume';

function App() {
  const [experiences, setExperiences] = useState([0]);
  const [education, setEducation] = useState([0]);
  const { register, handleSubmit, formData, reset, control } = useResumeData();

  // Initialize arrays based on stored data
  const initializeArrays = useCallback(() => {
    const expLength = formData.experiences?.length || 1;
    const eduLength = formData.education?.length || 1;

    setExperiences(Array.from({ length: expLength }, (_, i) => i));
    setEducation(Array.from({ length: eduLength }, (_, i) => i));
  }, [formData.experiences?.length, formData.education?.length]);

  useEffect(() => {
    initializeArrays();
  }, [initializeArrays]);

  const addExperience = () => {
    setExperiences(prev => [...prev, prev.length]);
  };

  const removeExperience = (index: number) => {
    setExperiences(prev => prev.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducation(prev => [...prev, prev.length]);
  };

  const removeEducation = (index: number) => {
    setEducation(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ResumeData) => {
    await generatePDF();
  };

  const handleImport = (data: ResumeData) => {
    reset(data);
    const expLength = data.experiences?.length || 1;
    const eduLength = data.education?.length || 1;

    setExperiences(Array.from({ length: expLength }, (_, i) => i));
    setEducation(Array.from({ length: eduLength }, (_, i) => i));
  };

  return (
      <div className="h-screen bg-gray-50 overflow-hidden">
        <div className="flex h-full">
          <div className="w-1/2 overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Free Resume Builder
                </h1>
                <ImportExportButtons onImport={handleImport} resumeData={formData} />
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <FormSection title="Personal Information">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        placeholder="John"
                        {...register('firstName')}
                    />
                    <Input
                        label="Last Name"
                        placeholder="Doe"
                        {...register('lastName')}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Position"
                        placeholder="Principal Software Engineer"
                        {...register('position')}
                    />
                  </div>
                  <Input
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      {...register('email')}
                  />
                  <Input
                      label="Phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      {...register('phone')}
                  />
                  <Input
                      label="Location"
                      placeholder="City, Country"
                      {...register('location')}
                  />

                  <SocialLinks register={register} control={control} />

                  <TextArea
                      label="Professional Summary"
                      placeholder="Brief overview of your professional background and career goals"
                      rows={4}
                      {...register('summary')}
                  />
                </FormSection>

                <FormSection title="Work Experience">
                  {experiences.map((_, index) => (
                      <ExperienceForm
                          key={index}
                          index={index}
                          onRemove={() => removeExperience(index)}
                          register={register}
                          control={control}
                      />
                  ))}
                  <button
                      type="button"
                      onClick={addExperience}
                      className="flex items-center justify-center w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Experience
                  </button>
                </FormSection>

                <FormSection title="Education">
                  {education.map((_, index) => (
                      <EducationForm
                          key={index}
                          index={index}
                          onRemove={() => removeEducation(index)}
                          register={register}
                      />
                  ))}
                  <button
                      type="button"
                      onClick={addEducation}
                      className="flex items-center justify-center w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Education
                  </button>
                </FormSection>

                <FormSection title="Skills">
                  <TextArea
                      label="Technical Skills"
                      placeholder="List your technical skills (e.g., Programming languages, tools, frameworks)"
                      rows={3}
                      {...register('technicalSkills')}
                  />
                </FormSection>
              </form>
            </div>
          </div>

          {/* Right side - Preview */}
          <div className="w-1/2 h-full border-l border-gray-200 bg-gray-50">
            <div className="sticky top-0 p-8 h-full overflow-y-auto">
              <ResumePreview data={formData} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
