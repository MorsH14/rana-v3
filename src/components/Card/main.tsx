import JobCard from '.';
import { JobFilterWrapper } from './style';

const jobData = [
  {
    company: "Amazon",
    role: "Senior UX/UI Designer",
    date: "20th May 2023",
    salary: "$120/hr",
    location: "California, CA",
    logo: "",
    chips: ["Full-Time", "Remote", "UX/UI"],
  },
  {
    company: "Google",
    role: "Software Engineer",
    date: "15th June 2023",
    salary: "$150/hr",
    location: "New York, NY",
    logo: "",
    chips: ["Full-Time", "Hybrid", "Backend"],
  },
  {
    company: "Microsoft",
    role: "Data Scientist",
    date: "10th July 2023",
    salary: "$130/hr",
    location: "Seattle, WA",
    logo: "",
    chips: ["Full-Time", "Remote", "AI/ML"],
  },
  {
    company: "Meta",
    role: "Front-End Developer",
    date: "5th August 2023",
    salary: "$110/hr",
    location: "Austin, TX",
    logo: "",
    chips: ["Contract", "On-site", "React"],
  },
  {
    company: "Tesla",
    role: "Cybersecurity Analyst",
    date: "30th April 2023",
    salary: "$140/hr",
    location: "Palo Alto, CA",
    logo: "",
    chips: ["Part-Time", "Remote", "Security"],
  },
  {
    company: "Meta",
    role: "Front-End Developer",
    date: "5th August 2023",
    salary: "$110/hr",
    location: "Austin, TX",
    logo: "",
    chips: ["Contract", "On-site", "React"],
  },
  {
    company: "Tesla",
    role: "Cybersecurity Analyst",
    date: "30th April 2023",
    salary: "$140/hr",
    location: "Palo Alto, CA",
    logo: "",
    chips: ["Part-Time", "Remote", "Security"],
  },
  {
    company: "Meta",
    role: "Front-End Developer",
    date: "5th August 2023",
    salary: "$110/hr",
    location: "Austin, TX",
    logo: "",
    chips: ["Contract", "On-site", "React"],
  },
  {
    company: "Tesla",
    role: "Cybersecurity Analyst",
    date: "30th April 2023",
    salary: "$140/hr",
    location: "Palo Alto, CA",
    logo: "",
    chips: ["Part-Time", "Remote", "Security"],
  },
];

export default function JobList() {
  return (
    <JobFilterWrapper>
      {jobData.map((job, index) => (
        <JobCard key={index} {...job} />
      ))}
    </JobFilterWrapper>
  );
}
