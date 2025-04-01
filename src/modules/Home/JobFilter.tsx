import React from 'react'
import { HButton, BoxFilter, FilterContain, HomeJobFilters, HomeMainJobFilter, List } from './home.styles'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr'
import { HiddenOnMobile } from '@/styles/globals.styles'
import { MobileH3M, MobileH4M, MobileH4SM } from '@/utils/typography'

export default function HomeJobFilter() {
  return (
    <HiddenOnMobile>
      <HomeJobFilters>
        <BoxFilter>
          <MobileH3M>Get Your best profession with Luckyjob</MobileH3M>
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
            <List>
              <input type="checkbox" /> 
              <MobileH4SM>Full time</MobileH4SM>
            </List>
            <List>
              <input type="checkbox" /> 
              <MobileH4SM> Part time</MobileH4SM>
            </List>
            <List>
              <input type="checkbox" /> 
              <MobileH4SM> Internship</MobileH4SM>
            </List>
            <List>
              <input type="checkbox" /> 
              <MobileH4SM> Project Work</MobileH4SM>
            </List>
            <List>
              <input type="checkbox" /> 
              <MobileH4SM> Volunteering</MobileH4SM>
            </List>
          </ul>

          <MobileH4M>Employment Type</MobileH4M>
            <br />
          <ul>
            <List>
              <input type="checkbox" /> 
              <MobileH4SM> Full day</MobileH4SM>
            </List>
            <List>
              <input type="checkbox" /> 
              <MobileH4SM> Flexible schedule</MobileH4SM>
            </List>
            <List>
              <input type="checkbox" /> 
              <MobileH4SM> Shift Work</MobileH4SM>
            </List>
            <List>
              <input type="checkbox" /> 
              <MobileH4SM> Distant Work</MobileH4SM>
            </List>
            <List>
              <input type="checkbox" /> 
              <MobileH4SM> Shift method</MobileH4SM>
            </List>
          </ul>
        </HomeMainJobFilter>
      </HomeJobFilters>
    </HiddenOnMobile>
  )
}
