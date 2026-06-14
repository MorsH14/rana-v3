import React from "react";
import { Sparkle, CaretLeft, Check } from "@phosphor-icons/react/dist/ssr";
import { HiddenOnMobile } from "@/styles/globals.styles";
import styled from "@emotion/styled";
import {
  BoxFilter,
  FilterContain,
  HomeJobFilters,
  HomeMainJobFilter,
  HButton,
} from "./home.styles";
import { COLORS } from "@/utils/colors.util";

const SectionHead = styled.div`
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${COLORS.SolidGray300};
  margin: 20px 0 10px;
`;

const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 4px;
`;

const Chip = styled.button<{ selected?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 12px;
  border-radius: 99px;
  border: 1.5px solid
    ${({ selected }) => (selected ? COLORS.NeutralSolidGray900 : COLORS.NeutralSolid50)};
  background: ${({ selected }) =>
    selected ? COLORS.NeutralSolidGray900 : "transparent"};
  color: ${({ selected }) =>
    selected ? "white" : COLORS.SolidGray400};
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    border-color: ${COLORS.NeutralSolidGray900};
    color: ${({ selected }) => (selected ? "white" : COLORS.NeutralSolidGray900)};
  }
`;

const SCHEDULE_OPTIONS = [
  "Full Time",
  "Part time",
  "Internship",
  "Project Work",
  "Volunteering",
];
const EMPLOYMENT_OPTIONS = [
  "Full day",
  "Flexible schedule",
  "Shift method",
  "Distant Work",
];

interface HomeJobFilterProps {
  selectedSchedules: string[];
  onScheduleToggle: (label: string) => void;
  selectedEmploymentTypes: string[];
  onEmploymentToggle: (label: string) => void;
}

export default function HomeJobFilter({
  selectedSchedules,
  onScheduleToggle,
  selectedEmploymentTypes,
  onEmploymentToggle,
}: HomeJobFilterProps) {
  return (
    <HiddenOnMobile>
      <HomeJobFilters>
        <BoxFilter>
          <Sparkle size={22} color="white" weight="fill" />
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.35,
              color: "white",
            }}
          >
            Find your next gig with Ranajob
          </span>
          <span
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.55)",
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.5,
            }}
          >
            Thousands of skilled workers near you
          </span>
          <HButton>Explore →</HButton>
        </BoxFilter>

        <HomeMainJobFilter>
          <FilterContain>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: COLORS.NeutralSolidGray900,
              }}
            >
              Filters
            </span>
            <CaretLeft size={16} weight="fill" color={COLORS.SolidGray300} />
          </FilterContain>

          <SectionHead>Working Schedule</SectionHead>
          <ChipGrid>
            {SCHEDULE_OPTIONS.map((label) => (
              <Chip
                key={label}
                selected={selectedSchedules.includes(label)}
                onClick={() => onScheduleToggle(label)}
              >
                {selectedSchedules.includes(label) && (
                  <Check size={10} weight="bold" />
                )}
                {label}
              </Chip>
            ))}
          </ChipGrid>

          <SectionHead>Employment Type</SectionHead>
          <ChipGrid>
            {EMPLOYMENT_OPTIONS.map((label) => (
              <Chip
                key={label}
                selected={selectedEmploymentTypes.includes(label)}
                onClick={() => onEmploymentToggle(label)}
              >
                {selectedEmploymentTypes.includes(label) && (
                  <Check size={10} weight="bold" />
                )}
                {label}
              </Chip>
            ))}
          </ChipGrid>
        </HomeMainJobFilter>
      </HomeJobFilters>
    </HiddenOnMobile>
  );
}
