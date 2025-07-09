"use client"

import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

export const ExitBtn = styled.div`
  cursor: pointer;
  padding: 2px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    color: ${COLORS.SolidGray300};
  }
`;
