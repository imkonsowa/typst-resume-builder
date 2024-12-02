export interface ResumeData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  location: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  technicalSkills: string;
  softSkills: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isPresent: boolean;
  descriptions: DescriptionItem[];
}

export interface DescriptionItem {
  text: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}
