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
} from "./auth.styles";
import { getSession, sendEmailOTP, verifyEmailOTP } from "@/lib/auth";

type Phase = "email" | "otp" | "name";

export default function SignUp() {
  const [phase, setPhase] = useState<Phase>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOTP = async () => {
    if (!email.trim() || !email.includes("@")) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);
    const err = await sendEmailOTP(email.trim());
    setLoading(false);
    if (err) { setError(err); return; }
    setPhase("otp");
  };

  const handleResend = async () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setLoading(true);
    const err = await sendEmailOTP(email.trim());
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
    const err = await verifyEmailOTP(email.trim(), otp.join(""));
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    setPhase("name");
  };

  const handleContinue = async () => {
    if (!name.trim()) { setError("Please enter your name"); return; }
    setLoading(true);
    setError("");
    const trimmedName = name.trim();
    try {
      const session = await getSession();
      const userId = session?.user.id ?? null;

      // Persist auth identity — profile/role saved after onboarding when we have all the data
      localStorage.setItem(
        "rana-auth",
        JSON.stringify({ email: email.trim(), name: trimmedName, isLoggedIn: true, isOnboarded: false, userId })
      );
      localStorage.setItem(
        "rana-user-profile",
        JSON.stringify({
          name: trimmedName,
          email: email.trim(),
          location: "",
          profileImage: "",
          phone: "",
          role: "",
          verified: false,
          verifiedDate: "",
          jobsPosted: 0,
          coinsLeft: 0,
          accountType: "client",
          notifications: 0,
        })
      );

      document.cookie = `rana-session=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Strict`;
      router.push("/onboarding");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const brandTitles: Record<Phase, string> = {
    email: "Start your journey",
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

          {phase === "email" && (
            <>
              <AuthTitle>Create account</AuthTitle>
              <AuthSubtitle>Enter your email address to get started</AuthSubtitle>

              <AuthInputGroup>
                <AuthInputLabel>Email address</AuthInputLabel>
                <AuthInput
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                  autoFocus
                />
              </AuthInputGroup>

              {error && <AuthError>{error}</AuthError>}

              <AuthButton onClick={handleSendOTP} disabled={!email.includes("@") || loading}>
                {loading ? "Sending…" : "Send code"}
              </AuthButton>

              <AuthFooterText>
                Already have an account?{" "}
                <Link href="/signin" style={{ textDecoration: "none" }}>
                  <AuthLink>Sign in</AuthLink>
                </Link>
              </AuthFooterText>
            </>
          )}

          {phase === "otp" && (
            <>
              <AuthBackButton onClick={() => { setPhase("email"); setError(""); setOtp(["", "", "", "", "", ""]); }}>
                <ArrowLeft size={16} /> Back
              </AuthBackButton>
              <AuthTitle>Check your email</AuthTitle>
              <AuthSubtitle>We sent a 6-digit code to {email}</AuthSubtitle>

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
                Didn&apos;t get the email?{" "}
                <AuthLink onClick={handleResend}>Resend code</AuthLink>
              </ResendText>
            </>
          )}

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
