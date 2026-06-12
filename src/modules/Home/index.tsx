"use client";

import { Box, Stack } from "@mui/material";
import SelectProp from "./SelectProp";
import {
  HomeJobHeaderWrapper,
  HomeJobWrapper,
  JobFiltersContainer,
  JobListWrapper,
  JobsHeaderWrapper,
  Numbutton,
} from "./home.styles";
import { COLORS } from "@/utils/colors.util";
import Search from "@/components/Inputs/Search";
import {
  HiddenOnDesktop,
  HiddenOnMobile,
  HiddenOnSSMobile,
} from "@/styles/globals.styles";
import HomeJobFilter from "./JobFilter";
import { ArrowsDownUp } from "@phosphor-icons/react/dist/ssr";
import SortSelect from "@/components/Select/Select";
import { SortWrapper } from "@/components/Layout/styles";
import JobList from "@/components/Card/main";
import { useState } from "react";
import { MobileH3SM, MobilePM } from "@/utils/typography";
import { jobData } from "@/db";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";

const options = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "lowest", label: "Lowest price" },
  { value: "highest", label: "Highest price" },
];

export default function Homepage() {
  const [sortOption, setSortOption] = useState("recommended");
  const [query, setQuery] = useState("");

  // dropdown states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState<string | number>("price");
  const [selectedLocation, setSelectedLocation] = useState("state");

  const [postedJobs] = useLocalStorage<typeof jobData>("rana-posted-jobs", []);
  const allJobs = [...postedJobs, ...jobData];

  // filtering
  const filteredJobs = allJobs
    .filter((job) => {
      // search filter
      const matchesSearch = Object.values(job).some((value) => {
        if (typeof value === "number") return false;
        if (Array.isArray(value)) {
          return value.some((item) =>
            item.toLowerCase().includes(query.toLowerCase())
          );
        }
        return value.toString().toLowerCase().includes(query.toLowerCase());
      });

      // category filter
      const matchesCategory =
        selectedCategory === "all" || job.category === selectedCategory;

      // price filter — uses salaryValue (numeric)
      const matchesPrice =
        selectedPrice === "price" || job.salaryValue <= Number(selectedPrice);

      // location filter
      const matchesLocation =
        selectedLocation === "state" || job.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesPrice && matchesLocation;
    })
    // sorting
    .sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortOption === "lowest") {
        return a.salaryValue - b.salaryValue;
      }
      if (sortOption === "highest") {
        return b.salaryValue - a.salaryValue;
      }
      return 0;
    });

  return (
    <>
      {/* Mobile search */}
      <HiddenOnDesktop>
        <Box p={"10px"} bgcolor={COLORS.black100}>
          <Search
            placeholder="Search for Jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </HiddenOnDesktop>

      {/* Filters */}
      <JobFiltersContainer>
        <SelectProp
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {/* Desktop search */}
        <HiddenOnMobile>
          <Box p={"10px"} bgcolor={COLORS.black100}>
            <Search
              placeholder="Search for Jobs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
        </HiddenOnMobile>
      </JobFiltersContainer>

      {/* Jobs */}
      <HomeJobWrapper>
        <Stack position="sticky" top={80}>
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

            {/* Sort dropdown */}
            <SortWrapper>
              <MobilePM>Sort by:</MobilePM>
              <ArrowsDownUp size={18} />
              <SortSelect
                options={options}
                selectedOption={sortOption}
                onChange={(value) => setSortOption(value as string)}
              />
            </SortWrapper>
          </JobsHeaderWrapper>

          {/* Job List */}
          <JobList jobs={filteredJobs} query={query} />
        </JobListWrapper>
      </HomeJobWrapper>
    </>
  );
}
