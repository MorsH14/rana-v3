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
  VerifiedWrapper,
} from "./styles";
import { COLORS } from "@/utils/colors.util";

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

const PostServiceBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  border: 1.5px dashed rgba(71, 110, 251, 0.45);
  border-radius: 12px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #476efb;
  text-decoration: none;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  background: rgba(71, 110, 251, 0.04);

  &:hover {
    background: rgba(71, 110, 251, 0.09);
    border-color: rgba(71, 110, 251, 0.75);
  }
`;

const SignOutArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0 0;
  margin-top: 20px;
  border-top: 1px solid ${COLORS.NeutralSolid50};
`;

const SignOutBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.Red500};
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.15s;

  &:hover {
    background: rgba(247, 98, 65, 0.08);
  }
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
  Bookmark,
} from "@phosphor-icons/react/dist/ssr";
import SavedJobs from "./SavedJobs";
import DrawerBasic from "@/components/Drawer/Drawer";
import ProfileEdit from "./ProfileEdit";
import { initialUserData } from "@/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import { PostedJob } from "@/types";
import { useSavedJobs } from "@/utils/hooks/useSavedJobs";

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
  const [postedJobs] = useLocalStorage<PostedJob[]>("rana-posted-jobs", []);
  const { savedIds } = useSavedJobs();
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

  const isWorker = user.accountType === "worker";
  const firstStatValue = isWorker ? postedJobs.length : savedIds.length;
  const firstStatLabel = isWorker ? "Active Listings" : "Saved Jobs";
  const FirstStatIcon = isWorker ? Briefcase : Bookmark;
  const firstStatColor = isWorker ? "#476EFB" : "#10b981";
  const firstStatBg = isWorker
    ? "rgba(71, 110, 251, 0.1)"
    : "rgba(16, 185, 129, 0.1)";

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

      {/* Action buttons — Sign Out moved to bottom danger zone */}
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
      </ProfileActions>

      {/* Worker shortcut — only shown to workers */}
      {isWorker && (
        <PostServiceBtn href="/post-job">
          <Plus size={15} />
          Post a new service
        </PostServiceBtn>
      )}

      {/* Stats — first card is role-aware */}
      <StatsRow>
        <StatCard>
          <StatIconBox bg={firstStatBg}>
            <FirstStatIcon size={18} color={firstStatColor} weight="fill" />
          </StatIconBox>
          <div>
            <StatValue>{firstStatValue}</StatValue>
            <StatLabel>{firstStatLabel}</StatLabel>
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
      <SavedJobs />

      {/* Sign out — isolated at the bottom so it's never hit accidentally */}
      <SignOutArea>
        <SignOutBtn onClick={handleSignOut}>
          <SignOut size={15} />
          Sign out
        </SignOutBtn>
      </SignOutArea>
    </ProfileWrapper>
  );
}
