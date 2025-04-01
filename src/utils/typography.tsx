"use client";

import styled from "@emotion/styled";
import { COLORS } from "./colors.util";


export const MobileH3M = styled.span`
  font-weight: 700;
  font-size: 25px;
  line-height: 40px;

  @media screen and (max-width: 1160px){
    font-size: 18px;
    line-height: 30px;
  }
`;
export const MobileH3SM = styled.span`
  font-weight: 700;
  font-size: 26px;
  line-height: 40px;

  @media screen and (max-width: 1160px){
    font-size: 18px;
  }
`;
export const MobileH4M = styled.span`
  font-size: 16px;
  line-height: 20px;
  color: ${COLORS.gray100};
`;
export const MobileH4SM = styled.span`
  font-size: 13px;
  line-height: 20px;
`;
export const MobilePM = styled.span`
  font-size: 14px;
  line-height: 20px;
  
  @media screen and (max-width: 1160px){
    font-size: 12px;
  }
`;
export const MediumText = styled.span`
  font-size: 16px;
  font-weight: bold;
  
  @media screen and (max-width: 520px){
    font-size: 10px;
  }
`;
export const SmallText = styled.span`
  font-size: 12px;
  
  @media screen and (max-width: 520px){
    font-size: 10px;
  }
`;