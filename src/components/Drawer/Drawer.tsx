"use client";

import { WebCaption1MBlue500 } from "@/utils/typography";
import { Box, Drawer } from "@mui/material";
import React from "react";

interface DrawerProps {
  children: React.ReactNode;
  label: React.ReactNode;
}

export default function DrawerBasic({ children, label }: DrawerProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (inOpen: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(inOpen);
    };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ cursor: "pointer" }}>
        <WebCaption1MBlue500 onClick={toggleDrawer(true)}>
          {label}
        </WebCaption1MBlue500>
      </Box>
      <Drawer  anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          sx={{ minWidth: 471, p: '48px' }}
          // onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
        >
          {children}
        </Box>
      </Drawer>
    </Box>
  );
}