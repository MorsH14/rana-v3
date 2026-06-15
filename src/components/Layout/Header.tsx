"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ATags,
  Logo,
  HeaderContainer,
  NavImgSettings,
  StyledLink,
  AvatarCircle,
} from "./styles";
import styled from "@emotion/styled";
import { MapPin, CaretDown, Check } from "@phosphor-icons/react/dist/ssr";
import { COLORS } from "@/utils/colors.util";
import RoundedBtn from "../Buttons/RoundedBtn";
import Badge from "../Badge/badge";
import { HiddenOnMobile } from "@/styles/globals.styles";
import { WorkerHeaderLink, ClientHeaderLink } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { initialUserData } from "@/db";

const AVATAR_COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#e11d48"];
const getAvatarColor = (name: string) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const NIGERIAN_LOCATIONS = [
  "Lagos", "Abuja (FCT)", "Port Harcourt", "Ibadan", "Kano",
  "Enugu", "Kaduna", "Benin City", "Ilorin", "Aba",
  "Onitsha", "Warri", "Sokoto", "Calabar", "Uyo",
];

/* ─── location dropdown styles ─── */
const LocationBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.75);
  font-family: Inter, sans-serif;
  font-size: 13px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  max-width: 180px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: white;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const LocationDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  background: white;
  border: 1px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
  z-index: 9999;
  overflow: hidden;
`;

const DropdownHeader = styled.div`
  padding: 12px 14px 8px;
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${COLORS.SolidGray300};
  border-bottom: 1px solid ${COLORS.NeutralSolid50};
`;

const LocationOption = styled.button<{ active?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 10px 14px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  color: ${({ active }) => (active ? COLORS.NeutralSolidGray900 : COLORS.SolidGray700)};
  background: ${({ active }) => (active ? COLORS.NeutralSolid25 : "white")};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.1s;

  &:hover {
    background: ${COLORS.NeutralSolid25};
  }
`;

const LocationWrap = styled.div`
  position: relative;
`;

interface UserProfile {
  name: string;
  location: string;
  profileImage: string;
  notifications: number;
  role?: string;
  accountType?: "worker" | "client";
}

interface HeaderProps {
  user: UserProfile;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const navLinks = user.accountType === "client" ? ClientHeaderLink : WorkerHeaderLink;
  const [locationOpen, setLocationOpen] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(user.location);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayLocation(user.location);
  }, [user.location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationSelect = (loc: string) => {
    setDisplayLocation(loc);
    setLocationOpen(false);
    try {
      const raw = localStorage.getItem("rana-user-profile");
      const parsed = raw ? JSON.parse(raw) : initialUserData;
      localStorage.setItem(
        "rana-user-profile",
        JSON.stringify({ ...parsed, location: loc })
      );
    } catch {}
  };

  const shortLocation = displayLocation.split(",")[0].trim();

  return (
    <HiddenOnMobile>
      <HeaderContainer>
        {/* Logo */}
        <Link href="/">
          <Logo>Ranajob</Logo>
        </Link>

        {/* Navigation Links */}
        <ATags>
          {navLinks.map((item, index) => (
            <StyledLink
              key={index}
              href={item.route}
              isActive={pathname === item.route}
            >
              {item.label}
            </StyledLink>
          ))}
        </ATags>

        {/* Location selector */}
        <LocationWrap ref={dropdownRef}>
          <LocationBtn onClick={() => setLocationOpen((o) => !o)}>
            <MapPin size={15} weight="fill" color="#4cabeb" />
            <span>{shortLocation}</span>
            <CaretDown size={11} weight="bold" style={{ opacity: 0.5, flexShrink: 0 }} />
          </LocationBtn>

          {locationOpen && (
            <LocationDropdown>
              <DropdownHeader>Your location</DropdownHeader>
              {NIGERIAN_LOCATIONS.map((loc) => {
                const isActive = displayLocation.startsWith(loc.split(" (")[0]);
                return (
                  <LocationOption
                    key={loc}
                    active={isActive}
                    onClick={() => handleLocationSelect(loc)}
                  >
                    {loc}
                    {isActive && <Check size={13} color={COLORS.Blue500} weight="bold" />}
                  </LocationOption>
                );
              })}
            </LocationDropdown>
          )}
        </LocationWrap>

        {/* User actions */}
        <NavImgSettings>
          <Link href="/profile" style={{ textDecoration: "none" }}>
            {user.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.profileImage}
                alt="User Avatar"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                }}
              />
            ) : (
              <AvatarCircle bg={getAvatarColor(user.name)}>
                {getInitials(user.name)}
              </AvatarCircle>
            )}
          </Link>

          <Link href="/settings">
            <RoundedBtn icon="GearSix" />
          </Link>

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
