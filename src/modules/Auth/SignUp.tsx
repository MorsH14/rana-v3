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
  AuthDemoHint,
  AuthError,
  OTPWrapper,
  OTPBox,
  ResendText,
  AuthInputGroup,
  AuthInputLabel,
  AuthInput,
} from "./auth.styles";
import { initialUserData } from "@/db";

type Phase = "phone" | "otp" | "name";

export default function SignUp() {
  const [phase, setPhase] = useState<Phase>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOTP = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Enter a valid phone number");
      return;
    }
    setError("");
    setPhase("otp");
  };

  const handleOTPChange = (index: number, char: string) => {
    const newOtp = [...otp];
    newOtp[index] = char.replace(/\D/g, "").slice(-1);
    setOtp(newOtp);
    if (char && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    const newOtp = ["", "", "", ""];
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 3)]?.focus();
  };

  const handleVerifyOTP = () => {
    if (otp.join("") === "1234") {
      setError("");
      setPhase("name");
    } else {
      setError("Incorrect code. Use 1234 for demo.");
    }
  };

  const handleContinue = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    const trimmedName = name.trim();
    const fullPhone = `0${phone}`;

    localStorage.setItem(
      "rana-auth",
      JSON.stringify({ phone: fullPhone, name: trimmedName, isLoggedIn: true, isOnboarded: false })
    );

    const existingProfile = JSON.parse(
      localStorage.getItem("rana-user-profile") || JSON.stringify(initialUserData)
    );
    localStorage.setItem(
      "rana-user-profile",
      JSON.stringify({ ...existingProfile, name: trimmedName, phone: fullPhone })
    );

    document.cookie = `rana-session=1; path=/; max-age=${60 * 60 * 24 * 30}`;
    router.push("/onboarding");
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
                <PhonePrefix>🇳🇬 +234</PhonePrefix>
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

              <AuthButton onClick={handleSendOTP} disabled={phone.length < 10}>
                Send OTP
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

              <AuthDemoHint>
                Demo mode — use code <strong>1234</strong>
              </AuthDemoHint>

              <OTPWrapper>
                {[0, 1, 2, 3].map((i) => (
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

              <AuthButton onClick={handleVerifyOTP} disabled={otp.join("").length < 4}>
                Verify
              </AuthButton>

              <ResendText>
                Didn&apos;t receive a code?{" "}
                <AuthLink onClick={() => setOtp(["", "", "", ""])}>Resend OTP</AuthLink>
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

              <AuthButton onClick={handleContinue} disabled={!name.trim()} style={{ marginTop: 8 }}>
                Continue
              </AuthButton>
            </>
          )}
        </AuthFormCard>
      </AuthFormPanel>
    </AuthPageWrapper>
  );
}
