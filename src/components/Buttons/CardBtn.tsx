"use client";

import styled from "@emotion/styled";

const StyledBtn = styled.button`
  background: #0d0d12;
  color: white;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 12px;
  padding: 8px 18px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
  white-space: nowrap;

  &:hover {
    opacity: 0.85;
  }

  @media screen and (max-width: 560px) {
    font-size: 11px;
    padding: 6px 14px;
  }
`;

type CardBtnProps = {
  label: string;
  onClick?: () => void;
};

export default function CardBtn({ label, onClick }: CardBtnProps) {
  return <StyledBtn onClick={onClick}>{label}</StyledBtn>;
}
