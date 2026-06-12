"use client";
import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

export const AuthPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
`;

export const AuthBrandPanel = styled.div`
  width: 45%;
  background: ${COLORS.black100};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const AuthBrandName = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin-bottom: 48px;
`;

export const AuthBrandTagline = styled.div`
  font-size: 44px;
  font-weight: 700;
  color: white;
  line-height: 1.15;
  margin-bottom: 20px;
`;

export const AuthBrandSub = styled.div`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
`;

export const AuthFormPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px 24px;
  background: white;
`;

export const AuthFormCard = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const AuthMobileLogo = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${COLORS.black100};
  margin-bottom: 36px;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const AuthTitle = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  margin-bottom: 6px;
`;

export const AuthSubtitle = styled.div`
  font-size: 14px;
  color: ${COLORS.SolidGray400};
  margin-bottom: 28px;
  line-height: 1.5;
`;

export const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  overflow: hidden;
  height: 54px;
  margin-bottom: 8px;

  &:focus-within {
    border-color: ${COLORS.black100};
  }
`;

export const PhonePrefix = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  border-right: 1.5px solid ${COLORS.NeutralSolid50};
  height: 100%;
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.NeutralSolidGray900};
  white-space: nowrap;
  background: ${COLORS.NeutralSolid0};
  user-select: none;
`;

export const PhoneInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  height: 100%;
  padding: 0 14px;
  font-size: 16px;
  background: transparent;
  color: ${COLORS.NeutralSolidGray900};

  &::placeholder {
    color: ${COLORS.SolidGray300};
  }
`;

export const AuthInput = styled.input`
  width: 100%;
  height: 54px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  padding: 0 16px;
  font-size: 16px;
  outline: none;
  color: ${COLORS.NeutralSolidGray900};
  background: white;
  box-sizing: border-box;

  &::placeholder {
    color: ${COLORS.SolidGray300};
  }

  &:focus {
    border-color: ${COLORS.black100};
  }
`;

export const AuthInputLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.SolidGray700};
  margin-bottom: 8px;
`;

export const AuthInputGroup = styled.div`
  margin-bottom: 16px;
`;

export const AuthButton = styled.button`
  width: 100%;
  height: 54px;
  background: ${COLORS.black100};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: opacity 0.15s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    opacity: 0.85;
  }
`;

export const AuthDemoHint = styled.div`
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  color: #92400e;
  margin-bottom: 4px;
  text-align: center;
`;

export const AuthError = styled.div`
  font-size: 13px;
  color: ${COLORS.Red500};
  margin-bottom: 8px;
  margin-top: 4px;
`;

export const AuthFooterText = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${COLORS.SolidGray400};
  margin-top: 28px;
`;

export const AuthLink = styled.span`
  color: ${COLORS.black100};
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
`;

export const AuthBackButton = styled.button`
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

export const OTPWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 20px 0 8px;
`;

export const OTPBox = styled.input`
  width: 64px;
  height: 68px;
  border-radius: 14px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  outline: none;
  color: ${COLORS.NeutralSolidGray900};
  background: white;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${COLORS.black100};
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
  }
`;

export const ResendText = styled.div`
  text-align: center;
  font-size: 13px;
  color: ${COLORS.SolidGray400};
  margin-top: 12px;
`;
