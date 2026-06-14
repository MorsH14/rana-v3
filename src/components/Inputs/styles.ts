"use client"

import styled from "@emotion/styled";

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  height: 44px;
  gap: 5px;
  width: 100%;
  border-radius: 10px;
  padding: 0 12px;

  @media screen and (max-width: 769px) {
    height: 46px;
    border-radius: 12px;
  }
`
export const NameInputWrapper = styled.div`
  gap: 10px;
  margin-bottom: 20px;
`