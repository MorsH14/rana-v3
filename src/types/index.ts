export type PostedJob = {
  id: string;
  company: string;
  role: string;
  date: string;
  salary: string;
  salaryValue: number;
  location: string;
  logo: string;
  category: string;
  description: string;
  chips: string[];
  rating?: number;
  reviewCount?: number;
};
