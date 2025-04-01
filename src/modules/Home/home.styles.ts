"use client"

import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

export const SortMainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  overflow-x: scroll;
  
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
export const DesktopNavIcon = styled.div`
width: 35px;
height: 35px;
border-radius: 50%;
background: transparent;
border: .5px solid ${COLORS.gray100};
display: flex;
justify-content: center;
align-items: center;
`
export const Hr = styled.div`
width: 2px;
height: 100%;
background-color: ${COLORS.gray100};
`
export const JobFiltersContainer = styled.div`
display: grid;
grid-template-columns: 70% 30%;
padding: 20px 50px;
background-color: ${COLORS.black100};

@media screen and (max-width: 920px) {
  padding: 20px;
  display: flex;
  justify-content: flex-start;
}

`
export const HomeJobWrapper = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
margin: 0 40px;

@media screen and (max-width: 920px) {
  margin: 0;
}
`

export const JobListWrapper = styled.div`
    width: 100%;
    padding: 20px;
`
export const HomeJobFilters = styled.div`
    /* display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: column;  */
`

export const BoxFilter = styled.div`
    width: 230px;
    height: 270px;
    background: black;
    color: white;
    margin-top: 50px;
    border-radius: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 30px;

    @media screen and (max-width: 1158px) {
        width: 160px; 
        font-size: 18px;
    }
    `
export const HomeMainJobFilter = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 260px;
    margin-top: 50px;
    font-family: 'Sulphur Point';
    border-right: 2px solid #49444439;
    padding-right: 10px;

    @media screen and (min-width: 769px) and (max-width: 920px) {
        width: 120px; 
    }
    @media screen and (min-width: 920px) and (max-width: 1320px) {
        width: 180px; 
    }
`
export const HButton = styled.div`
    padding: 10px;
    background: #8edbfa;
    color: #000000e2;
    border-radius: 20px;
    font-weight: 600;
    font-size: 16px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @media screen and (max-width: 1158px) {
        font-size: 12px;
    }
`
export const List = styled.li`
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    font-family: 'Sulphur Point';
    margin-bottom: 10px;
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