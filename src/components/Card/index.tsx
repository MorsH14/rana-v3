import { useEffect, useMemo, useState } from 'react';
import { Chip, Stack } from '@mui/material';
import {
  CardDetailsWrapper,
  JobCardWrapper,
  JobWrapperContent,
  JobLogoWrapper,
  ChipsWrapper,
  JobChip,
  JobDetailsContainer,
  JobDetailsText,
  CardName,
  CardTitle,
  Location,
  Price,
  RadiusBtn
} from './style';
import Image from 'next/image';
import CardBtn from '../Buttons/CardBtn';
import { FlexBtw } from '@/styles/globals.styles';
import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr';
import { MediumText, SmallText } from '@/utils/typography';

interface JobCardProps {
  company: string;
  role: string;
  date: string;
  salary: string;
  location: string;
  logo: string;
  chips: string[];
}

export default function JobCard({ company, role, date, salary, location, logo, chips }: JobCardProps) {
  const randomBgColorCombo = useMemo(
    () => ["#e79c469d", "#92e7acb3", "#ce93d38d", "#8dd6ecb9"],
    []
  );

  const [bgColor, setBgColor] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomBgColorCombo.length);
    setBgColor(randomBgColorCombo[randomIndex]);
  }, [randomBgColorCombo]);

  return (
    <JobCardWrapper>
      <CardDetailsWrapper bgColor={bgColor}>
        <FlexBtw>
          <Stack minWidth={"40px"}>
            <Chip label={date} sx={{ background: "white", fontSize: "10px", flexWrap: "wrap", marginRight: "5px" }} />
          </Stack>
          <RadiusBtn>
            <BookmarkSimple />
          </RadiusBtn>
        </FlexBtw>
        <CardName>{company}</CardName>
        <JobWrapperContent>
          <CardTitle>{role}</CardTitle>
          <JobLogoWrapper>
            <Image src={logo} alt={`${company} logo`} width={30} height={30} />
          </JobLogoWrapper>
        </JobWrapperContent>

        <ChipsWrapper>
          {chips.map((chip, index) => (
            <JobChip key={index}>{chip}</JobChip>
          ))}
        </ChipsWrapper>
      </CardDetailsWrapper>

      <JobDetailsContainer>
        <JobDetailsText>
          <Stack>
            <MediumText>{salary}</MediumText>
            <SmallText>{location}</SmallText>
          </Stack>
          <CardBtn label="Details" />
        </JobDetailsText>
      </JobDetailsContainer>
    </JobCardWrapper>
  );
}
