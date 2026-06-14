"use client";

import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

/* ─── page shell ─── */
export const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 24px 16px 80px;
`;

/* ─── hero banner ─── */
export const ProfileHeroBanner = styled.div<{ bg: string }>`
  width: 100%;
  height: 120px;
  border-radius: 20px;
  background: ${({ bg }) => bg};
  position: relative;
  margin-bottom: 56px;
`;

export const ProfileAvatarWrap = styled.div`
  position: absolute;
  bottom: -44px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 4px white, 0 6px 24px rgba(0, 0, 0, 0.12);
`;

export const ProfileAvatarInner = styled.div<{ bg: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: white;
  letter-spacing: -1px;
`;

/* ─── name / info block ─── */
export const ProfileInfo = styled.div`
  text-align: center;
  padding: 0 8px 20px;
`;

export const ProfileNameRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

export const ProfileName = styled.div`
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
`;

export const ProfileMeta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: 5px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: ${COLORS.SolidGray400};
`;

/* ─── action buttons ─── */
export const ProfileActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 0 0 28px;
  flex-wrap: wrap;
`;

export const ProfileActionBtn = styled.button<{
  variant?: "primary" | "outline" | "danger";
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 16px;
  border-radius: 99px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  background: ${({ variant }) =>
    variant === "primary" ? COLORS.NeutralSolidGray900 : "white"};
  color: ${({ variant }) =>
    variant === "primary"
      ? "white"
      : variant === "danger"
      ? COLORS.Red500
      : COLORS.NeutralSolidGray900};
  border: 1.5px solid
    ${({ variant }) =>
      variant === "primary"
        ? "transparent"
        : variant === "danger"
        ? "rgba(247, 98, 65, 0.35)"
        : COLORS.NeutralSolid50};

  &:hover {
    background: ${({ variant }) =>
      variant === "primary"
        ? "#1a1a2e"
        : variant === "danger"
        ? "#fff1f0"
        : COLORS.NeutralSolid25};
  }
`;

/* ─── stats cards ─── */
export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
`;

export const StatCard = styled.div`
  background: white;
  border: 1px solid ${COLORS.NeutralSolid50};
  border-radius: 16px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StatIconBox = styled.div<{ bg: string }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatValue = styled.div`
  font-family: Inter, sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: ${COLORS.SolidGray400};
  margin-top: -4px;
`;

export const BuyCoinBtn = styled.button`
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, #476efb, #6366f1);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 28px;
  transition: opacity 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    opacity: 0.9;
  }
`;

export const SectionLabel = styled.div`
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${COLORS.SolidGray300};
  margin: 8px 0 10px;
  padding: 0 2px;
`;

/* ─── kept for sub-components ─── */
export const VerifiedWrapper = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 100px;
  background-color: ${COLORS.Blue500};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
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
