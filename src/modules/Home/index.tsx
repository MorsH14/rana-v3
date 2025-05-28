"use client"

import { Box, Stack } from "@mui/material";
import SelectProp from "./SelectProp";
import { HomeJobHeaderWrapper, HomeJobWrapper, JobFiltersContainer, JobListWrapper, JobsHeaderWrapper, Numbutton } from "./home.styles";
import { COLORS } from "@/utils/colors.util";
import Search from "@/components/Inputs/Search";
import { HiddenOnDesktop, HiddenOnMobile, HiddenOnSSMobile } from "@/styles/globals.styles";
import HomeJobFilter from "./JobFilter";
import { ArrowsDownUp } from "@phosphor-icons/react/dist/ssr";
import SortSelect from "@/components/Select/Select";
import { SortWrapper } from "@/components/Layout/styles";
import JobList from "@/components/Card/main";
import { useState } from "react";
import { MobileH3SM, MobilePM } from "@/utils/typography";
import { jobData } from "@/db";

const options = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "lowest", label: "Lowest price" },
  { value: "highest", label: "Highest price" },
];



export default function Homepage() {
  const [sortOption, setSortOption] = useState("recommended");

  const [query, setQuery] = useState("");

  // Filter jobs based on search query (case insensitive)
  const filteredJobs = jobData.filter((job) =>
    Object.values(job).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );
      }
      return value.toLowerCase().includes(query.toLowerCase());
    })
  );


  return (
    <>
    
        <HiddenOnDesktop>
          <Box p={'10px'} bgcolor={COLORS.black100}>
            <Search
              placeholder="Search for Jobs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
        </HiddenOnDesktop>
      <JobFiltersContainer>
        <SelectProp />
        <HiddenOnMobile>
          <Box p={'10px'} bgcolor={COLORS.black100}>
            <Search
              placeholder="Search for Jobs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
                  <MobilePM>{filteredJobs.length}</MobilePM>
                </Numbutton>
              </HomeJobHeaderWrapper>
            </HiddenOnSSMobile>
            <SortWrapper>
              <MobilePM>Sort by:</MobilePM>
              <ArrowsDownUp size={18} />
              <SortSelect options={options} selectedOption={sortOption} onChange={(value) => setSortOption(value as string)} />
            </SortWrapper>
          </JobsHeaderWrapper>
          <JobList jobs={filteredJobs} query={query} />
        </JobListWrapper>
      </HomeJobWrapper>
    </>
  )
}
