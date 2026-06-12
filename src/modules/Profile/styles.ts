"use client";

import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

export const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  min-height: 533px;
  margin: 48px 0;
  padding: 0 16px;

  @media screen and (max-width: 768px) {
    margin: 24px 0;
  }
`;
export const VerifiedWrapper = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 100px;
  background-color: ${COLORS.Blue500};
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
export const DrawerProfileWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 23px;
  margin-bottom: 23px;
`;
