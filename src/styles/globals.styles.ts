"use client";

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
export const FlexCenter = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
