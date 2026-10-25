export interface Degree {
  id: string;
  level: string;
  institution: string;
  graduationDate: string;
  description?: string;
}

export interface Skill {
  name: string;
  category: 'core' | 'technical' | 'personal';
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  dates: string;
  description: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string;
  tech: string[];
  liveComponent: 'date-converter' | 'calculator' | null;
}
