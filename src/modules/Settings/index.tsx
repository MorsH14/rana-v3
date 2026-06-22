"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Briefcase,
  CaretRight,
  SignOut,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import { initialUserData } from "@/db";
import DrawerBasic from "@/components/Drawer/Drawer";
import { getSession, signOut } from "@/lib/auth";
import { updatePreferences } from "@/lib/profile";
import ProfileEdit from "@/modules/Profile/ProfileEdit";
import { FlexCenter } from "@/styles/globals.styles";
import {
  SettingsWrapper,
  SettingsPageTitle,
  ProfileSummary,
  SettingsAvatarCircle,
  ProfileSummaryInfo,
  ProfileSummaryName,
  ProfileSummaryRole,
  EditProfileBtn,
  Section,
  SectionTitle,
  Card,
  SettingRow,
  RowLeft,
  RowLabel,
  RowSub,
  RowValue,
  ToggleLabel,
  ToggleInput,
  ToggleSlider,
  ChipsRow,
  PrefChip,
  SavedBadge,
  DangerRow,
  DangerLabel,
} from "./settings.styles";

const AVATAR_COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#e11d48"];

const CATEGORIES = [
  { value: "education", label: "📚 Education" },
  { value: "tech", label: "💻 Tech" },
  { value: "home-services", label: "🏠 Home Services" },
  { value: "fashion", label: "👗 Fashion" },
  { value: "food-events", label: "🍽️ Food & Events" },
  { value: "transport", label: "🚗 Transport" },
];

type NotifPrefs = {
  jobMatches: boolean;
  applicationUpdates: boolean;
  profileTips: boolean;
  reviews: boolean;
};

