"use client";

import { TextWeb28Gray900, WebCaption1MBlue500 } from "@/utils/typography";
import { Box, Drawer } from "@mui/material";
import React from "react";
import { ExitBtn } from "./drawer.styles";
import { X } from "@phosphor-icons/react/dist/ssr";

interface DrawerProps {
  children: React.ReactNode;
  label: React.ReactNode;
  headerText?: string;
}

export default function DrawerBasic({ children, label, headerText }: DrawerProps) {
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
          // onKeyDown={toggleDrawer(false)}
        >
          <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" mb={'20px'}>
                <TextWeb28Gray900>{headerText}</TextWeb28Gray900>
                <ExitBtn  onClick={toggleDrawer(false)}>
                <TextWeb28Gray900>
                  <X size={26} />
                </TextWeb28Gray900>
                </ExitBtn>
              </Box>
          {children}
        </Box>
      </Drawer>
    </Box>
  );
}