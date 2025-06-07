"use client";

import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

export const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  min-height: 533px;
  margin: 48px 0;
`;
export const VerifiedWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 100px;
  background-color: ${COLORS.Green100};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
export const AccordionWrapper = styled.div`
  width: 100%;
`;
export const DetailsWrapper = styled.div`
  margin: 12px 0;
  display: grid;
  grid-template-columns: 15% 85%;
  gap: 20px;
`;
export const EditWrapper = styled.div`
  padding: 12px;
  padding-left: 0;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 10px;
`;
