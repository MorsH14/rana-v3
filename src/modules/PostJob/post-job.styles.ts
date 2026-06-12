"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { COLORS } from "@/utils/colors.util";

export const PostJobWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 0 24px 40px;
  max-width: 520px;
  margin: 0 auto;
  width: 100%;
`;

export const PostJobHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0 20px;
`;

export const PostJobLogo = styled.div`
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
`;

export const CloseButton = styled.button`
  background: ${COLORS.NeutralSolid50};
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.SolidGray700};
  transition: background 0.15s;

  &:hover {
    background: ${COLORS.NeutralSolid600};
    color: white;
  }
`;

export const ProgressBar = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 32px;
`;

export const ProgressSegment = styled.div<{ active: boolean; done: boolean }>`
  height: 4px;
  flex: 1;
  border-radius: 99px;
  background: ${({ active, done }) =>
    done || active ? COLORS.NeutralSolidGray900 : COLORS.NeutralSolid50};
  transition: background 0.3s;
`;

export const StepTitle = styled.h2`
  font-family: Inter, sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  margin: 0 0 6px;
`;

export const StepSubtitle = styled.p`
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: ${COLORS.SolidGray400};
  margin: 0 0 28px;
  line-height: 1.5;
`;

export const FieldLabel = styled.label`
  display: block;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.SolidGray700};
  margin-bottom: 8px;
`;

export const FieldGroup = styled.div`
  margin-bottom: 20px;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 54px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  padding: 0 16px;
  font-family: Inter, sans-serif;
  font-size: 15px;
  color: ${COLORS.NeutralSolidGray900};
  background: white;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.15s;

  &::placeholder {
    color: ${COLORS.SolidGray300};
  }

  &:focus {
    border-color: ${COLORS.NeutralSolidGray900};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 130px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  padding: 14px 16px;
  font-family: Inter, sans-serif;
  font-size: 15px;
  color: ${COLORS.NeutralSolidGray900};
  background: white;
  box-sizing: border-box;
  outline: none;
  resize: vertical;
  line-height: 1.5;
  transition: border-color 0.15s;

  &::placeholder {
    color: ${COLORS.SolidGray300};
  }

  &:focus {
    border-color: ${COLORS.NeutralSolidGray900};
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CategoryCard = styled.button<{ selected: boolean }>`
  padding: 14px 10px;
  border-radius: 12px;
  border: 1.5px solid
    ${({ selected }) => (selected ? COLORS.NeutralSolidGray900 : COLORS.NeutralSolid50)};
  background: ${({ selected }) => (selected ? COLORS.NeutralSolidGray900 : "white")};
  color: ${({ selected }) => (selected ? "white" : COLORS.NeutralSolidGray900)};
  cursor: pointer;
  text-align: center;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  span {
    font-family: Inter, sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;
  }
`;

export const TagsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TagChip = styled.button<{ selected: boolean }>`
  padding: 8px 14px;
  border-radius: 99px;
  border: 1.5px solid
    ${({ selected }) => (selected ? COLORS.NeutralSolidGray900 : COLORS.NeutralSolid50)};
  background: ${({ selected }) => (selected ? COLORS.NeutralSolidGray900 : "white")};
  color: ${({ selected }) => (selected ? "white" : COLORS.SolidGray700)};
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
`;

export const RateRow = styled.div`
  display: flex;
  gap: 10px;
`;

export const NairaPrefix = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  overflow: hidden;
  height: 54px;
  flex: 1;

  &:focus-within {
    border-color: ${COLORS.NeutralSolidGray900};
  }
`;

export const NairaSymbol = styled.div`
  padding: 0 12px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.SolidGray700};
  background: ${COLORS.NeutralSolid0};
  border-right: 1.5px solid ${COLORS.NeutralSolid50};
  height: 100%;
  display: flex;
  align-items: center;
  user-select: none;
`;

export const AmountInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  padding: 0 12px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  color: ${COLORS.NeutralSolidGray900};
  background: transparent;
  min-width: 0;

  &::placeholder {
    color: ${COLORS.SolidGray300};
  }
`;

export const UnitSelect = styled.select`
  height: 54px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  padding: 0 12px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: ${COLORS.NeutralSolidGray900};
  background: white;
  outline: none;
  cursor: pointer;
  min-width: 110px;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23808897'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 30px;

  &:focus {
    border-color: ${COLORS.NeutralSolidGray900};
  }
`;

export const StateSelect = styled.select`
  width: 100%;
  height: 54px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  padding: 0 16px;
  font-family: Inter, sans-serif;
  font-size: 15px;
  color: ${COLORS.NeutralSolidGray900};
  background: white;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23808897'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 36px;
  box-sizing: border-box;

  &:focus {
    border-color: ${COLORS.NeutralSolidGray900};
  }
`;

export const NavRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 32px;
`;

export const BackBtn = styled.button`
  height: 54px;
  padding: 0 20px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  background: white;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${COLORS.SolidGray700};
  cursor: pointer;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: ${COLORS.NeutralSolid25};
  }
`;

export const ContinueBtn = styled.button`
  flex: 1;
  height: 54px;
  background: ${COLORS.NeutralSolidGray900};
  color: white;
  border: none;
  border-radius: 12px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

const popIn = keyframes`
  from { transform: scale(0.6); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
`;

export const SuccessWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 0;
`;

export const SuccessIconBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${COLORS.NeutralSolidGray900};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  animation: ${popIn} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
`;

export const SuccessTitle = styled.h2`
  font-family: Inter, sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  margin: 0 0 10px;
`;

export const SuccessSubtitle = styled.p`
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: ${COLORS.SolidGray400};
  margin: 0 0 36px;
  line-height: 1.6;
  max-width: 280px;
`;

export const PreviewLabel = styled.div`
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${COLORS.SolidGray300};
  margin-bottom: 12px;
  align-self: flex-start;
`;
