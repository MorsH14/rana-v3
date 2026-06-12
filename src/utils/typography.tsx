"use client";

import styled from "@emotion/styled";
import { COLORS } from "./colors.util";

export const WebHeadingH4 = styled.span`
  font-family: Inter;
font-weight: 400;
font-size: 25px;
line-height: 100%;
letter-spacing: -2%;
text-align: center;
`;
export const TextWeb28 = styled.span`
  font-family: Inter;
font-weight: 400;
font-size: 28px;
line-height: 100%;
letter-spacing: -2%;
`;


export const WebCaption1M = styled.span`
  font-family: Inter;
font-weight: 500;
font-size: 14px;
line-height: 150%;
letter-spacing: 0px;
text-align: center;
`;

export const WebBody2M = styled.span`
  font-family: Inter;
font-weight: 500;
font-size: 14px;
line-height: 150%;
letter-spacing: 0px;
text-align: center;
`;
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


export const MobileB1M = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0px;
`;
export const WebBody2B = styled.span`
 font-family: Inter;
font-weight: 700;
font-size: 16px;
line-height: 150%;
letter-spacing: 0px;

`;
export const WebCC2 = styled.span`
 font-family: Inter;
font-weight: 500;
font-size: 12px;
line-height: 150%;
letter-spacing: 0px;

`;
export const MoobileBody21SM = styled.span`
font-family: Inter;
font-weight: 600;
font-size: 13px;
line-height: 150%;
letter-spacing: 0px;
text-align: center;

`;
export const MoobileBodyUnderline = styled.span`
font-family: Inter;
font-weight: 500;
font-size: 13px;
line-height: 150%;
letter-spacing: 0px;
text-align: center;
color: #808897;
text-decoration: none;
cursor: pointer;
padding: 4px 8px;
border-radius: 6px;
transition: color 0.15s, background 0.15s;
&:hover {
  color: #F76241;
  background: #fff1f0;
}
`;




export const WebHeadingH4Gray900 = styled(WebHeadingH4)`
  color: ${COLORS.NeutralSolidGray900};
`;
export const WebBody2MSolidGray400 = styled(WebBody2M)`
  color: ${COLORS.SolidGray400};
`;
export const WebCaption1MSolid300 = styled(WebCaption1M)`
  color: ${COLORS.SolidGray300};
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
export const MobileB1MGray700 = styled(MobileB1M)`
  color: ${COLORS.gray100};
`;
export const WebBody2BGray300 = styled(WebBody2B)`
  color: ${COLORS.SolidGray300};
`;
export const WebBody2MNeutral900 = styled(WebBody2M)`
  color: ${COLORS.NeutralSolidGray900};
`;
export const WebCC2Gray300 = styled(WebCC2)`
  color: ${COLORS.SolidGray300};
`;
export const WebCC2Gray700 = styled(WebCC2)`
  color: ${COLORS.SolidGray700};
`;
export const MoobileBody21SMBlue50 = styled(MoobileBody21SM)`
  color: ${COLORS.Blue500};
`;
export const MoobileBody21SMRed500 = styled(MoobileBody21SM)`
  color: ${COLORS.Red500};
`;
export const WebCaption1MBlue500 = styled(WebCaption1M)`
  color: ${COLORS.Blue500};
`;
export const TextWeb28Gray900 = styled(TextWeb28)`
  color: ${COLORS.gray900};
`;
export const WebCaption1MBlueNormal = styled(WebCaption1M)`
  color: ${COLORS.blueNormal};
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