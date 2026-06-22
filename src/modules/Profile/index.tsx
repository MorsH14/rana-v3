"use client";
import React, { useMemo, useState, useEffect } from "react";
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
  VerifiedWrapper,
} from "./styles";
import styled from "@emotion/styled";
import { COLORS } from "@/utils/colors.util";
import {
  CheckCircle,
  Gear,
  Pen,
  SignOut,
  MapPin,
  Phone,
  Briefcase,
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
import { useSavedJobs } from "@/utils/hooks/useSavedJobs";
import { getSession, signOut } from "@/lib/auth";
import { fetchProfile } from "@/lib/profile";
import { fetchWorkerListings } from "@/lib/listings";

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
  const { savedIds } = useSavedJobs();
  const [workerListingsCount, setWorkerListingsCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Immediately seed email from rana-auth so the edit form has it before Supabase loads
    try {
      const auth = JSON.parse(localStorage.getItem("rana-auth") || "{}");
      if (auth.email || auth.name) {
        setUser((prev) => ({
          ...prev,
          email: auth.email || prev.email,
          name: auth.name || prev.name,
        }));
      }
    } catch { /* ignore */ }

    getSession().then(async (session) => {
      if (!session) return;
      const [profile, listings] = await Promise.all([
        fetchProfile(session.user.id),
        fetchWorkerListings(session.user.id),
      ]);
      if (profile) {
        const updated = {
          name: profile.name || "",
          email: profile.email || session.user.email || "",
          phone: profile.phone || "",
          location: profile.location || "",
          role: profile.role || "",
          profileImage: profile.profile_image || "",
          verified: profile.verified ?? false,
          accountType: (profile.account_type as "worker" | "client") ?? "client",
        };
        setUser((prev) => ({ ...prev, ...updated }));
        // Keep localStorage in sync
        localStorage.setItem("rana-user-profile", JSON.stringify({
          ...JSON.parse(localStorage.getItem("rana-user-profile") || "{}"),
          ...updated,
        }));
      }
      setWorkerListingsCount(listings.length);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    await signOut();
    document.cookie = "rana-session=; path=/; max-age=0";
    ["rana-auth", "rana-user-profile", "rana-prefs", "rana-notif-prefs"].forEach((k) =>
      localStorage.removeItem(k)
    );
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

  const colorIdx = (user.name.charCodeAt(0) || 0) % AVATAR_COLORS.length;
  const avatarColor = AVATAR_COLORS[colorIdx];
  const heroGradient = HERO_GRADIENTS[colorIdx];

  const isWorker = user.accountType === "worker";
  const statValue = isWorker ? workerListingsCount : savedIds.length;
  const statLabel = isWorker ? "Active Listings" : "Saved Jobs";
  const StatIcon = isWorker ? Briefcase : Bookmark;
  const statColor = isWorker ? "#476EFB" : "#10b981";
  const statBg = isWorker ? "rgba(71, 110, 251, 0.1)" : "rgba(16, 185, 129, 0.1)";

  return (
    <ProfileWrapper>
      <ProfileHeroBanner bg={heroGradient}>
        <ProfileAvatarWrap>
          <ProfileAvatarInner bg={avatarColor}>{initials}</ProfileAvatarInner>
        </ProfileAvatarWrap>
      </ProfileHeroBanner>

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

        {user.phone && (
          <ProfileMeta>
            <Phone size={12} />
            {user.phone}
          </ProfileMeta>
        )}
      </ProfileInfo>

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

      {isWorker && (
        <PostServiceBtn href="/post-job">
          <Plus size={15} />
          Post a new service
        </PostServiceBtn>
      )}

      <StatsRow>
        <StatCard>
          <StatIconBox bg={statBg}>
            <StatIcon size={18} color={statColor} weight="fill" />
          </StatIconBox>
          <div>
            <StatValue>{statValue}</StatValue>
            <StatLabel>{statLabel}</StatLabel>
          </div>
        </StatCard>
      </StatsRow>

      <SavedJobs />

      <SignOutArea>
        <SignOutBtn onClick={handleSignOut}>
          <SignOut size={15} />
          Sign out
        </SignOutBtn>
      </SignOutArea>
    </ProfileWrapper>
  );
}
