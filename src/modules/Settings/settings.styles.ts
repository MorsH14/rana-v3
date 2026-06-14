"use client";

import styled from "@emotion/styled";
import { COLORS } from "@/utils/colors.util";

export const SettingsWrapper = styled.div`
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 32px 16px 60px;
`;

export const SettingsPageTitle = styled.h1`
  font-family: Inter, sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  margin: 0 0 24px;
`;

/* ─── profile summary card ─── */
export const ProfileSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, #f8f9ff, #f0f4ff);
  border: 1px solid #e0e7ff;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 28px;
`;

export const SettingsAvatarCircle = styled.div<{ bg: string }>`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
  flex-shrink: 0;
`;

export const ProfileSummaryInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ProfileSummaryName = styled.div`
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${COLORS.NeutralSolidGray900};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProfileSummaryRole = styled.div`
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: ${COLORS.SolidGray400};
  margin-top: 2px;
`;

export const EditProfileBtn = styled.button`
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #476efb;
  background: rgba(71, 110, 251, 0.08);
  border: 1.5px solid rgba(71, 110, 251, 0.2);
  border-radius: 99px;
  padding: 7px 16px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;

  &:hover {
    background: rgba(71, 110, 251, 0.14);
  }
`;

export const Section = styled.div`
  margin-bottom: 28px;
`;

export const SectionTitle = styled.div`
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${COLORS.SolidGray300};
  margin-bottom: 8px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Card = styled.div`
  background: white;
  border: 1px solid ${COLORS.NeutralSolid50};
  border-radius: 14px;
  overflow: hidden;
`;

export const SettingRow = styled.div<{ clickable?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16px;
  border-bottom: 1px solid ${COLORS.NeutralSolid50};
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  transition: background 0.12s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ clickable }) =>
      clickable ? COLORS.NeutralSolid25 : "transparent"};
  }
`;

export const RowLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const RowLabel = styled.div`
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.NeutralSolidGray900} !important;
  -webkit-text-fill-color: ${COLORS.NeutralSolidGray900};
`;

export const RowSub = styled.div`
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: ${COLORS.SolidGray400} !important;
  -webkit-text-fill-color: ${COLORS.SolidGray400};
`;

export const RowValue = styled.div`
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: ${COLORS.SolidGray400};
`;

/* ─── toggle switch — active color: indigo ─── */
export const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 26px;
  cursor: pointer;
  flex-shrink: 0;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;

  &:checked + span {
    background: #6366f1;
  }
  &:checked + span::before {
    transform: translateX(18px);
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  inset: 0;
  background: ${COLORS.NeutralSolid50};
  border-radius: 99px;
  transition: background 0.2s;

  &::before {
    content: "";
    position: absolute;
    left: 4px;
    top: 4px;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

/* ─── category chips — selected: indigo ─── */
export const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px 16px 16px;
`;

export const PrefChip = styled.button<{ selected: boolean }>`
  padding: 7px 14px;
  border-radius: 99px;
  border: 1.5px solid
    ${({ selected }) => (selected ? "#6366f1" : COLORS.NeutralSolid50)};
  background: ${({ selected }) =>
    selected ? "rgba(99, 102, 241, 0.08)" : "white"};
  color: ${({ selected }) => (selected ? "#6366f1" : COLORS.SolidGray700)};
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: ${({ selected }) => (selected ? 600 : 500)};
  cursor: pointer;
  transition: all 0.15s;
`;

/* ─── save button — compact, not full-width ─── */
export const SaveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 20px;
  background: ${COLORS.NeutralSolidGray900};
  color: white;
  border: none;
  border-radius: 99px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.85;
  }
`;

export const SavedBadge = styled.span`
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: ${COLORS.Green100};
  font-weight: 500;
`;

export const DangerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16px;
  cursor: pointer;
  border-radius: 14px;
  transition: background 0.12s;

  &:hover {
    background: #fff1f0;
  }
`;

export const DangerLabel = styled.div`
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.Red500};
`;
