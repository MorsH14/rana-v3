"use client";

import styled from "@emotion/styled";
import { COLORS } from "@/utils/colors.util";

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  padding: 0 14px;
  font-family: Inter, sans-serif;
  font-size: 15px;
  color: ${COLORS.NeutralSolidGray900};
  background: white;
  box-sizing: border-box;
  transition: border-color 0.15s;

  &::placeholder {
    color: ${COLORS.SolidGray300};
  }

  &:focus {
    border-color: ${COLORS.NeutralSolidGray900};
  }

  &:disabled {
    background: ${COLORS.NeutralSolid0};
    color: ${COLORS.SolidGray400};
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  display: block;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${COLORS.SolidGray700};
  margin-bottom: 6px;
  letter-spacing: 0.02em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface TextFieldProps {
  label: React.ReactNode;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
}

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  disabled,
}: TextFieldProps) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </Wrapper>
  );
}
