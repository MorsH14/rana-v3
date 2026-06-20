"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getSession, sendPhoneOTP, verifyPhoneOTP } from "@/lib/auth";
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
  NigeriaFlag,
} from "./auth.styles";

export default function SignIn() {
  const [phase, setPhase] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
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

  // Auto-restore an existing Supabase session (same browser, token not expired)
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        document.cookie = `rana-session=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Strict`;
        redirectAfterAuth();
      }
    });
  }, [redirectAfterAuth]);

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

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    const err = await verifyPhoneOTP(`+234${phone.replace(/\D/g, "")}`, otp.join(""));
    setLoading(false);
    if (err) {
      setError(err.toLowerCase().includes("expired") ? "Code expired — tap Resend OTP" : "Incorrect code, try again");
      return;
    }

    // Supabase session is now live — stamp the auth cookie and route
    const auth = JSON.parse(localStorage.getItem("rana-auth") || "{}");
    localStorage.setItem(
      "rana-auth",
      JSON.stringify({ ...auth, phone: `0${phone}`, isLoggedIn: true })
    );
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

          {phase === "phone" && (
            <>
              <AuthTitle>Welcome back</AuthTitle>
              <AuthSubtitle>Enter your phone number to sign in</AuthSubtitle>

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
            </>
          )}

          {phase === "otp" && (
            <>
              <AuthBackButton onClick={() => { setPhase("phone"); setError(""); setOtp(["", "", "", ""]); }}>
                <ArrowLeft size={16} /> Back
              </AuthBackButton>
              <AuthTitle>Enter code</AuthTitle>
              <AuthSubtitle>
                A 4-digit code was sent to +234{phone}
              </AuthSubtitle>

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

              <AuthButton
                onClick={handleVerify}
                disabled={otp.join("").length < 6 || loading}
              >
                {loading ? "Verifying…" : "Verify & Sign In"}
              </AuthButton>

              <ResendText>
                Didn&apos;t get a code?{" "}
                <AuthLink onClick={handleResend}>Resend OTP</AuthLink>
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
