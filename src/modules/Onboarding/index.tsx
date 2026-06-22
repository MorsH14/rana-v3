"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Camera } from "@phosphor-icons/react/dist/ssr";
import {
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingLogo,
  ProgressDots,
  Dot,
  OnboardingContent,
  OnboardingTitle,
  OnboardingSubtitle,
  RoleCardGrid,
  RoleCard,
  RoleIconBox,
  RoleLabel,
  RoleSub,
  CategoryGrid,
  CategoryChip,
  OnboardingButton,
  OnboardingBackButton,
  LocationSelect,
  PhotoUploadArea,
  PhotoPreview,
  SuccessWrapper,
  SuccessIconBox,
  SuccessTitle,
  SuccessSubtitle,
} from "./onboarding.styles";
import { COLORS } from "@/utils/colors.util";
import { getSession, saveProfileToSupabase, savePreferencesToSupabase } from "@/lib/auth";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT (Abuja)", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const CATEGORIES = [
  { value: "education", label: "Education", emoji: "📚" },
  { value: "tech", label: "Tech & Digital", emoji: "💻" },
  { value: "home-services", label: "Home Services", emoji: "🏠" },
  { value: "fashion", label: "Fashion & Beauty", emoji: "👗" },
  { value: "food-events", label: "Food & Events", emoji: "🍽️" },
  { value: "transport", label: "Transport", emoji: "🚗" },
];

type Step = 1 | 2 | 3 | "done";
type Role = "seeker" | "hirer" | null;

