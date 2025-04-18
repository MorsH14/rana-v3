"use client";

import styled from "@emotion/styled";

export const LayoutWrapper = styled.div``;

export const HiddenOnDesktop = styled.div`
  @media screen and (min-width: 769px) {
    display: none;
  }
`;
export const HiddenOnMobile = styled.div`
  @media screen and (max-width: 954px) {
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
