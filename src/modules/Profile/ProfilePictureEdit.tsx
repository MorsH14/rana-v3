"use client";

import { useRef } from "react";
import MainAvatar from "@/components/Avatar/Avatar";
import { WebCaption1MBlueNormal } from "@/utils/typography";
import { Pill } from "@/components/Buttons/Button";
import { DrawerProfileWrapper } from "./styles";

interface ProfilePictureEditProps {
  imageUrl: string;
  onChange: (url: string) => void;
}

export default function ProfilePictureEdit({ imageUrl, onChange }: ProfilePictureEditProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onChange(reader.result); // update parent state
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click(); // trigger hidden input
  };

  return (
    <>
      <DrawerProfileWrapper>
        <MainAvatar size={120} imageUrl={imageUrl} name="Aemy Sharp" />
        <Pill onClick={handleClick} style={{ cursor: "pointer" }}>
          <WebCaption1MBlueNormal>Change</WebCaption1MBlueNormal>
        </Pill>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </DrawerProfileWrapper>
    </>
  );
}
