"use client"

import Link from "next/link";
import {
  ATags,
  Logo,
  HeaderContainer,
  NavImgSettings,
  HeaderLocation,
} from "./styles";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import RoundedBtn from "../Buttons/RoundedBtn";
import Badge from "../Badge/badge";
import { HiddenOnDesktop, HiddenOnMobile } from "@/styles/globals.styles";
import { Box } from "@mui/material";
import Search from "../Inputs/Search";
import { COLORS } from "@/utils/colors.util";
import { InputSearch } from "@/utils/constants";


export default function Header() {
  return (
    <>
      <HiddenOnMobile>
        <HeaderContainer>
          <Link href="/">
            <Logo>
              {/* <Parallelogram color="white" size={22} weight="fill" /> */}
              RanaJob
            </Logo>
          </Link>
          <ATags>
            {InputSearch.map((item, index) => (
              <Link key={index} href={item.route}>
                {item.label}
              </Link>
            ))}
          </ATags>
          <HeaderLocation>
            <MapPin size={16} weight="thin" /> New York, NY
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

      <HiddenOnDesktop>
        <Box p={'10px'} bgcolor={COLORS.black100}>
          <Search
            value=''
            onChange={(e) => {
              console.log(e.target.value);
            }}
            placeholder="Search for Jobs"
          />
        </Box>
      </HiddenOnDesktop>
    </>
  );
}
