"use client";
import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

export const OnboardingWrapper = styled.div`
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 24px 80px;
`;

export const OnboardingHeader = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 44px;
`;

export const OnboardingLogo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.black100};
`;

export const ProgressDots = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const Dot = styled.div<{ active: boolean; done: boolean }>`
  width: ${({ active }) => (active ? "24px" : "8px")};
  height: 8px;
  border-radius: 100px;
  background: ${({ active, done }) =>
    done ? COLORS.Green100 : active ? COLORS.black100 : COLORS.NeutralSolid50};
  transition: all 0.3s ease;
`;

export const OnboardingContent = styled.div`
  width: 100%;
  max-width: 480px;
`;

export const OnboardingTitle = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  margin-bottom: 8px;
  line-height: 1.3;
`;

export const OnboardingSubtitle = styled.div`
  font-size: 14px;
  color: ${COLORS.SolidGray400};
  margin-bottom: 28px;
  line-height: 1.5;
`;

export const RoleCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 28px;

  @media screen and (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;

export const RoleCard = styled.div<{ selected: boolean }>`
  border: 2px solid ${({ selected }) => (selected ? COLORS.black100 : COLORS.NeutralSolid50)};
  border-radius: 20px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  cursor: pointer;
  background: ${({ selected }) => (selected ? COLORS.NeutralSolid0 : "white")};
  transition: border-color 0.2s, background 0.2s;
`;

export const RoleIconBox = styled.div<{ bg: string }>`
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;

export const RoleLabel = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  line-height: 1.3;
`;

export const RoleSub = styled.div`
  font-size: 12px;
  color: ${COLORS.SolidGray400};
  line-height: 1.4;
`;

export const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
`;

export const CategoryChip = styled.div<{ selected: boolean }>`
  padding: 10px 16px;
  border-radius: 100px;
  border: 1.5px solid ${({ selected }) => (selected ? COLORS.black100 : COLORS.NeutralSolid50)};
  background: ${({ selected }) => (selected ? COLORS.black100 : "white")};
  color: ${({ selected }) => (selected ? "white" : COLORS.NeutralSolidGray900)};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
`;

export const OnboardingButton = styled.button`
  width: 100%;
  height: 56px;
  background: ${COLORS.black100};
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    opacity: 0.85;
  }
`;

export const OnboardingBackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: ${COLORS.SolidGray400};
  padding: 0;
  margin-bottom: 28px;
`;

export const LocationSelect = styled.select`
  width: 100%;
  height: 54px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  padding: 0 16px;
  font-size: 15px;
  color: ${COLORS.NeutralSolidGray900};
  background: white;
  outline: none;
  cursor: pointer;
  appearance: auto;
  margin-bottom: 24px;

  &:focus {
    border-color: ${COLORS.black100};
  }
`;

export const PhotoUploadArea = styled.div`
  width: 100%;
  border: 2px dashed ${COLORS.NeutralSolid50};
  border-radius: 16px;
  padding: 28px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 24px;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${COLORS.SolidGray400};
  }
`;

export const PhotoPreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 16px;
  border: 3px solid ${COLORS.NeutralSolid50};
`;

export const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 0;
`;

export const SuccessIconBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #ecfdf5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
`;

export const SuccessTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  margin-bottom: 12px;
`;

export const SuccessSubtitle = styled.div`
  font-size: 15px;
  color: ${COLORS.SolidGray400};
  line-height: 1.65;
  margin-bottom: 40px;
  max-width: 320px;
`;
