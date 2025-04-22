import { HiddenOnDesktop } from "@/styles/globals.styles";
import { FooterWrapper } from "./styles";
import Link from "next/link";
import { FooterLink } from "@/utils/constants";
import * as PhosphorIcons from "@phosphor-icons/react";
import { IconProps } from "@phosphor-icons/react";
import { Box } from "@mui/material";
import { Font50016 } from "@/utils/typography";

export default function Footer() {
  return (
    <HiddenOnDesktop>
      <FooterWrapper>
        {FooterLink.map((item, index) => {
          const IconComponent =
            item.icon && item.icon in PhosphorIcons
              ? (PhosphorIcons[item.icon as keyof typeof PhosphorIcons] as React.FC<IconProps>)
              : null;

          return (
            <Link
              href={item.route}
              key={index}
            >
             <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
             {IconComponent && <IconComponent size={22} />}
             <Font50016>{item.label}</Font50016>
             </Box>
            </Link>
          );
        })}
      </FooterWrapper>
    </HiddenOnDesktop>
  );
}
