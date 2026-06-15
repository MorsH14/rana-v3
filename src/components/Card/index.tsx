import { useMemo } from 'react';
import { Box, Chip, Stack } from '@mui/material';
import {
  CardDetailsWrapper,
  JobCardWrapper,
  JobWrapperContent,
  CompanyAvatar,
  ChipsWrapper,
  JobChip,
  JobDetailsContainer,
  JobDetailsText,
  RadiusBtn
} from './style';
import CardBtn from '../Buttons/CardBtn';
import { FlexBtw } from '@/styles/globals.styles';
import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr';
import {
  Font50016,
  FontRR500,
  Mobile500RS16,
  MobileLightRS12
} from '@/utils/typography';
import { useRouter } from 'next/navigation';
import StarRating from '../StarRating';
import { useSavedJobs } from '@/utils/hooks/useSavedJobs';
import { COLORS } from '@/utils/colors.util';

interface JobCardProps {
  id: number | string;
  company: string;
  role: string;
  date: string;
  salary: string;
  location: string;
  logo: string;
  chips: string[];
  rating?: number;
  reviewCount?: number;
  query?: string;
}

export default function JobCard({
  id,
  company,
  role,
  date,
  salary,
  location,
  logo,
  chips,
  rating,
  reviewCount,
  query = ''
}: JobCardProps) {
  const bgColor = useMemo(() => {
    const colors = ['#e79c469d', '#92e7acb3', '#ce93d38d', '#8dd6ecb9', '#b597ebb8', '#c4e7469d'];
    const seed = typeof id === 'number' ? id : id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return colors[seed % colors.length];
  }, [id]);

  function escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlightMatch(text: string, keyword: string) {
    if (!keyword.trim()) return text;

    const regex = new RegExp(`(${escapeRegex(keyword)})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span
              key={index}
              style={{
                backgroundColor: '#FFD54F',
                padding: '0 2px',
                borderRadius: '4px'
              }}
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  }

  const initials = company
    .split(" ")
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const router = useRouter();
  const { isSaved, toggle } = useSavedJobs();
  const saved = isSaved(id);

  const handleDetailsClick = () => {
    router.push(`/job/${id}`);
  };


  return (
    <JobCardWrapper>
      <CardDetailsWrapper bgColor={bgColor}>
        <FlexBtw>
          <Stack minWidth="40px">
            <Chip
              label={date}
              sx={{
                background: 'white',
                fontSize: '10px',
                flexWrap: 'wrap',
                marginRight: '5px'
              }}
            />
          </Stack>
          <RadiusBtn
            onClick={() => toggle(id)}
            style={{ background: saved ? COLORS.blueNormal : COLORS.white100 }}
          >
            <BookmarkSimple
              weight={saved ? "fill" : "regular"}
              color={saved ? COLORS.white100 : COLORS.black100}
            />
          </RadiusBtn>
        </FlexBtw>

        <Box mt={'15px'}>
          <Font50016>{highlightMatch(company, query)}</Font50016>
        </Box>

        <JobWrapperContent>
          <Box width="75%" marginRight="5px">
            <FontRR500>{highlightMatch(role, query)}</FontRR500>
          </Box>
          <CompanyAvatar>{initials}</CompanyAvatar>
        </JobWrapperContent>

        <ChipsWrapper>
          {chips.map((chip, index) => (
            <JobChip key={index}>{highlightMatch(chip, query)}</JobChip>
          ))}
        </ChipsWrapper>
      </CardDetailsWrapper>

      <JobDetailsContainer>
        <JobDetailsText>
          <Stack>
            <Mobile500RS16>{highlightMatch(salary, query)}</Mobile500RS16>
            <MobileLightRS12>{highlightMatch(location, query)}</MobileLightRS12>
            {rating !== undefined && (
              <StarRating rating={rating} reviewCount={reviewCount} size={10} />
            )}
          </Stack>
          <CardBtn label="Details" onClick={handleDetailsClick} />
        </JobDetailsText>
      </JobDetailsContainer>
    </JobCardWrapper>
  );
}
