"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getSession, sendEmailOTP, verifyEmailOTP } from "@/lib/auth";
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

export default function SignIn() {
  const [phase, setPhase] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const redirectAfterAuth = useCallback(() => {
    const auth = JSON.parse(localStorage.getItem("rana-auth") || "{}");
    if (!auth.isOnboarded) {
      router.push("/onboarding");
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const safeTo = from && from.startsWith("/") && !from.startsWith("//") ? from : "/";
    router.push(safeTo);
  }, [router]);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        document.cookie = `rana-session=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Strict`;
        redirectAfterAuth();
      }
    });
  }, [redirectAfterAuth]);

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

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    const err = await verifyEmailOTP(email.trim(), otp.join(""));
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    const auth = JSON.parse(localStorage.getItem("rana-auth") || "{}");
    localStorage.setItem("rana-auth", JSON.stringify({ ...auth, email: email.trim(), isLoggedIn: true }));
    document.cookie = `rana-session=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Strict`;
    redirectAfterAuth();
  };

  return (
    <AuthPageWrapper>
      <AuthBrandPanel>
        <AuthBrandName>Ranajob</AuthBrandName>
        <AuthBrandTagline>Find work near you</AuthBrandTagline>
        <AuthBrandSub>
          Connect with thousands of opportunities in your city. From tech to teaching,
          home services to fashion — your next gig is here.
        </AuthBrandSub>
      </AuthBrandPanel>

      <AuthFormPanel>
        <AuthFormCard>
          <AuthMobileLogo>Ranajob</AuthMobileLogo>

          {phase === "email" && (
            <>
              <AuthTitle>Welcome back</AuthTitle>
              <AuthSubtitle>Enter your email to sign in</AuthSubtitle>

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

              <AuthButton onClick={handleVerify} disabled={otp.join("").length < 6 || loading}>
                {loading ? "Verifying…" : "Sign in"}
              </AuthButton>

              <ResendText>
                Didn&apos;t get the email?{" "}
                <AuthLink onClick={handleResend}>Resend code</AuthLink>
              </ResendText>
            </>
          )}

          <AuthFooterText>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <AuthLink>Sign up</AuthLink>
            </Link>
          </AuthFooterText>
        </AuthFormCard>
      </AuthFormPanel>
    </AuthPageWrapper>
  );
}
