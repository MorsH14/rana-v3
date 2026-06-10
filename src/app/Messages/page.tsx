"use client";
import { Box } from "@mui/material";
import { ChatCircleDots } from "@phosphor-icons/react";
import { Font50020, WebBody2MSolidGray400 } from "@/utils/typography";
import { COLORS } from "@/utils/colors.util";

export default function MessagesPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 2,
        textAlign: "center",
        px: 3,
      }}
    >
      <ChatCircleDots size={72} color={COLORS.SolidGray300} weight="thin" />
      <Font50020>Messages</Font50020>
      <WebBody2MSolidGray400>
        Direct messaging between clients and workers is coming soon.
      </WebBody2MSolidGray400>
    </Box>
  );
}
