"use client";

import React from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
import { SearchWrapper } from "./styles";

type Props = {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
} & Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "onChange"
>;

export default function Search({ value, placeholder, onChange, onClear, ...props }: Props) {
  return (
    <SearchWrapper>
      <MagnifyingGlass
        size={18}
        weight="bold"
        color="#9ca3af"
        style={{ flexShrink: 0 }}
      />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
        style={{
          border: "none",
          width: "100%",
          height: "100%",
          fontSize: "14px",
          padding: "0 8px",
          background: "inherit",
          outline: "none",
          fontFamily: "Inter, sans-serif",
          color: "#0d0d12",
        }}
      />
      {value && value.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          style={{
            background: "#f3f4f6",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            padding: 0,
            width: 22,
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "#6b7280",
          }}
        >
          <X size={12} weight="bold" />
        </button>
      )}
    </SearchWrapper>
  );
}
