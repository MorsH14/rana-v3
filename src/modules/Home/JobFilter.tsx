import React from 'react'
import { HButton, BoxFilter, FilterContain, HomeJobFilters, HomeMainJobFilter } from './home.styles'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr'
import { HiddenOnMobile } from '@/styles/globals.styles'
import { MobileH3M, MobileH4M } from '@/utils/typography'
import CheckBoxText from '@/components/Buttons/CheckBoxText'

export default function HomeJobFilter() {
  return (
    <HiddenOnMobile>
      <HomeJobFilters>
        <BoxFilter>
          <MobileH3M>Get Your best profession with Ranajob</MobileH3M>
          <HButton>Learn more</HButton>
        </BoxFilter>
        <HomeMainJobFilter>
          <FilterContain>
            <MobileH3M>Filters</MobileH3M>
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
