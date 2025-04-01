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
    height: 280px;
    border: 0.5px solid #49444439;
    border-radius: 20px;
    padding: 10px;
    flex-wrap: wrap;

    @media screen and (min-width: 400px) {
        width: calc(50% - 16px); 
    }

    @media screen and (min-width: 350px) and (max-width: 420px) {
        width: calc(50% - 10px); 
        /* width: 100px; */
    }
    @media screen and (min-width: 770px) {
        height: 330px;
    }

    @media screen and (min-width: 1139px)  {
        width: calc(33.33% - 16px); 
        height: 330px;
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

export const CardName = styled.div`
    font-size: 12px;
    font-weight: bold;
    margin: 10px 0;

    @media screen and (min-width: 681px) {
        font-size: 14px;
        margin-top: 15px;
    }

    @media screen and (min-width: 1139px) {
        font-size: 16px;
    }
`;

export const CardTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #1b1818dd;
    width: 200px;

    @media screen and (min-width: 681px) {
        font-size: 22px;
    }

    @media screen and (min-width: 1139px) {
        font-size: 22px;
    }
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

export const JobLogoWrapper = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media screen and (min-width: 737px) {
        width: 50px; 
        height: 50px;
    }
`;

export const ChipsWrapper = styled.div`
    width: 100%;
    max-height: 50px;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
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
