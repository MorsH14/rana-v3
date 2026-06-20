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
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { MobileH3SM, MobilePM } from "@/utils/typography";
import { fetchListings } from "@/lib/listings";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import type { PostedJob } from "@/types";

const SkeletonCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background: #f3f4f6;
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 800px 100%;
  animation: shimmer 1.4s infinite linear;
  height: 160px;
`;

const SkeletonGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 4px;
`;

const ClearFiltersBtn = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 99px;
  color: rgba(255, 255, 255, 0.7);
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    color: white;
  }
`;

function parseSortableDate(dateStr: string): number {
  const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/i, "$1");
  const d = new Date(cleaned);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "lowest", label: "Lowest price" },
  { value: "highest", label: "Highest price" },
];

export default function HomeClient() {
  const [sortOption, setSortOption] = useState("recommended");
  const [query, setQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState<string | number>("price");
  const [selectedLocation, setSelectedLocation] = useState("state");

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

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedPrice !== "price" ||
    selectedLocation !== "state" ||
    selectedSchedules.length > 0 ||
    selectedEmploymentTypes.length > 0 ||
    query.length > 0;

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedPrice("price");
    setSelectedLocation("state");
    setSelectedSchedules([]);
    setSelectedEmploymentTypes([]);
    setQuery("");
  };

  const [dbListings, setDbListings] = useState<PostedJob[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchListings().then((data) => { setDbListings(data); setLoading(false); });
  }, []);

  const [postedJobs] = useLocalStorage<PostedJob[]>("rana-posted-jobs", []);
  const allJobs = [...postedJobs, ...dbListings];

  const filteredJobs = allJobs
    .filter((job) => {
      const matchesSearch = Object.values(job).some((value) => {
        if (typeof value === "number") return false;
        if (Array.isArray(value))
          return value.some((item) => item.toLowerCase().includes(query.toLowerCase()));
        return value.toString().toLowerCase().includes(query.toLowerCase());
      });
      const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
      const matchesPrice = selectedPrice === "price" || job.salaryValue <= Number(selectedPrice);
      const matchesLocation = selectedLocation === "state" || job.location === selectedLocation;
      const matchesSchedule =
        selectedSchedules.length === 0 ||
        selectedSchedules.some((s) => {
          if (s === "Full Time") return job.salary.includes("/month");
          if (s === "Part time")
            return job.salary.includes("/session") || job.salary.includes("/hour") || job.salary.includes("/occasion");
          if (s === "Project Work") return job.salary.includes("/project");
          return false;
        });
      const matchesEmployment =
        selectedEmploymentTypes.length === 0 ||
        selectedEmploymentTypes.some((t) => {
          if (t === "Full day") return job.salary.includes("/day") || job.chips.includes("On-site");
          if (t === "Distant Work") return job.chips.includes("Remote") || job.chips.includes("Online");
          if (t === "Flexible schedule") return job.chips.some((c) => c.toLowerCase().includes("flexible"));
          return false;
        });
      return matchesSearch && matchesCategory && matchesPrice && matchesLocation && matchesSchedule && matchesEmployment;
    })
    .sort((a, b) => {
      if (sortOption === "newest") return parseSortableDate(b.date) - parseSortableDate(a.date);
      if (sortOption === "lowest") return a.salaryValue - b.salaryValue;
      if (sortOption === "highest") return b.salaryValue - a.salaryValue;
      return 0;
    });

  return (
    <>
      <HiddenOnDesktop>
        <Box p={"10px"} bgcolor={COLORS.black100}>
          <Search
            placeholder="Search for jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
          />
        </Box>
      </HiddenOnDesktop>

      <JobFiltersContainer>
        <SelectProp
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        {hasActiveFilters && (
          <ClearFiltersBtn onClick={clearAllFilters}>Clear filters</ClearFiltersBtn>
        )}
        <HiddenOnMobile>
          <div style={{ width: 260, flexShrink: 0 }}>
            <Search
              placeholder="Search for jobs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
            />
          </div>
        </HiddenOnMobile>
      </JobFiltersContainer>

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
            <SortWrapper>
              <MobilePM>Sort by:</MobilePM>
              <ArrowsDownUp size={18} />
              <SortSelect
                options={sortOptions}
                selectedOption={sortOption}
                onChange={(value) => setSortOption(value as string)}
              />
            </SortWrapper>
          </JobsHeaderWrapper>
          {loading ? (
            <SkeletonGrid>
              {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
            </SkeletonGrid>
          ) : (
            <JobList jobs={filteredJobs} query={query} />
          )}
        </JobListWrapper>
      </HomeJobWrapper>
    </>
  );
}
