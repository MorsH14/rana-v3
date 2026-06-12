"use client";
import { HiddenOnDesktop } from "@/styles/globals.styles";
import { FooterWrapper } from "./styles";
import Link from "next/link";
import { FooterLink } from "@/utils/constants";
import * as PhosphorIcons from "@phosphor-icons/react";
import { IconProps } from "@phosphor-icons/react";
import { Box } from "@mui/material";
import { Font50016 } from "@/utils/typography";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <HiddenOnDesktop>
      <FooterWrapper>
        {FooterLink.map((item, index) => {
          const IconComponent =
            item.icon && item.icon in PhosphorIcons
              ? (PhosphorIcons[item.icon as keyof typeof PhosphorIcons] as React.FC<IconProps>)
              : null;
          const isActive = pathname === item.route;

          return (
            <Link href={item.route} key={index} style={{ textDecoration: "none" }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ opacity: isActive ? 1 : 0.45, transition: "opacity 0.15s" }}
              >
                {IconComponent && (
                  <IconComponent size={22} weight={isActive ? "fill" : "regular"} />
                )}
                <Font50016 style={{ fontSize: 10, marginTop: 2 }}>{item.label}</Font50016>
              </Box>
            </Link>
          );
        })}
      </FooterWrapper>
    </HiddenOnDesktop>
  );
}
