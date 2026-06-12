import React from 'react'
import { HButton, BoxFilter, FilterContain, HomeJobFilters, HomeMainJobFilter } from './home.styles'
import { CaretLeft, Sparkle } from '@phosphor-icons/react/dist/ssr'
import { HiddenOnMobile } from '@/styles/globals.styles'
import { MobileH4M } from '@/utils/typography'
import CheckBoxText from '@/components/Buttons/CheckBoxText'

export default function HomeJobFilter() {
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
          <ul style={{
            marginBottom: "20px",
          }}>
            <CheckBoxText label="Full Time" />
            <CheckBoxText label="Part time" />
            <CheckBoxText label="Internship" />
            <CheckBoxText label=" Project Work" />
            <CheckBoxText label=" Volunteering" />
          </ul>

          <MobileH4M>Employment Type</MobileH4M>
            <br />
          <ul>
            <CheckBoxText label="Full day" />
            <CheckBoxText label="Flexible schedule" />
            <CheckBoxText label="Shift method" />
            <CheckBoxText label="Distant Work" />
          </ul>
        </HomeMainJobFilter>
      </HomeJobFilters>
    </HiddenOnMobile>
  )
}
