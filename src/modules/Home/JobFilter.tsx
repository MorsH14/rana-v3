import React from 'react'
import { HButton, BoxFilter, FilterContain, HomeJobFilters, HomeMainJobFilter } from './home.styles'
import { CaretLeft, Sparkle } from '@phosphor-icons/react/dist/ssr'
import { HiddenOnMobile } from '@/styles/globals.styles'
import { MobileH4M } from '@/utils/typography'
import CheckBoxText from '@/components/Buttons/CheckBoxText'

const SCHEDULE_OPTIONS = ["Full Time", "Part time", "Internship", "Project Work", "Volunteering"];
const EMPLOYMENT_OPTIONS = ["Full day", "Flexible schedule", "Shift method", "Distant Work"];

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
          <span style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif', lineHeight: 1.35, color: 'white' }}>
            Find your next gig with Ranajob
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
            Thousands of skilled workers near you
          </span>
          <HButton>Explore →</HButton>
        </BoxFilter>
        <HomeMainJobFilter>
          <FilterContain>
            <MobileH4M>Filters</MobileH4M>
            <CaretLeft size={16} weight="fill" />
          </FilterContain>

          <MobileH4M>Working Schedule</MobileH4M>
          <br />
          <ul style={{ marginBottom: "20px" }}>
            {SCHEDULE_OPTIONS.map((label) => (
              <CheckBoxText
                key={label}
                label={label}
                checked={selectedSchedules.includes(label)}
                onChange={onScheduleToggle}
              />
            ))}
          </ul>

          <MobileH4M>Employment Type</MobileH4M>
          <br />
          <ul>
            {EMPLOYMENT_OPTIONS.map((label) => (
              <CheckBoxText
                key={label}
                label={label}
                checked={selectedEmploymentTypes.includes(label)}
                onChange={onEmploymentToggle}
              />
            ))}
          </ul>
        </HomeMainJobFilter>
      </HomeJobFilters>
    </HiddenOnMobile>
  )
}
