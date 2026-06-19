"use client";
import { HiddenOnDesktop } from "@/styles/globals.styles";
import { FooterWrapper } from "./styles";
import Link from "next/link";
import { WorkerFooterLink, ClientFooterLink } from "@/utils/constants";
import * as PhosphorIcons from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
import { Box } from "@mui/material";
import { Font50016 } from "@/utils/typography";
import { usePathname } from "next/navigation";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import { initialUserData } from "@/db";
import styled from "@emotion/styled";

const NavBadge = styled.div`
  position: absolute;
  top: -3px;
  right: -5px;
  min-width: 16px;
  height: 16px;
  border-radius: 99px;
  background: #4cabeb;
  color: white;
  font-family: Inter, sans-serif;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 1.5px solid black;
`;

export default function Footer() {
  const pathname = usePathname();
  const [user] = useLocalStorage("rana-user-profile", initialUserData);
  const [notifs] = useLocalStorage<Array<{ read: boolean }>>("rana-notifications", []);
  const unreadCount = notifs.filter((n) => !n.read).length;
  const navLinks = user.accountType === "client" ? ClientFooterLink : WorkerFooterLink;

  return (
    <HiddenOnDesktop>
      <FooterWrapper>
        {navLinks.map((item, index) => {
          const IconComponent =
            item.icon && item.icon in PhosphorIcons
              ? (PhosphorIcons[item.icon as keyof typeof PhosphorIcons] as React.FC<IconProps>)
              : null;
          const isActive = pathname === item.route;
          const showBadge = item.route === "/notification" && unreadCount > 0;

          return (
            <Link href={item.route} key={index} style={{ textDecoration: "none" }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ opacity: isActive ? 1 : 0.45, transition: "opacity 0.15s" }}
              >
                <Box position="relative" display="inline-flex">
                  {IconComponent && (
                    <IconComponent size={22} weight={isActive ? "fill" : "regular"} />
                  )}
                  {showBadge && (
                    <NavBadge>{unreadCount > 9 ? "9+" : unreadCount}</NavBadge>
                  )}
                </Box>
                <Font50016 style={{ fontSize: 10, marginTop: 2 }}>{item.label}</Font50016>
              </Box>
            </Link>
          );
        })}
      </FooterWrapper>
    </HiddenOnDesktop>
  );
}
