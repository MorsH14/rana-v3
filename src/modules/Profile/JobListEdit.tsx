"use client";

import React, { useState } from "react";
import TextField from "@/components/Inputs/TextField";
import { Button, Stack } from "@mui/material";

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
    <Stack spacing={2} sx={{ p: 2 }}>
      <TextField
        label="Job Title"
        placeholder="e.g. Designer"
        value={localFilter.title}
        onChange={(e: any) => handleChange("title", e.target.value)}
      />
      <TextField
        label="Location"
        placeholder="e.g. Lagos"
        value={localFilter.location}
        onChange={(e: any) => handleChange("location", e.target.value)}
      />
      <TextField
        label="Distance"
        placeholder="e.g. 10km"
        value={localFilter.distance}
        onChange={(e: any) => handleChange("distance", e.target.value)}
      />
      <TextField
        label="Price Range"
        placeholder="e.g. $100-$200"
        value={localFilter.price}
        onChange={(e: any) => handleChange("price", e.target.value)}
      />

      <Button
        variant="contained"
        onClick={() => onSave && onSave(localFilter)}
        fullWidth
      >
        Save Filter
      </Button>
    </Stack>
  );
}
