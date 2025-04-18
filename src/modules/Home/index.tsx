"use client"

import { Box, Stack } from "@mui/material";
import SelectProp from "./SelectProp";
import { HomeJobHeaderWrapper, HomeJobWrapper, JobFiltersContainer, JobListWrapper, JobsHeaderWrapper, Numbutton } from "./home.styles";
import { COLORS } from "@/utils/colors.util";
import Search from "@/components/Inputs/Search";
import { HiddenOnMobile, HiddenOnSSMobile } from "@/styles/globals.styles";
import HomeJobFilter from "./JobFilter";
import { ArrowsDownUp } from "@phosphor-icons/react/dist/ssr";
import SortSelect from "@/components/Select/Select";
import { SortWrapper } from "@/components/Layout/styles";
import JobList from "@/components/Card/main";
import { useState } from "react";
import { MobileH3SM, MobilePM } from "@/utils/typography";

const options = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "lowest", label: "Lowest price" },
  { value: "highest", label: "Highest price" },
];


export default function Homepage() {
  const [sortOption, setSortOption] = useState("recommended");

  return (
    <>
      <JobFiltersContainer>
        <SelectProp />
        <HiddenOnMobile>
          <Box p={'10px'} bgcolor={COLORS.black100}>
            <Search
              value=''
              onChange={(e) => {
                console.log(e.target.value);
              }}
              placeholder="Search for Jobs"
            />
          </Box>
        </HiddenOnMobile>
      </JobFiltersContainer>
      <HomeJobWrapper >
        <Stack position='sticky' top={0}>
          <HomeJobFilter />
        </Stack>
        <JobListWrapper>
          <JobsHeaderWrapper>
            <HiddenOnSSMobile>
              <HomeJobHeaderWrapper>
                <MobileH3SM>Recommended Jobs</MobileH3SM>
                <Numbutton>
                  <MobilePM>386</MobilePM>
                </Numbutton>
              </HomeJobHeaderWrapper>
            </HiddenOnSSMobile>
            <SortWrapper>
              <MobilePM>Sort by:</MobilePM>
              <ArrowsDownUp size={18} />
              <SortSelect options={options} selectedOption={sortOption} onChange={(value) => setSortOption(value as string)} />
            </SortWrapper>
          </JobsHeaderWrapper>
          <JobList />
        </JobListWrapper>
      </HomeJobWrapper>
    </>
  )
}
