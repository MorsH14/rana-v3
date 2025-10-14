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
import { MapPin, User } from "@phosphor-icons/react/dist/ssr";
import RoundedBtn from "../Buttons/RoundedBtn";
import Badge from "../Badge/badge";
import { HiddenOnMobile } from "@/styles/globals.styles";
import { HeaderLink } from "@/utils/constants";

interface UserProfile {
  name: string;
  location: string;
  profileImage: string;
  notifications: number;
  role?: string;
}

interface HeaderProps {
  user: UserProfile;
}

export default function Header({ user }: HeaderProps) {
  return (
    <HiddenOnMobile>
      <HeaderContainer>
        {/* Logo */}
        <Link href="/">
          <Logo>Rana</Logo>
        </Link>

        {/* Navigation Links */}
        <ATags>
          {HeaderLink.map((item, index) => (
            <StyledLink key={index} href={item.route}>
              {item.label}
            </StyledLink>
          ))}
        </ATags>

        {/* Location */}
        <HeaderLocation>
          <MapPin size={16} weight="thin" /> {user.location}
        </HeaderLocation>

        {/* User and Actions */}
        <NavImgSettings>
          {/* User Avatar Badge */}
          <Link href="/profile">
            {user.profileImage ? (<img src={user.profileImage} alt="User Avatar" />)
            :<User size={35} color="gray" />}
          </Link>

          {/* Settings Button */}
          <Link href="/settings">
            <RoundedBtn icon="GearSix" />
          </Link>

          {/* Notification Bell wrapped inside Badge */}
          <Badge badgeContent={user.notifications}>
            <RoundedBtn icon="Bell" />
          </Badge>
        </NavImgSettings>
      </HeaderContainer>
    </HiddenOnMobile>
  );
}
