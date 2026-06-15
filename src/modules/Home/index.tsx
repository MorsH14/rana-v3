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

  // sidebar checkbox states
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>([]);

  const toggleSchedule = (label: string) =>
    setSelectedSchedules((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );

  const toggleEmployment = (label: string) =>
    setSelectedEmploymentTypes((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );

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

      // working schedule filter (OR within group)
      const matchesSchedule =
        selectedSchedules.length === 0 ||
        selectedSchedules.some((schedule) => {
          if (schedule === "Full Time") return job.salary.includes("/month");
          if (schedule === "Part time")
            return (
              job.salary.includes("/session") ||
              job.salary.includes("/hour") ||
              job.salary.includes("/occasion")
            );
          if (schedule === "Project Work") return job.salary.includes("/project");
          return false;
        });

      // employment type filter (OR within group)
      const matchesEmployment =
        selectedEmploymentTypes.length === 0 ||
        selectedEmploymentTypes.some((type) => {
          if (type === "Full day")
            return job.salary.includes("/day") || job.chips.includes("On-site");
          if (type === "Distant Work")
            return job.chips.includes("Remote") || job.chips.includes("Online");
          if (type === "Flexible schedule")
            return job.chips.some((c) => c.toLowerCase().includes("flexible"));
          return false;
        });

      return matchesSearch && matchesCategory && matchesPrice && matchesLocation && matchesSchedule && matchesEmployment;
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
            onClear={() => setQuery("")}
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
          <div style={{ width: 260, flexShrink: 0 }}>
            <Search
              placeholder="Search for Jobs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
            />
          </div>
        </HiddenOnMobile>
      </JobFiltersContainer>

      {/* Jobs */}
      <HomeJobWrapper>
        <Stack position="sticky" top={80}>
          <HomeJobFilter
            selectedSchedules={selectedSchedules}
            onScheduleToggle={toggleSchedule}
            selectedEmploymentTypes={selectedEmploymentTypes}
            onEmploymentToggle={toggleEmployment}
          />
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
