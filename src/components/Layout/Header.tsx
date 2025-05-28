"use client";

import Link from "next/link";
import {
  ATags,
  Logo,
  HeaderContainer,
  NavImgSettings,
  HeaderLocation,
  StyledLink,
} from "./styles";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import RoundedBtn from "../Buttons/RoundedBtn";
import Badge from "../Badge/badge";
import { HiddenOnMobile } from "@/styles/globals.styles";
import { HeaderLink } from "@/utils/constants";


export default function Header() {


  return (
    <>
      <HiddenOnMobile>
        <HeaderContainer>
          <Link href="/">
            <Logo>Rana</Logo>
          </Link>

          <ATags>
            {HeaderLink.map((item, index) => (
              <StyledLink
                key={index}
                href={item.route}
              >
                {item.label}
              </StyledLink>
            ))}
          </ATags>
          <HeaderLocation>
            <MapPin size={16} weight="thin" /> Ilorin, Kwara State
          </HeaderLocation>
          <NavImgSettings>
            <Link href="/profile">
              <Badge badgeContent={5} imageSrc="" />
            </Link>
            <Link href="/settings">
              <RoundedBtn icon="GearSix" />
            </Link>
            <RoundedBtn icon="Bell" />
          </NavImgSettings>
        </HeaderContainer>
      </HiddenOnMobile>
    </>
  );
}
