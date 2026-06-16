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
  gap: 40px;
  height: 100%;
`;

interface StyledLinkProp {
  isActive: boolean;
}

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<StyledLinkProp>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ isActive }) => (isActive ? "white" : COLORS.gray200)};
  text-decoration: none;
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${({ isActive }) => (isActive ? COLORS.NeutralSolid0 : "transparent")};
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: white;
    border-bottom-color: rgba(255, 255, 255, 0.35);
  }
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
`;


export const JobFilterMainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  background: ${COLORS.black100};
  color: ${COLORS.white100};
`;
export const AvatarCircle = styled.div<{ bg: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: white;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }
`;

export const UploadImgWrapper = styled.input`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 0.5px solid ${COLORS.gray100};
  cursor: pointer;
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
