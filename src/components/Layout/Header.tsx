"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
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
import { MapPin, CircleNotch } from "@phosphor-icons/react/dist/ssr";
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

/* ─── location display ─── */
const LocationDisplay = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.75);
  font-family: Inter, sans-serif;
  font-size: 13px;
  cursor: default;
  padding: 6px 0;
  white-space: nowrap;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 140px;
  }
`;

const spin = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const SpinIcon = styled.span`
  ${spin}
  display: inline-flex;
  animation: spin 0.8s linear infinite;
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

const GEO_CACHE_KEY = "rana-geo-location";
const GEO_CACHE_TTL = 60 * 60 * 1000; // 1 hour

// Canonical mapping: Nominatim often returns LGA / admin names instead of city names.
// Keys are lowercase variants; values are the display name we want to show.
const NG_CITY_MAP: Record<string, string> = {
  // Lagos
  "lagos": "Lagos", "lagos island": "Lagos", "lagos mainland": "Lagos",
  "eti-osa": "Lagos", "ikeja": "Lagos", "surulere": "Lagos",
  "alimosho": "Lagos", "kosofe": "Lagos", "mushin": "Lagos",
  "somolu": "Lagos", "apapa": "Lagos", "ajeromi-ifelodun": "Lagos",
  "lagos state": "Lagos",
  // Abuja / FCT
  "abuja": "Abuja", "abuja municipal area council": "Abuja",
  "abuja municipal": "Abuja", "federal capital territory": "Abuja",
  "fct": "Abuja", "garki": "Abuja", "wuse": "Abuja", "maitama": "Abuja",
  "gwarinpa": "Abuja", "asokoro": "Abuja", "bwari": "Abuja",
  // Port Harcourt
  "port harcourt": "Port Harcourt", "obio-akpor": "Port Harcourt",
  "rivers state": "Port Harcourt",
  // Ibadan
  "ibadan": "Ibadan", "ibadan north": "Ibadan", "ibadan south": "Ibadan",
  "oyo state": "Ibadan",
  // Kano
  "kano": "Kano", "kano municipal": "Kano", "kano state": "Kano",
  "fagge": "Kano", "gwale": "Kano",
  // Enugu
  "enugu": "Enugu", "enugu north": "Enugu", "enugu south": "Enugu",
  "enugu state": "Enugu",
  // Kaduna
  "kaduna": "Kaduna", "kaduna north": "Kaduna", "kaduna south": "Kaduna",
  "kaduna state": "Kaduna",
  // Benin City
  "benin city": "Benin City", "oredo": "Benin City", "ikpoba-okha": "Benin City",
  "edo state": "Benin City",
  // Ilorin
  "ilorin": "Ilorin", "ilorin west": "Ilorin", "ilorin east": "Ilorin",
  "kwara state": "Ilorin",
  // Others
  "aba": "Aba", "aba north": "Aba", "aba south": "Aba",
  "onitsha": "Onitsha", "onitsha north": "Onitsha", "onitsha south": "Onitsha",
  "warri": "Warri", "uvwie": "Warri", "delta state": "Warri",
  "sokoto": "Sokoto", "sokoto north": "Sokoto", "sokoto state": "Sokoto",
  "calabar": "Calabar", "calabar municipal": "Calabar", "cross river state": "Calabar",
  "uyo": "Uyo", "uyo lga": "Uyo", "akwa ibom state": "Uyo",
  "maiduguri": "Maiduguri", "borno state": "Maiduguri",
  "jos": "Jos", "jos north": "Jos", "jos south": "Jos", "plateau state": "Jos",
  "owerri": "Owerri", "owerri municipal": "Owerri", "imo state": "Owerri",
  "asaba": "Asaba", "oshimili south": "Asaba",
  "akure": "Akure", "akure south": "Akure", "ondo state": "Akure",
  "osogbo": "Osogbo", "osun state": "Osogbo",
  "abeokuta": "Abeokuta", "abeokuta north": "Abeokuta", "abeokuta south": "Abeokuta",
  "ogun state": "Abeokuta",
  "ile-ife": "Ile-Ife", "ife central": "Ile-Ife", "ife north": "Ile-Ife",
  "zaria": "Zaria", "sabon gari": "Zaria", "zaria lga": "Zaria",
  "gombe": "Gombe", "gombe lga": "Gombe", "gombe state": "Gombe",
  "yola": "Yola", "yola north": "Yola", "adamawa state": "Yola",
  "lafia": "Lafia", "nasarawa state": "Lafia",
  "makurdi": "Makurdi", "benue state": "Makurdi",
  "lokoja": "Lokoja", "kogi state": "Lokoja",
  "birnin kebbi": "Birnin Kebbi", "kebbi state": "Birnin Kebbi",
  "bauchi": "Bauchi", "bauchi lga": "Bauchi", "bauchi state": "Bauchi",
  "yenagoa": "Yenagoa", "bayelsa state": "Yenagoa",
  "umuahia": "Umuahia", "abia state": "Umuahia",
  "awka": "Awka", "awka south": "Awka", "anambra state": "Awka",
  "ado ekiti": "Ado Ekiti", "ekiti state": "Ado Ekiti",
  "damaturu": "Damaturu", "yobe state": "Damaturu",
  "dutse": "Dutse", "jigawa state": "Dutse",
  "gusau": "Gusau", "zamfara state": "Gusau",
  "jalingo": "Jalingo", "taraba state": "Jalingo",
  "abakaliki": "Abakaliki", "ebonyi state": "Abakaliki",
};

