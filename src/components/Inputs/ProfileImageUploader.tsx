"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "@phosphor-icons/react/dist/ssr";

type Props = {
  size?: number;
};

export default function ProfileImageUploader({ size = 30 }: Props) {
  const [imageSrc, setImageSrc] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  return (
    <>
      <label htmlFor="profile-upload" style={{ cursor: "pointer" }}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Profile"
            width={size}
            height={size}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <User
            style={{
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "#ccc",
            }}
          />
        )}
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </>
  );
}
