"use client";

import styled from "@emotion/styled";
import { COLORS } from "./colors.util";


export const Font10016 = styled.span`
  font-size: 16px;
`;
export const Font50016 = styled.span`
  font-weight: 500;
  font-size: 16px;
`;
export const Font50020 = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 40px;
`;
export const Font50030 = styled.span`
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
`;
export const Font70016 = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 40px;
`;
export const Font70022 = styled.span`
  font-weight: 700;
  font-size: 22px;
  line-height: 40px;
`;
export const Font70032 = styled.span`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
`;
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
`;
export const MobileH4SM = styled.span`
  font-size: 13px;
  line-height: 20px;
`;




export const Font10016Gray100 = styled(Font10016)`
  color: ${COLORS.gray100};
`;
export const MobileH4MGray100 = styled(MobileH4M)`
  color: ${COLORS.gray100};
`;
export const MobileRS500black200 = styled.div`
    color: ${COLORS.black200};
`;
export const Font50016Blue100 = styled.div`
    color: ${COLORS.blue100};
`;



export const MobileRS500 = styled.div`
    font-size: 13px;
    font-weight: bold;
    width: 70%;

    @media screen and (min-width: 681px) {
        font-size: 22px;
    }

    @media screen and (min-width: 1139px) {
        font-size: 22px;
    }
`;
export const MobileLightRS12 = styled.span`
  font-size: 12px;
  
  @media screen and (max-width: 520px){
    font-size: 10px;
  }
`;

export const Mobile500RS16 = styled.span`
  font-size: 16px;
  font-weight: bold;
  
  @media screen and (max-width: 520px){
    font-size: 10px;
  }
`;
export const MobilePM = styled.span`
  font-size: 14px;
  line-height: 20px;
  
  @media screen and (max-width: 1160px){
    font-size: 12px;
  }
`;

export const FontRR500 = styled(MobileRS500black200)`
  color: ${COLORS.black100};

  @media screen and (max-width: 443px){
    font-size: 12px;
  }
`;