type PrefData = {
  categories: string[];
  locationVisible: boolean;
  phoneVisible: boolean;
};

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useLocalStorage("rana-user-profile", initialUserData);

  const [notifPrefs, setNotifPrefs] = useLocalStorage<NotifPrefs>(
    "rana-notif-prefs",
    { jobMatches: true, applicationUpdates: true, profileTips: true, reviews: true }
  );

  const [prefs, setPrefs] = useLocalStorage<PrefData>("rana-prefs", {
    categories: [],
    locationVisible: true,
    phoneVisible: true,
  });

  const [prefSaved, setPrefSaved] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    prefs.categories
  );

  const syncPrefs = async (patch: Parameters<typeof updatePreferences>[1]) => {
    const session = await getSession();
    if (session) await updatePreferences(session.user.id, patch);
  };

  const toggleNotif = (key: keyof NotifPrefs) => {
    const updated = { ...notifPrefs, [key]: !notifPrefs[key] };
    setNotifPrefs(updated);
    syncPrefs({
      notif_job_matches: updated.jobMatches,
      notif_application_updates: updated.applicationUpdates,
      notif_profile_tips: updated.profileTips,
      notif_reviews: updated.reviews,
    });
  };

  const toggleCategory = (val: string) => {
    const updated = selectedCategories.includes(val)
      ? selectedCategories.filter((c) => c !== val)
      : [...selectedCategories, val];
    setSelectedCategories(updated);
    setPrefs((p) => ({ ...p, categories: updated }));
    setPrefSaved(true);
    syncPrefs({ categories: updated });
  };

  useEffect(() => {
    if (!prefSaved) return;
    const t = setTimeout(() => setPrefSaved(false), 2000);
    return () => clearTimeout(t);
  }, [prefSaved]);

  const handleSignOut = async () => {
    await signOut();
    document.cookie = "rana-session=; path=/; max-age=0";
    ["rana-auth", "rana-user-profile", "rana-prefs", "rana-notif-prefs"].forEach(
      (k) => localStorage.removeItem(k)
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

  const avatarColor = AVATAR_COLORS[user.name.charCodeAt(0) % AVATAR_COLORS.length];

  return (
    <FlexCenter>
      <SettingsWrapper>
        <SettingsPageTitle>Settings</SettingsPageTitle>

        {/* ── Profile Summary ── */}
        <ProfileSummary>
          <SettingsAvatarCircle bg={avatarColor}>{initials}</SettingsAvatarCircle>
          <ProfileSummaryInfo>
            <ProfileSummaryName>{user.name}</ProfileSummaryName>
            <ProfileSummaryRole>{user.role || user.phone}</ProfileSummaryRole>
          </ProfileSummaryInfo>
          <DrawerBasic label={<EditProfileBtn>Edit profile</EditProfileBtn>}>
            <ProfileEdit user={user} setUser={setUser} />
          </DrawerBasic>
        </ProfileSummary>

        {/* ── Account ── */}
        <Section>
          <SectionTitle>
            <User size={12} />
            Account
          </SectionTitle>
          <Card>
            <SettingRow>
              <RowLeft>
                <RowLabel>Phone number</RowLabel>
                <RowSub>Used for sign in &amp; WhatsApp contact</RowSub>
              </RowLeft>
              <RowValue>{user.phone}</RowValue>
            </SettingRow>
            <SettingRow>
              <RowLeft>
                <RowLabel>Email</RowLabel>
              </RowLeft>
              <RowValue>{user.email || "Not set"}</RowValue>
            </SettingRow>
            <SettingRow>
              <RowLeft>
                <RowLabel>Location</RowLabel>
              </RowLeft>
              <RowValue>{user.location || "Not set"}</RowValue>
            </SettingRow>
          </Card>
        </Section>

        {/* ── Notifications ── */}
        <Section>
          <SectionTitle>
            <Bell size={12} />
            Notifications
          </SectionTitle>
          <Card>
            {(
              [
                {
                  key: "jobMatches" as const,
                  label: "New job matches",
                  sub: "Jobs matching your skills and location",
                },
                {
                  key: "applicationUpdates" as const,
                  label: "Application updates",
                  sub: "When someone contacts you about a listing",
                },
                {
                  key: "profileTips" as const,
                  label: "Profile tips",
                  sub: "Suggestions to improve your visibility",
                },
                {
                  key: "reviews" as const,
                  label: "New reviews",
                  sub: "When a client leaves you a review",
                },
              ] as const
            ).map(({ key, label, sub }) => (
              <SettingRow key={key}>
                <RowLeft>
                  <RowLabel>{label}</RowLabel>
                  <RowSub>{sub}</RowSub>
                </RowLeft>
                <ToggleLabel>
                  <ToggleInput
                    type="checkbox"
                    checked={notifPrefs[key]}
                    onChange={() => toggleNotif(key)}
                  />
                  <ToggleSlider />
                </ToggleLabel>
              </SettingRow>
            ))}
          </Card>
        </Section>

        {/* ── Preferences ── */}
        <Section>
          <SectionTitle>
            <Briefcase size={12} />
            Job preferences
          </SectionTitle>
          <Card>
            <SettingRow>
              <RowLeft>
                <RowLabel>Interested categories</RowLabel>
                <RowSub>Personalises your home feed</RowSub>
              </RowLeft>
            </SettingRow>
            <ChipsRow>
              {CATEGORIES.map((cat) => (
                <PrefChip
                  key={cat.value}
                  type="button"
                  selected={selectedCategories.includes(cat.value)}
                  onClick={() => toggleCategory(cat.value)}
                >
                  {cat.label}
                </PrefChip>
              ))}
            </ChipsRow>

            <SettingRow>
              <RowLeft>
                <RowLabel>Show location on profile</RowLabel>
                <RowSub>Clients can see your city</RowSub>
              </RowLeft>
              <ToggleLabel>
                <ToggleInput
                  type="checkbox"
                  checked={prefs.locationVisible}
                  onChange={() => {
                    const v = !prefs.locationVisible;
                    setPrefs({ ...prefs, locationVisible: v });
                    syncPrefs({ location_visible: v });
                  }}
                />
                <ToggleSlider />
              </ToggleLabel>
            </SettingRow>

            <SettingRow>
              <RowLeft>
                <RowLabel>Show WhatsApp number</RowLabel>
                <RowSub>Allow clients to contact you directly</RowSub>
              </RowLeft>
              <ToggleLabel>
                <ToggleInput
                  type="checkbox"
                  checked={prefs.phoneVisible}
                  onChange={() => {
                    const v = !prefs.phoneVisible;
                    setPrefs({ ...prefs, phoneVisible: v });
                    syncPrefs({ phone_visible: v });
                  }}
                />
                <ToggleSlider />
              </ToggleLabel>
            </SettingRow>
          </Card>

          {prefSaved && (
            <div style={{ padding: "6px 0 0" }}>
              <SavedBadge>✓ Preferences saved</SavedBadge>
            </div>
          )}
        </Section>

        {/* ── Danger zone ── */}
        <Section>
          <SectionTitle>
            <SignOut size={12} />
            Account actions
          </SectionTitle>
          <Card>
            <DangerRow onClick={handleSignOut}>
              <DangerLabel>Sign out</DangerLabel>
              <CaretRight size={16} color="#F76241" />
            </DangerRow>
          </Card>
        </Section>
      </SettingsWrapper>
    </FlexCenter>
  );
}
