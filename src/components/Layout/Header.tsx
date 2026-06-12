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
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <HiddenOnMobile>
      <HeaderContainer>
        
        {/* Logo */}
        <Link href="/">
          <Logo>Ranajob</Logo>
        </Link>

        {/* Navigation Links */}
        <ATags>
          {HeaderLink.map((item, index) => (
            <StyledLink
              key={index}
              href={item.route}
              isActive={pathname === item.route}
            >
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
          
          {/* Avatar */}
          <Link href="/profile">
            {user.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.profileImage}
                alt="User Avatar"
                style={{ width: "35px", height: "35px", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <User size={35} color="gray" />
            )}
          </Link>

          {/* Settings */}
          <Link href="/settings">
            <RoundedBtn icon="GearSix" />
          </Link>

          {/* Notifications */}
          <Link href="/notification">
            <Badge badgeContent={user.notifications}>
              <RoundedBtn icon="Bell" />
            </Badge>
          </Link>

        </NavImgSettings>
      </HeaderContainer>
    </HiddenOnMobile>
  );
}
