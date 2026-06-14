"use client";

import React, { useState } from "react";
import TextField from "@/components/Inputs/TextField";
import styled from "@emotion/styled";
import { COLORS } from "@/utils/colors.util";
import { Stack } from "@mui/material";

const SaveBtn = styled.button`
  width: 100%;
  height: 50px;
  background: ${COLORS.NeutralSolidGray900};
  color: white;
  border: none;
  border-radius: 12px;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }
`;

interface FilterItem {
  title: string;
  location: string;
  distance: string;
  price: string;
}

interface JobListEditProps {
  filter?: FilterItem;
  onSave?: (filter: FilterItem) => void;
}

export default function JobListEdit({ filter, onSave }: JobListEditProps) {
  const [localFilter, setLocalFilter] = useState<FilterItem>(
    filter || { title: "", location: "", distance: "", price: "" }
  );

  const handleChange = (field: keyof FilterItem, value: string) => {
    setLocalFilter((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Stack spacing={2} sx={{ p: 0 }}>
      <TextField
        label="Job Title"
        placeholder="e.g. Designer"
        value={localFilter.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("title", e.target.value)}
      />
      <TextField
        label="Location"
        placeholder="e.g. Lagos"
        value={localFilter.location}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("location", e.target.value)}
      />
      <TextField
        label="Distance"
        placeholder="e.g. 10km"
        value={localFilter.distance}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("distance", e.target.value)}
      />
      <TextField
        label="Price Range"
        placeholder="e.g. ₦10,000 – ₦50,000"
        value={localFilter.price}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("price", e.target.value)}
      />

      <SaveBtn type="button" onClick={() => onSave && onSave(localFilter)}>
        Save filter
      </SaveBtn>
    </Stack>
  );
}
