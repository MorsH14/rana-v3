"use client";

import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const LayoutWrapper = styled.div``;

export const HiddenOnDesktop = styled.div`
  @media screen and (min-width: 769px) {
    display: none;
  }
`;
export const HiddenOnMobile = styled.div`
  @media screen and (max-width: 769px) {
    display: none;
  }
`;
export const HiddenOnSSMobile = styled.div`
  @media screen and (max-width: 568px) {
    display: none;
  }
`;
export const FlexBtw = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const FlexStart = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;
export const FlexEnd = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
`;
export const FlexCenter = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const ATagUnderline = styled(Box)`
  font-family: Inter;
font-weight: 500;
font-size: 14px;
line-height: 150%;
letter-spacing: 0px;
text-align: center;
text-decoration: underline;
text-decoration-style: solid;
text-decoration-offset: 0%;
text-decoration-thickness: 0%;
color: ${COLORS.Blue500};
`;
  