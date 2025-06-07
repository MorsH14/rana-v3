"use client"

import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

export const JobInfoWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  border-radius: 12px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  margin: 48px auto;
  box-sizing: border-box;
`;
export const JobWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
`;

 
export const JobLeft = styled.div`
  width: 50%;
  background-color: ${COLORS.NeutralSolid0};
  display: flex;
  align-items: center;
  padding-left: 24px;
`;

export const JobRight = styled.div`
  width: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 24px;
`;
export const RowDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${COLORS.NeutralSolid50};
`;

