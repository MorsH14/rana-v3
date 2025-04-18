"use client"

import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";
import Link from "next/link";

export const HeaderContainer = styled.div`
  background: ${COLORS.black100};
  color: ${COLORS.gray200};
  display: flex;
  justify-content:  space-around;
  align-items: center;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 20484;
  width: 100%;
  gap: 20px;
  border-bottom: 1px solid ${COLORS.gray100};
  padding-left: 20px;
`;

export const Logo = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${COLORS.gray200};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const ATags = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
`;

export const StyledLink = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.gray200};
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom:  2px solid ${COLORS.gray200};
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const HeaderLocation = styled.div`
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: 180px;
`;

export const NavImgSettings = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  width: 150px;
`;

export const MainSelectWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin: 10px;
  overflow-x: scroll;
  padding: 10px 0;
`;
export const SelectWrapper = styled.div`
  width: max-content;
`;
export const SortWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* margin: 0 10px; */
`;


export const JobFilterMainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  background: ${COLORS.black100};
  color: ${COLORS.white100};
`;

export const PriceRangeText = styled.div`
  font-size: 16px;

  @media screen and (max-width: 1443px) {
    font-size: 15px;
  }
  @media screen and (max-width: 1337px) {
    font-size: 14px;
  }
  @media screen and (max-width: 1191px) {
    font-size: 12px;
  }
  @media screen and (max-width: 1077px) {
    font-size: 10px;
  }
  @media screen and (max-width: 805px) {
    font-size: 8px;
  }
`;
