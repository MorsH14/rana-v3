"use client"

import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

export const RoundedBtnWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #6e65659d;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:active {
    background-color: ${COLORS.gray100};
  }
`;
export const Button = styled.button`
  background: white;
  font-size: 10px;
  font-weight: bold;
  color: #464444;
  border-radius: 20px;
  border: none;
  font-family: Inter, sans-serif;

  @media screen and (min-width: 681px) {
    font-size: 14px;
  }
`;
export const IconButtonWrapper = styled.button`
  width: 100%;
  min-width: 100px;
  padding: 10px;
  border-radius: 100px;
  border: none;
  background-color: ${COLORS.NeutralSolid25};
  font-weight: 500;
  cursor: pointer;
   display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
export const PillWrapper = styled.button`
  width: 76px;
  padding: 5px  10px;
  border-radius: 100px;
  border: none;
  background-color: ${COLORS.NeutralSolid25};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ListWrapper = styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`
export const StyledCheckbox = styled.input`
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: black;
`;
export const List = styled.li`
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    font-family: Inter, sans-serif;
    margin-bottom: 10px;
    cursor: pointer;
`