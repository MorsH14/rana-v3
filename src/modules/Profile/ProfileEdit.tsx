"use client";

import React, { useState, useRef, useMemo } from "react";
import { Camera, Lock, EnvelopeSimple, User, MapPin, Briefcase } from "@phosphor-icons/react/dist/ssr";
import styled from "@emotion/styled";
import { COLORS } from "@/utils/colors.util";

/* ─── form inputs ─── */
const FormInput = styled.input`
  width: 100%;
  height: 50px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 12px;
  padding: 0 14px 0 40px;
  font-family: Inter, sans-serif;
  font-size: 15px;
  color: ${COLORS.NeutralSolidGray900};
  background: white;
  box-sizing: border-box;
  transition: border-color 0.15s;

  &::placeholder {
    color: ${COLORS.SolidGray300};
  }
  &:focus {
    border-color: ${COLORS.NeutralSolidGray900};
  }
  &:disabled {
    background: ${COLORS.NeutralSolid0};
    color: ${COLORS.SolidGray400};
    cursor: not-allowed;
  }
`;


const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FieldLabel = styled.label`
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${COLORS.SolidGray700};
  letter-spacing: 0.02em;
`;

const InputWrap = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const ReadOnlyHint = styled.div`
  font-family: Inter, sans-serif;
  font-size: 11px;
  color: ${COLORS.SolidGray300};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SectionTitle = styled.div`
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${COLORS.SolidGray300};
  margin: 8px 0 14px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${COLORS.NeutralSolid50};
  margin: 20px 0;
`;

/* ─── avatar section ─── */
const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-bottom: 24px;
`;

const AvatarCircle = styled.div<{ bg: string }>`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: white;
  letter-spacing: -1px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover .overlay {
    opacity: 1;
  }
`;

const AvatarImg = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  object-fit: cover;
`;

const CameraOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.15s;
`;

const ChangePhotoBtn = styled.button`
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #476efb;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const FormStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* ─── save button ─── */
const SaveBtn = styled.button`
  width: 100%;
  height: 50px;
  background: ${COLORS.NeutralSolidGray900};
  color: white;
  border: none;
  border-radius: 12px;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
  margin-top: 24px;

  &:hover {
    opacity: 0.85;
  }
`;

const AVATAR_COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#e11d48"];

interface UserData {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  verified: boolean;
  location: string;
  role: string;
  notifications: number;
  verifiedDate: string;
  jobsPosted: number;
  coinsLeft: number;
}

interface ProfileEditProps {
  user: UserData;
  setUser: (user: UserData) => void;
}

export default function ProfileEdit({ user, setUser }: ProfileEditProps) {
  const [localUser, setLocalUser] = useState<UserData>({ ...user });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = useMemo(
    () =>
      localUser.name
        .split(" ")
        .filter((w) => w.length > 0)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [localUser.name]
  );

  const avatarColor = AVATAR_COLORS[localUser.name.charCodeAt(0) % AVATAR_COLORS.length];

  const handleChange = (field: keyof UserData, value: string | boolean) => {
    setLocalUser((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => handleChange("profileImage", reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setUser(localUser);
  };

  return (
    <div>
      {/* Avatar */}
      <AvatarSection>
        <AvatarCircle bg={avatarColor} onClick={() => fileInputRef.current?.click()}>
          {localUser.profileImage ? (
            <AvatarImg src={localUser.profileImage} alt={localUser.name} />
          ) : (
            initials
          )}
          <CameraOverlay className="overlay">
            <Camera size={22} color="white" weight="bold" />
          </CameraOverlay>
        </AvatarCircle>

        <ChangePhotoBtn type="button" onClick={() => fileInputRef.current?.click()}>
          Change photo
        </ChangePhotoBtn>

        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handlePhotoChange} />
      </AvatarSection>

      {/* Personal info */}
      <SectionTitle>Personal info</SectionTitle>
      <FormStack>
        <FieldWrap>
          <FieldLabel htmlFor="pe-name">Full name</FieldLabel>
          <InputWrap>
            <User size={15} color={COLORS.SolidGray300} />
            <FormInput
              id="pe-name"
              type="text"
              placeholder="Your full name"
              value={localUser.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </InputWrap>
        </FieldWrap>

        <FieldWrap>
          <FieldLabel htmlFor="pe-role">Job title / Role</FieldLabel>
          <InputWrap>
            <Briefcase size={15} color={COLORS.SolidGray300} />
            <FormInput
              id="pe-role"
              type="text"
              placeholder="e.g. Plumber, Teacher, Designer"
              value={localUser.role}
              onChange={(e) => handleChange("role", e.target.value)}
            />
          </InputWrap>
        </FieldWrap>

        <FieldWrap>
          <FieldLabel htmlFor="pe-location">Location</FieldLabel>
          <InputWrap>
            <MapPin size={15} color={COLORS.SolidGray300} />
            <FormInput
              id="pe-location"
              type="text"
              placeholder="e.g. Ilorin, Kwara State"
              value={localUser.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </InputWrap>
        </FieldWrap>
      </FormStack>

      <Divider />

      {/* Contact */}
      <SectionTitle>Contact</SectionTitle>
      <FormStack>
        <FieldWrap>
          <FieldLabel htmlFor="pe-email">Email address</FieldLabel>
          <InputWrap>
            <EnvelopeSimple size={15} color={COLORS.SolidGray300} />
            <FormInput
              id="pe-email"
              type="email"
              placeholder="your@email.com"
              value={localUser.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </InputWrap>
        </FieldWrap>

        <FieldWrap>
          <FieldLabel>Phone number</FieldLabel>
          <InputWrap>
            <Lock size={15} color={COLORS.SolidGray300} />
            <FormInput type="tel" value={localUser.phone} disabled />
          </InputWrap>
          <ReadOnlyHint>
            <Lock size={10} />
            To change your number, sign in with a new phone
          </ReadOnlyHint>
        </FieldWrap>
      </FormStack>

      <SaveBtn type="button" onClick={handleSave}>
        Save changes
      </SaveBtn>
    </div>
  );
}
