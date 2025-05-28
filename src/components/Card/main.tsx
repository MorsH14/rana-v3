import { jobData } from '@/db';
import JobCard from '.';
import { JobFilterWrapper } from './style';
import NoListItemCard from './NoItemCard';
import { Warehouse } from '@phosphor-icons/react/dist/ssr';

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
        <NoListItemCard
          Icon={Warehouse}
          label="No job found"
        />
      )}
    </JobFilterWrapper>
  );
}
