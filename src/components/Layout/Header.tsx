"use client";

import Link from "next/link";
import {
  ATags,
  Logo,
  HeaderContainer,
  NavImgSettings,
  HeaderLocation,
  StyledLink,
  AvatarCircle,
} from "./styles";
import { MapPin } from "@phosphor-icons/react/dist/ssr";

const AVATAR_COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#e11d48"];
const getAvatarColor = (name: string) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
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
          <Link href="/profile" style={{ textDecoration: "none" }}>
            {user.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.profileImage}
                alt="User Avatar"
                style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", border: "1.5px solid rgba(255,255,255,0.2)" }}
              />
            ) : (
              <AvatarCircle bg={getAvatarColor(user.name)}>
                {getInitials(user.name)}
              </AvatarCircle>
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
