export interface Candidate {
  id: string;
  name: string;
  age: number;
  city: string;
  profession: string;
  languageLevel: string;
  status: 'NEW' | 'FILTERED' | 'INTERVIEW' | 'READY' | 'SENT' | 'REJECTED';
  score: number;
  photo?: string;
  appliedDate: string;
}

export interface Vacancy {
  id: string;
  title: string;
  country: string;
  salary: string;
  requirements: string[];
  status: 'ACTIVE' | 'CLOSED';
  lastUpdated: string;
}

export interface Stats {
  newCandidates: number;
  totalApplications: number;
  readyCandidates: number;
  activeVacancies: number;
  totalRevenue?: string;
}
