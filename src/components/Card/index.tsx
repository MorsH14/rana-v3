import { useMemo } from 'react';
import { Box, Chip, Stack } from '@mui/material';
import {
  CardDetailsWrapper,
  JobCardWrapper,
  JobWrapperContent,
  JobLogoWrapper,
  ChipsWrapper,
  JobChip,
  JobDetailsContainer,
  JobDetailsText,
  RadiusBtn
} from './style';
import Image from 'next/image';
import CardBtn from '../Buttons/CardBtn';
import { FlexBtw } from '@/styles/globals.styles';
import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr';
import { Font50016, FontRR500, Mobile500RS16, MobileLightRS12 } from '@/utils/typography';

interface JobCardProps {
  company: string;
  role: string;
  date: string;
  salary: string;
  location: string;
  logo: string;
  chips: string[];
  query?: string; // <-- Add this here
}

export default function JobCard({
  company,
  role,
  date,
  salary,
  location,
  logo,
  chips,
  query = '', // default empty string so it never breaks
}: JobCardProps) {
  // Generate a random background color immediately during render
  const bgColor = useMemo(() => {
    const colors = ['#e79c469d', '#92e7acb3', '#ce93d38d', '#8dd6ecb9', '#b597ebb8', '#c4e7469d'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }, []);

  function highlightMatch(text: string, query: string) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'ig');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span
              key={index}
              style={{
                backgroundColor: "#FFD54F",
                padding: "0 2px",
                borderRadius: "4px",
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
          <RadiusBtn>
            <BookmarkSimple />
          </RadiusBtn>
        </FlexBtw>

        <Box mt={'15px'}>
          <Font50016>{highlightMatch(company, query)}</Font50016>
        </Box>
        <JobWrapperContent>
          <Box width={'75%'} marginRight={'5px'}>
            <FontRR500>{highlightMatch(role, query)}</FontRR500>
          </Box>
          <JobLogoWrapper>
            <Image
              src={logo}
              alt={`${company} logo`}
              width={30}
              height={30}
            />
          </JobLogoWrapper>
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
          </Stack>
          <CardBtn label="Details" />
        </JobDetailsText>
      </JobDetailsContainer>
    </JobCardWrapper>
  );
}
