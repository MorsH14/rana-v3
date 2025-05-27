import { jobData } from '@/db';
import JobCard from '.';
import { JobFilterWrapper } from './style';

interface JobListProps {
  jobs: typeof jobData;  // your job data type
  query: string;
}

export default function JobList({ jobs, query }: JobListProps) {
  return (
    <JobFilterWrapper>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <JobCard key={index} {...job} query={query} />
        ))
      ) : (
        <p style={{ padding: "20px", color: "#666" }}>No jobs found.</p>
      )}
    </JobFilterWrapper>
  );
}
