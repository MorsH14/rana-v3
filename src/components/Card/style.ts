"use client";

import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

export const JobFilterWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 20px 10px;
    gap: 16px;
    flex-wrap: wrap;
`;

export const JobCardWrapper = styled.div`
    width: 100%;
    height: 305px;
    border: 0.5px solid #49444439;
    border-radius: 20px;
    padding: 10px;
    flex-wrap: wrap;

    @media screen and (min-width: 400px) {
        width: calc(50% - 16px);
    }

    @media screen and (min-width: 350px) and (max-width: 420px) {
        width: calc(50% - 10px);
    }
    @media screen and (min-width: 770px) {
        height: 355px;
    }

    @media screen and (min-width: 1139px)  {
        width: calc(33.33% - 16px);
        height: 355px;
    }
`;

export const CardDetailsWrapper = styled.div<{ bgColor: string }>`
  flex-wrap: wrap;
  width: 100%;
  height: 80%;
  padding: 10px;
  background: ${({ bgColor }) => bgColor};
  border-radius: 15px;
  overflow: hidden;
`;

export const JobWrapperContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
`;


export const Price = styled.div`
    font-size: 12px;
    font-weight: bold;
    

    @media screen and (min-width: 681px) {
        font-size: 18px;
    }

    @media screen and (min-width: 1139px) {
        font-size: 20px;
    }
    @media screen and (min-width: 350px) and (max-width: 400px) {
        font-size: 10px;
    }
`;

export const Location = styled.div`
    font-size: 10px;
    font-weight: bold;
    
    color: #413939e8;

    @media screen and (min-width: 681px) {
        font-size: 16px;
    }
    @media screen and (min-width: 350px) and (max-width: 400px) {
        font-size: 10px;
    }
`;

export const CompanyAvatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.82);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Inter, sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.72);
    flex-shrink: 0;
    letter-spacing: -0.5px;

    @media screen and (max-width: 560px) {
        width: 36px;
        height: 36px;
        font-size: 12px;
    }
`;

export const ChipsWrapper = styled.div`
    width: 100%;
    max-height: 70px;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    margin: 15px 0;
`;

export const JobChip = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 5px;
    font-size: 10px;
    border-radius: 100px;
    border: 0.5px solid black;
    width: max-content;

    @media screen and (min-width: 681px) {
        padding: 5px 10px;
    }
`;

export const JobDetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;

`;

export const JobDetailsText = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px 0;
`;
export const RadiusBtn = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${COLORS.white100};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:active{
        background-color: ${COLORS.gray300};
    }
`;

export const JobProfileContainer = styled.div`
    margin: 50px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    width: 90%;
    
    @media screen and (max-width:790px){
        width: 90%;
    }
`

export const JobProfileHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 30px;
`

export const JobProfileContainerList = styled.div`
    display: flex;
    gap: 10px;
    overflow-x: auto; /* Ensure auto-scrolling is enabled */
    width: 100%;
    width: 100%; /* Ensure there's enough content for scrolling */

    &::-webkit-scrollbar {
        display: none; /* Hides scrollbar for webkit-based browsers (Chrome, Safari) */
    }

    -ms-overflow-style: none;  /* Hide scrollbar for Internet Explorer and Edge */
    scrollbar-width: none;  /* Hide scrollbar for Firefox */
`

export const JobProfileList = styled.div`
    width: 330px;
    height: 330px;
    border-radius: 30px;
    color: ${COLORS.white100};
    padding: 20px;
    margin: 10px 0;
    flex-shrink: 0; /* Prevent shrinking */

    @media screen and (max-width:790px){
        width: 250px;
    }
`

export const JobListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
    flex-wrap: wrap;
`

export const JobLogo = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #615a5a45;
`

export const SkillSet = styled.div`
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    height: 50px ;
    overflow: hidden;
    margin-bottom: 10px;

    @media screen and (max-width:790px){
        height: 25px;
        overflow: hidden;
    }
    
`

export const Skill = styled.div`
    background: #615a5a45;
    border-radius: 20px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    white-space: nowrap; /* Prevent text from wrapping */
    min-width: 60px; /* Ensure minimum width to avoid shrinking */
`
export const CreateItemWrapper = styled.div`
  min-height: 387px;
  width: 100%;
  border-radius: 20px;
  padding-top: 120px;
  padding-right: 60px;
  padding-bottom: 120px;
  padding-left: 60px;
  background-color: ${COLORS.gray200};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 22px;
  text-align: center;
`;