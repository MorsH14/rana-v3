"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {
  AuthPageWrapper,
  AuthBrandPanel,
  AuthBrandName,
  AuthBrandTagline,
  AuthBrandSub,
  AuthFormPanel,
  AuthFormCard,
  AuthMobileLogo,
  AuthTitle,
  AuthSubtitle,
  PhoneInputWrapper,
  PhonePrefix,
  PhoneInput,
  AuthButton,
  AuthFooterText,
  AuthLink,
  AuthBackButton,
  AuthError,
  OTPWrapper,
  OTPBox,
  ResendText,
  AuthInputGroup,
  AuthInputLabel,
  AuthInput,
  NigeriaFlag,
} from "./auth.styles";
import { initialUserData } from "@/db";
import { getSession, sendPhoneOTP, verifyPhoneOTP, saveProfileToSupabase } from "@/lib/auth";

type Phase = "phone" | "otp" | "name";

export default function SignUp() {
  const [phase, setPhase] = useState<Phase>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOTP = async () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Enter a valid phone number");
      return;
    }
    setError("");
    setLoading(true);
    const err = await sendPhoneOTP(`+234${digits}`);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    setPhase("otp");
  };

  const handleResend = async () => {
    setOtp(["", "", "", ""]);
    setError("");
    setLoading(true);
    const err = await sendPhoneOTP(`+234${phone.replace(/\D/g, "")}`);
    setLoading(false);
    if (err) setError(err);
  };

  const handleOTPChange = (index: number, char: string) => {
    const newOtp = [...otp];
    newOtp[index] = char.replace(/\D/g, "").slice(-1);
    setOtp(newOtp);
    if (char && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = ["", "", "", "", "", ""];
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerifyOTP = async () => {
    setError("");
    setLoading(true);
    const err = await verifyPhoneOTP(`+234${phone.replace(/\D/g, "")}`, otp.join(""));
    setLoading(false);
    if (err) {
      setError(err.toLowerCase().includes("expired") ? "Code expired — tap Resend OTP" : "Incorrect code, try again");
      return;
    }
    // Supabase session is now live — move to name collection
    setPhase("name");
  };

  const handleContinue = async () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    setLoading(true);
    setError("");

    const trimmedName = name.trim();
    const fullPhone = `0${phone}`;

    try {
      // Session was already created by verifyPhoneOTP — just fetch the user ID
      const session = await getSession();
      const userId = session?.user.id ?? null;

      localStorage.setItem(
        "rana-auth",
        JSON.stringify({ phone: fullPhone, name: trimmedName, isLoggedIn: true, isOnboarded: false, userId })
      );

      const existingProfile = JSON.parse(
        localStorage.getItem("rana-user-profile") || JSON.stringify(initialUserData)
      );
      localStorage.setItem(
        "rana-user-profile",
        JSON.stringify({ ...existingProfile, name: trimmedName, phone: fullPhone })
      );

      if (userId) {
        await saveProfileToSupabase(userId, { name: trimmedName, phone: fullPhone, accountType: "client" });
      }

      document.cookie = `rana-session=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Strict`;
      router.push("/onboarding");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const brandTitles: Record<Phase, string> = {
    phone: "Start your journey",
    otp: "Start your journey",
    name: "Almost there",
  };

  return (
    <AuthPageWrapper>
      <AuthBrandPanel>
        <AuthBrandName>Ranajob</AuthBrandName>
        <AuthBrandTagline>{brandTitles[phase]}</AuthBrandTagline>
        <AuthBrandSub>
          Join thousands of Nigerians who have found work or hired trusted professionals
          through Ranajob.
        </AuthBrandSub>
      </AuthBrandPanel>

      <AuthFormPanel>
        <AuthFormCard>
          <AuthMobileLogo>Ranajob</AuthMobileLogo>

          {/* ── Step 1: Phone ── */}
          {phase === "phone" && (
            <>
              <AuthTitle>Create account</AuthTitle>
              <AuthSubtitle>Enter your WhatsApp number to get started</AuthSubtitle>

              <PhoneInputWrapper>
                <PhonePrefix><NigeriaFlag /> +234</PhonePrefix>
                <PhoneInput
                  type="tel"
                  placeholder="8012345678"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                  autoFocus
                />
              </PhoneInputWrapper>

              {error && <AuthError>{error}</AuthError>}

              <AuthButton onClick={handleSendOTP} disabled={phone.length < 10 || loading}>
                {loading ? "Sending…" : "Send OTP"}
              </AuthButton>

              <AuthFooterText>
                Already have an account?{" "}
                <Link href="/signin" style={{ textDecoration: "none" }}>
                  <AuthLink>Sign in</AuthLink>
                </Link>
              </AuthFooterText>
            </>
          )}

          {/* ── Step 2: OTP ── */}
          {phase === "otp" && (
            <>
              <AuthBackButton
                onClick={() => { setPhase("phone"); setError(""); setOtp(["", "", "", ""]); }}
              >
                <ArrowLeft size={16} /> Back
              </AuthBackButton>
              <AuthTitle>Verify number</AuthTitle>
              <AuthSubtitle>Enter the 4-digit code sent to +234{phone}</AuthSubtitle>

              <OTPWrapper>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <OTPBox
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[i]}
                    onChange={(e) => handleOTPChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    autoFocus={i === 0}
                  />
                ))}
              </OTPWrapper>

              {error && <AuthError style={{ textAlign: "center" }}>{error}</AuthError>}

              <AuthButton onClick={handleVerifyOTP} disabled={otp.join("").length < 6 || loading}>
                {loading ? "Verifying…" : "Verify"}
              </AuthButton>

              <ResendText>
                Didn&apos;t receive a code?{" "}
                <AuthLink onClick={handleResend}>Resend OTP</AuthLink>
              </ResendText>
            </>
          )}

          {/* ── Step 3: Name ── */}
          {phase === "name" && (
            <>
              <AuthTitle>What&apos;s your name?</AuthTitle>
              <AuthSubtitle>This is how you&apos;ll appear on Ranajob</AuthSubtitle>

              <AuthInputGroup>
                <AuthInputLabel>Full name</AuthInputLabel>
                <AuthInput
                  type="text"
                  placeholder="e.g. Ayodele Oluwaseyi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  autoFocus
                />
              </AuthInputGroup>

              {error && <AuthError>{error}</AuthError>}

              <AuthButton onClick={handleContinue} disabled={!name.trim() || loading} style={{ marginTop: 8 }}>
                {loading ? "Creating account…" : "Continue"}
              </AuthButton>
            </>
          )}
        </AuthFormCard>
      </AuthFormPanel>
    </AuthPageWrapper>
  );
}
