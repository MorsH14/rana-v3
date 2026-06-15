"use client";
import React, { useMemo, useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  ProfileWrapper,
  ProfileHeroBanner,
  ProfileAvatarWrap,
  ProfileAvatarInner,
  ProfileInfo,
  ProfileNameRow,
  ProfileName,
  ProfileMeta,
  ProfileActions,
  ProfileActionBtn,
  StatsRow,
  StatCard,
  StatIconBox,
  StatValue,
  StatLabel,
  BuyCoinBtn,
  SectionLabel,
  VerifiedWrapper,
} from "./styles";

const CoinToast = styled.div<{ visible: boolean }>`
  background: #1a1a1a;
  color: white;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 500;
  border-radius: 12px;
  padding: 12px 16px;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? "translateY(0)" : "translateY(-6px)")};
  transition: opacity 0.2s, transform 0.2s;
  pointer-events: none;
`;
import {
  CheckCircle,
  Gear,
  Pen,
  SignOut,
  MapPin,
  WhatsappLogo,
  Briefcase,
  Wallet,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import SavedFilterDropdown from "./Accordion";
import SavedJobs from "./SavedJobs";
import DrawerBasic from "@/components/Drawer/Drawer";
import ProfileEdit from "./ProfileEdit";
import { initialUserData, savedFilters } from "@/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";

const AVATAR_COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#e11d48"];
const HERO_GRADIENTS = [
  "linear-gradient(135deg, #ede9fe, #e0e7ff)",
  "linear-gradient(135deg, #dbeafe, #e0f2fe)",
  "linear-gradient(135deg, #d1fae5, #dcfce7)",
  "linear-gradient(135deg, #fef3c7, #fde8a8)",
  "linear-gradient(135deg, #fee2e2, #fecaca)",
];

export default function ProfilePage() {
  const [user, setUser] = useLocalStorage("rana-user-profile", initialUserData);
  const [filters, setFilters] = useLocalStorage("rana-saved-filters", savedFilters);
  const [coinToast, setCoinToast] = useState(false);
  const router = useRouter();

  const handleBuyCoins = () => {
    setCoinToast(true);
    setTimeout(() => setCoinToast(false), 2500);
  };

  useEffect(() => {
    return () => setCoinToast(false);
  }, []);

  const handleSignOut = () => {
    document.cookie = "rana-session=; path=/; max-age=0";
    localStorage.removeItem("rana-auth");
    router.push("/signin");
  };

  const handleUpdateFilter = (
    index: number,
    updatedFilter: { title: string; location: string; distance: string; price: string }
  ) => {
    const newFilters = [...filters];
    newFilters[index] = updatedFilter;
    setFilters(newFilters);
  };

  const handleDeleteFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleClearAllFilters = () => {
    setFilters([]);
  };

  const initials = useMemo(
    () =>
      user.name
        .split(" ")
        .filter((w) => w.length > 0)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [user.name]
  );

  const colorIdx = user.name.charCodeAt(0) % AVATAR_COLORS.length;
  const avatarColor = AVATAR_COLORS[colorIdx];
  const heroGradient = HERO_GRADIENTS[colorIdx];

  return (
    <ProfileWrapper>
      {/* Hero banner with overlapping avatar */}
      <ProfileHeroBanner bg={heroGradient}>
        <ProfileAvatarWrap>
          <ProfileAvatarInner bg={avatarColor}>{initials}</ProfileAvatarInner>
        </ProfileAvatarWrap>
      </ProfileHeroBanner>

      {/* Name, role, location, phone */}
      <ProfileInfo>
        <ProfileNameRow>
          <ProfileName>{user.name}</ProfileName>
          {user.verified && (
            <VerifiedWrapper>
              <CheckCircle color="white" size={12} />
            </VerifiedWrapper>
          )}
        </ProfileNameRow>

        {user.role && <ProfileMeta>{user.role}</ProfileMeta>}

        {user.location && (
          <ProfileMeta>
            <MapPin size={12} />
            {user.location}
          </ProfileMeta>
        )}

        <ProfileMeta>
          <WhatsappLogo size={13} color="#25D366" />
          {user.phone}
        </ProfileMeta>
      </ProfileInfo>

      {/* Action buttons */}
      <ProfileActions>
        <Link href="/settings" style={{ textDecoration: "none" }}>
          <ProfileActionBtn variant="outline">
            <Gear size={14} />
            Settings
          </ProfileActionBtn>
        </Link>

        <DrawerBasic
          label={
            <ProfileActionBtn variant="primary">
              <Pen size={14} />
              Edit profile
            </ProfileActionBtn>
          }
        >
          <ProfileEdit user={user} setUser={setUser} />
        </DrawerBasic>

        <ProfileActionBtn variant="danger" onClick={handleSignOut}>
          <SignOut size={14} />
          Sign out
        </ProfileActionBtn>
      </ProfileActions>

      {/* Stats cards */}
      <StatsRow>
        <StatCard>
          <StatIconBox bg="rgba(71, 110, 251, 0.1)">
            <Briefcase size={18} color="#476EFB" weight="fill" />
          </StatIconBox>
          <div>
            <StatValue>{user.jobsPosted ?? 0}</StatValue>
            <StatLabel>Jobs Posted</StatLabel>
          </div>
        </StatCard>

        <StatCard>
          <StatIconBox bg="rgba(245, 158, 11, 0.12)">
            <Wallet size={18} color="#f59e0b" weight="fill" />
          </StatIconBox>
          <div>
            <StatValue>{user.coinsLeft ?? 0}</StatValue>
            <StatLabel>Coins Left</StatLabel>
          </div>
        </StatCard>
      </StatsRow>

      <BuyCoinBtn onClick={handleBuyCoins}>
        <Plus size={14} />
        Buy coins
      </BuyCoinBtn>
      <CoinToast visible={coinToast}>
        🪙 Coins feature coming soon — stay tuned!
      </CoinToast>

      {/* Saved Jobs */}
      <SectionLabel>Saved Jobs</SectionLabel>
      <SavedJobs />

      {/* Saved Filters */}
      <SectionLabel>Saved Filters</SectionLabel>
      <SavedFilterDropdown
        filters={filters}
        onUpdate={handleUpdateFilter}
        onDelete={handleDeleteFilter}
        onClearAll={handleClearAllFilters}
      />
    </ProfileWrapper>
  );
}
