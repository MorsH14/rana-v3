"use client";

import { Badge as UserBadge } from "@mui/material";
import React from "react";

interface BadgeProps {
  badgeContent?: number | string; // Badge number or text
  children: React.ReactNode; // ✅ Icon element (e.g. <RoundedBtn icon="Bell" />)
}

export default function Badge({ badgeContent = "", children }: BadgeProps) {
  return (
    <UserBadge
      color="secondary"
      badgeContent={badgeContent}
      sx={{
        "& .MuiBadge-badge": {
          fontSize: "8px",
          height: "12px",
          minWidth: "12px",
          padding: "4px",
          transform: "translate(25%, -25%)",
          background: "#4cabeb",
        },
      }}
    >
      {children}
    </UserBadge>
  );
}
