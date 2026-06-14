"use client"

import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

export const SortMainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  
  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;

export const SortDesktopWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const FilterPillsBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  overflow-x: auto;

  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
`;
export const JobFiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 36px;
  background-color: ${COLORS.black100};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  @media screen and (max-width: 920px) {
    padding: 10px 16px;
    gap: 12px;
  }
`
export const HomeJobWrapper = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
gap: 30px;

@media screen and (max-width: 769px) {
  gap: 0;
}
`
export const HomeJobHeaderWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
padding: 0 10px;
`

export const JobListWrapper = styled.div`
    width: 100%;
    padding: 20px;

    @media screen and (max-width: 769px) {
    padding: 20px 0;
}
`
export const HomeJobFilters = styled.div`
    margin: 50px 0 0 30px;
`

export const BoxFilter = styled.div`
    width: 230px;
    background: ${COLORS.NeutralSolidGray900};
    color: white;
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    padding: 24px 20px;

    @media screen and (max-width: 1158px) {
        width: 160px;
        padding: 16px 14px;
    }
`
export const HomeMainJobFilter = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 260px;
    margin-top: 28px;
    font-family: Inter, sans-serif;
    border-right: 1px solid ${COLORS.NeutralSolid50};
    padding-right: 10px;

    @media screen and (min-width: 769px) and (max-width: 920px) {
        width: 120px;
    }
    @media screen and (min-width: 920px) and (max-width: 1320px) {
        width: 180px;
    }
`
export const HButton = styled.div`
    padding: 9px 16px;
    background: white;
    color: ${COLORS.NeutralSolidGray900};
    border-radius: 99px;
    font-weight: 600;
    font-size: 13px;
    font-family: Inter, sans-serif;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: opacity 0.15s;
    align-self: flex-start;

    &:hover {
        opacity: 0.85;
    }

    @media screen and (max-width: 1158px) {
        font-size: 11px;
        padding: 7px 12px;
    }
`
export const FilterContain = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`
export const JobsHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;

    @media screen and (max-width: 1160px) {
        margin-top: 0;
    }
    @media screen and (max-width: 568px) {
        justify-content: flex-end;
    }
`

export const Rjobs = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`
export const RRjobs = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`

export const Numbutton = styled.button`
    background: transparent;
    border: 0.5px solid gray;
    border-radius: 20px;
    padding: 5px 10px;
    font-weight: bold;
    font-family: 'DM Sans';
`
export const InnerDex = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 0px 20px;
`