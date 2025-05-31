export interface workExperience {
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
export interface ResumeData {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    summary: string;
    workExperience: workExperience[];
    skills: string[];
  }