function cleanAddrField(s: string): string {
  return s
    .replace(/ Municipal Area Council$/i, "")
    .replace(/ Local Government Area$/i, "")
    .replace(/\bLGA\b/gi, "")
    .replace(/ State$/i, "")
    .replace(/ \(FCT\)$/i, "")
    .replace(/ Municipal$/i, "")
    .trim();
}

function resolveCity(addr: Record<string, string>): string | null {
  const fields = [
    addr.city, addr.town, addr.municipality, addr.city_district,
    addr.village, addr.county, addr.state_district, addr.state,
  ].filter(Boolean) as string[];

  for (const raw of fields) {
    const key = raw.toLowerCase().trim();
    // Exact map match
    if (NG_CITY_MAP[key]) return NG_CITY_MAP[key];
    // Partial map match (e.g. "Abuja Municipal Area Council" → "abuja municipal area council")
    const cleaned = cleanAddrField(raw).toLowerCase();
    if (NG_CITY_MAP[cleaned]) return NG_CITY_MAP[cleaned];
    // Check if any map key is contained in this field
    for (const [mapKey, mapVal] of Object.entries(NG_CITY_MAP)) {
      if (key.includes(mapKey) || mapKey.includes(key)) return mapVal;
    }
  }

  // No Nigerian match — return the first field cleaned up
  const first = fields[0];
  return first ? cleanAddrField(first) : null;
}

async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
      { headers: { "Accept-Language": "en" } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return resolveCity(data.address || {});
  } catch {
    return null;
  }
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const navLinks = user.accountType === "client" ? ClientHeaderLink : WorkerHeaderLink;
  const [displayLocation, setDisplayLocation] = useState(user.location);
  const [detecting, setDetecting] = useState(false);
  const [notifs] = useLocalStorage<Array<{ read: boolean }>>("rana-notifications", []);
  const unreadCount = notifs.filter((n) => !n.read).length;

  useEffect(() => {
    setDisplayLocation(user.location);
  }, [user.location]);

  const saveDetectedLocation = useCallback((city: string) => {
    setDisplayLocation(city);
    try {
      localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ city, ts: Date.now() }));
      const raw = localStorage.getItem("rana-user-profile");
      const parsed = raw ? JSON.parse(raw) : initialUserData;
      localStorage.setItem("rana-user-profile", JSON.stringify({ ...parsed, location: city }));
    } catch {}
  }, []);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation || detecting) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const city = await reverseGeocode(coords.latitude, coords.longitude);
        if (city) saveDetectedLocation(city);
        setDetecting(false);
      },
      () => setDetecting(false),
      { timeout: 8000, maximumAge: 300_000 }
    );
  }, [detecting, saveDetectedLocation]);

  // Auto-detect on mount: serve from cache if fresh, otherwise request GPS
  useEffect(() => {
    try {
      const cached = localStorage.getItem(GEO_CACHE_KEY);
      if (cached) {
        const { city, ts } = JSON.parse(cached);
        if (Date.now() - ts < GEO_CACHE_TTL) {
          setDisplayLocation(city);
          return;
        }
      }
    } catch {}
    detectLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {/* Location — auto-detected, read-only display */}
        <LocationDisplay>
          {detecting ? (
            <SpinIcon>
              <CircleNotch size={15} color="#4cabeb" weight="bold" />
            </SpinIcon>
          ) : (
            <MapPin size={15} weight="fill" color="#4cabeb" />
          )}
          <span>{detecting ? "Detecting…" : shortLocation}</span>
        </LocationDisplay>

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
            <Badge badgeContent={unreadCount}>
              <RoundedBtn icon="Bell" />
            </Badge>
          </Link>
        </NavImgSettings>
      </HeaderContainer>
    </HiddenOnMobile>
  );
}