export default function OnboardingWizard() {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<Role>(null);
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();

  const getUserName = () => {
    if (typeof window === "undefined") return "there";
    try {
      const auth = JSON.parse(localStorage.getItem("rana-auth") || "{}");
      return auth.name || "there";
    } catch {
      return "there";
    }
  };
  const [userName] = useState(getUserName);

  const stepNumber = step === "done" ? 4 : (step as number);

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFinish = async () => {
    const accountType = role === "seeker" ? "worker" : "client";

    // 1. Write to localStorage first — works offline, instant
    const auth = JSON.parse(localStorage.getItem("rana-auth") || "{}");
    const existing = JSON.parse(localStorage.getItem("rana-user-profile") || "{}");

    localStorage.setItem("rana-user-profile", JSON.stringify({
      name: auth.name || existing.name || "",
      email: auth.email || existing.email || "",
      location: location || existing.location || "",
      profileImage: profileImage || existing.profileImage || "",
      phone: existing.phone || "",
      role: existing.role || "",
      verified: existing.verified || false,
      verifiedDate: existing.verifiedDate || "",
      jobsPosted: 0,
      coinsLeft: 0,
      notifications: 0,
      accountType,
    }));
    localStorage.setItem("rana-prefs", JSON.stringify({
      categories: selectedCategories,
      locationVisible: true,
      phoneVisible: true,
    }));
    localStorage.setItem("rana-auth", JSON.stringify({ ...auth, isOnboarded: true }));

    // 2. Persist to Supabase — best-effort, errors are logged not thrown
    try {
      const session = await getSession();
      if (session) {
        const name = auth.name || "User";
        const email = auth.email || session.user.email || "";

        const profileError = await saveProfileToSupabase(session.user.id, {
          name,
          email,
          accountType,
          ...(location ? { location } : {}),
          ...(profileImage ? { profileImage } : {}),
        });
        if (profileError) console.error("[onboarding] Profile save failed:", profileError.message);

        const prefsError = await savePreferencesToSupabase(session.user.id, selectedCategories);
        if (prefsError) console.error("[onboarding] Prefs save failed:", prefsError.message);
      } else {
        console.warn("[onboarding] No active session — Supabase save skipped");
      }
    } catch (e) {
      console.error("[onboarding] Unexpected Supabase error:", e);
    }

    setStep("done");
  };

  return (
    <OnboardingWrapper>
      <OnboardingHeader>
        <OnboardingLogo>Ranajob</OnboardingLogo>
        {step !== "done" && (
          <ProgressDots>
            {[1, 2, 3].map((s) => (
              <Dot key={s} active={stepNumber === s} done={stepNumber > s} />
            ))}
          </ProgressDots>
        )}
      </OnboardingHeader>

      <OnboardingContent>
        {/* ── Step 1: Role ── */}
        {step === 1 && (
          <>
            <OnboardingTitle>How will you use Ranajob?</OnboardingTitle>
            <OnboardingSubtitle>This helps us personalise your experience</OnboardingSubtitle>

            <RoleCardGrid>
              <RoleCard selected={role === "seeker"} onClick={() => setRole("seeker")}>
                <RoleIconBox bg="#e0f2fe">🔍</RoleIconBox>
                <div>
                  <RoleLabel>Looking for work</RoleLabel>
                  <RoleSub>Find jobs near you and get hired</RoleSub>
                </div>
              </RoleCard>
              <RoleCard selected={role === "hirer"} onClick={() => setRole("hirer")}>
                <RoleIconBox bg="#fef3c7">👷</RoleIconBox>
                <div>
                  <RoleLabel>I need to hire</RoleLabel>
                  <RoleSub>Post jobs and find skilled workers</RoleSub>
                </div>
              </RoleCard>
            </RoleCardGrid>

            <OnboardingButton disabled={!role} onClick={() => setStep(2)}>
              Continue
            </OnboardingButton>
          </>
        )}

        {/* ── Step 2: Profile ── */}
        {step === 2 && (
          <>
            <OnboardingBackButton onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Back
            </OnboardingBackButton>
            <OnboardingTitle>Complete your profile</OnboardingTitle>
            <OnboardingSubtitle>
              Add a photo and your state — you can update these anytime
            </OnboardingSubtitle>

            {/* Photo upload */}
            <label htmlFor="onboarding-photo" style={{ cursor: "pointer", display: "block" }}>
              {profileImage ? (
                <PhotoPreview src={profileImage} alt="Profile preview" />
              ) : (
                <PhotoUploadArea>
                  <Camera size={28} color={COLORS.SolidGray300} />
                  <span style={{ fontSize: 14, color: COLORS.SolidGray400 }}>
                    Tap to upload photo
                  </span>
                  <span style={{ fontSize: 12, color: COLORS.SolidGray300 }}>Optional</span>
                </PhotoUploadArea>
              )}
            </label>
            <input
              id="onboarding-photo"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />

            {/* Location */}
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.SolidGray700,
                marginBottom: 8,
              }}
            >
              State / Location
            </div>
            <LocationSelect
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select your state</option>
              {NIGERIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </LocationSelect>

            <OnboardingButton onClick={() => setStep(3)}>
              Continue
            </OnboardingButton>
          </>
        )}

        {/* ── Step 3: Preferences ── */}
        {step === 3 && (
          <>
            <OnboardingBackButton onClick={() => setStep(2)}>
              <ArrowLeft size={16} /> Back
            </OnboardingBackButton>
            <OnboardingTitle>
              {role === "seeker"
                ? "What work are you looking for?"
                : "What do you usually hire for?"}
            </OnboardingTitle>
            <OnboardingSubtitle>Select all that apply</OnboardingSubtitle>

            <CategoryGrid>
              {CATEGORIES.map((cat) => (
                <CategoryChip
                  key={cat.value}
                  selected={selectedCategories.includes(cat.value)}
                  onClick={() => toggleCategory(cat.value)}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </CategoryChip>
              ))}
            </CategoryGrid>

            <OnboardingButton
              disabled={selectedCategories.length === 0}
              onClick={handleFinish}
            >
              Finish setup
            </OnboardingButton>
          </>
        )}

        {/* ── Done ── */}
        {step === "done" && (
          <SuccessWrapper>
            <SuccessIconBox>
              <CheckCircle size={56} weight="fill" color={COLORS.Green100} />
            </SuccessIconBox>
            <SuccessTitle>You&apos;re all set, {userName}!</SuccessTitle>
            <SuccessSubtitle>
              {role === "seeker"
                ? "Post your first service and start receiving enquiries from clients near you."
                : "Browse skilled workers near you and reach out directly via WhatsApp."}
            </SuccessSubtitle>
            <OnboardingButton onClick={() => router.push("/")}>
              {role === "seeker" ? "Go to my dashboard →" : "Start browsing →"}
            </OnboardingButton>
          </SuccessWrapper>
        )}
      </OnboardingContent>
    </OnboardingWrapper>
  );
}
