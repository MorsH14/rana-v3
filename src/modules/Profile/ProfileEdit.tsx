"use client";

import React, { useState } from "react";
import ProfilePictureEdit from "./ProfilePictureEdit";
import TextField from "@/components/Inputs/TextField";
import { Box, Button } from "@mui/material";
import { User } from "@phosphor-icons/react/dist/ssr";

interface User {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  verified: boolean;
  location: string;
  role: string;
  notifications: number;
}

interface ProfileEditProps {
  user: User;
  setUser: (user: User) => void;
}

export default function ProfileEdit({ user, setUser }: ProfileEditProps) {
  const [localUser, setLocalUser] = useState<User>({ ...user });

  const handleChange = (field: keyof User, value: string | boolean) => {
    setLocalUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setUser(localUser);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Profile picture edit */}
      {localUser.profileImage ? (
        <ProfilePictureEdit
          imageUrl={localUser.profileImage}
          onChange={(url: string) => handleChange("profileImage", url)}
        />
      ) : (
        <User size={120} />
      )}

      <Button variant="outlined" component="label">
        Upload New Picture
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                handleChange("profileImage", reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </Button>

      {/* Text fields */}
      <TextField
        label="Name"
        placeholder="Type Name"
        value={localUser.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("name", e.target.value)}
      />
      <TextField
        label="Phone"
        placeholder="Type Number"
        value={localUser.phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("phone", e.target.value)}
      />
      <TextField
        label="Email"
        placeholder="Type Email"
        value={localUser.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)}
      />
      <TextField
        label="Location"
        placeholder="Type Location"
        value={localUser.location}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("location", e.target.value)}
      />
      <TextField
        label="Role"
        placeholder="Type Role"
        value={localUser.role}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("role", e.target.value)}
      />

      {/* Verified checkbox */}
      <Box display="flex" alignItems="center">
        <label htmlFor="verified-checkbox" style={{ marginRight: 8 }}>Verified</label>
        <input
          id="verified-checkbox"
          type="checkbox"
          checked={localUser.verified}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("verified", e.target.checked)}
        />
      </Box>

      {/* Save button */}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </Box>
  );
}
