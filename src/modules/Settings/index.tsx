"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import { initialUserData } from "@/db";
import MainAvatar from "@/components/Avatar/Avatar";
import DrawerBasic from "@/components/Drawer/Drawer";
import ProfileEdit from "@/modules/Profile/ProfileEdit";
import { FlexCenter } from "@/styles/globals.styles";
import {
  SettingsWrapper,
  SettingsPageTitle,
  ProfileSummary,
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
  SaveBtn,
  SavedBadge,
  DangerRow,
  DangerLabel,
} from "./settings.styles";

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

  const toggleNotif = (key: keyof NotifPrefs) => {
    setNotifPrefs({ ...notifPrefs, [key]: !notifPrefs[key] });
  };

  const toggleCategory = (val: string) => {
    setSelectedCategories((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    );
    setPrefSaved(false);
  };

  const savePrefs = () => {
    setPrefs({ ...prefs, categories: selectedCategories });
    setPrefSaved(true);
  };

  const handleSignOut = () => {
    document.cookie = "rana-session=; path=/; max-age=0";
    localStorage.removeItem("rana-auth");
    router.push("/signin");
  };

  return (
    <FlexCenter>
      <SettingsWrapper>
        <SettingsPageTitle>Settings</SettingsPageTitle>

        {/* ── Profile Summary ── */}
        <ProfileSummary>
          <MainAvatar size={52} imageUrl={user.profileImage} name={user.name} />
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
          <SectionTitle>Account</SectionTitle>
          <Card>
            <SettingRow>
              <RowLeft>
                <RowLabel>Phone number</RowLabel>
                <RowSub>Used for sign in & WhatsApp contact</RowSub>
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
          <SectionTitle>Notifications</SectionTitle>
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
          <SectionTitle>Job preferences</SectionTitle>
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
                    setPrefs({ ...prefs, locationVisible: !prefs.locationVisible });
                    setPrefSaved(false);
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
                    setPrefs({ ...prefs, phoneVisible: !prefs.phoneVisible });
                    setPrefSaved(false);
                  }}
                />
                <ToggleSlider />
              </ToggleLabel>
            </SettingRow>
          </Card>

          <div style={{ padding: "10px 0 0", display: "flex", alignItems: "center", gap: 12 }}>
            <SaveBtn onClick={savePrefs}>Save preferences</SaveBtn>
            {prefSaved && <SavedBadge>✓ Saved</SavedBadge>}
          </div>
        </Section>

        {/* ── Danger zone ── */}
        <Section>
          <SectionTitle>Account actions</SectionTitle>
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
