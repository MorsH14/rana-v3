"use client";
import React, { useState } from "react";
import { FlexCenter } from "@/styles/globals.styles";
import { ProfileWrapper, VerifiedWrapper } from "./styles";
import MainAvatar from "@/components/Avatar/Avatar";
import { WebCaption1MSolid300, WebHeadingH4Gray900, WebCC2Gray300 } from "@/utils/typography";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Box } from "@mui/material";
import JobListTable from "@/components/Tables";
import SavedFilterDropdown from "./Accordion";
import SavedJobs from "./SavedJobs";
import DrawerBasic from "@/components/Drawer/Drawer";
import ProfileEdit from "./ProfileEdit";
import { initialUserData, savedFilters } from "@/db";
import IconButton from "@/components/Buttons/Button";
import { Gear, MapPin, Pen, WhatsappLogo } from "@phosphor-icons/react";
import Link from "next/link";

function useUseStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

export default function ProfilePage() {
  const [user, setUser] = useUseStorage("rana-user-profile", initialUserData);
  const [filters, setFilters] = useUseStorage("rana-saved-filters", savedFilters);

  const handleUpdateFilter = (index: number, updatedFilter: { title: string; location: string; distance: string; price: string }) => {
    const newFilters = [...filters];
    newFilters[index] = updatedFilter;
    setFilters(newFilters);
  };

  const handleDeleteFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters([]);
  };

  return (
    <FlexCenter>
      <ProfileWrapper>
        <FlexCenter>
          <MainAvatar size={120} imageUrl={user.profileImage} name={user.name} />

          {/* Name + verified badge */}
          <Box display="flex" mt="12px" justifyContent="center" alignItems="center" gap="5px">
            <WebHeadingH4Gray900>{user.name}</WebHeadingH4Gray900>
            {user.verified && (
              <VerifiedWrapper>
                <CheckCircle color="white" size={20} />
              </VerifiedWrapper>
            )}
          </Box>

          {/* Role */}
          {user.role && (
            <Box mt="4px" textAlign="center">
              <WebCaption1MSolid300>{user.role}</WebCaption1MSolid300>
            </Box>
          )}

          {/* Location */}
          {user.location && (
            <Box mt="4px" display="flex" justifyContent="center" alignItems="center" gap="4px">
              <MapPin size={13} color="#A4ABB8" />
              <WebCC2Gray300>{user.location}</WebCC2Gray300>
            </Box>
          )}

          {/* Phone */}
          <Box mt="8px" display="flex" justifyContent="center" alignItems="center" gap="5px">
            <WhatsappLogo color="#25D366" />
            <WebCaption1MSolid300>{user.phone}</WebCaption1MSolid300>
          </Box>

          {/* Actions */}
          <Box mt="16px" display="flex" justifyContent="center" alignItems="center" gap="20px">
            <Link href="/settings" style={{ textDecoration: "none", color: "inherit" }}>
              <IconButton icon={<Gear />}>Settings</IconButton>
            </Link>
            <DrawerBasic label={<IconButton icon={<Pen />}>Edit</IconButton>}>
              <ProfileEdit user={user} setUser={setUser} />
            </DrawerBasic>
          </Box>

          <JobListTable jobsPosted={user.jobsPosted} coinsLeft={user.coinsLeft} />

          <SavedJobs />

          <SavedFilterDropdown
            filters={filters}
            onUpdate={handleUpdateFilter}
            onDelete={handleDeleteFilter}
            onClearAll={handleClearAllFilters}
          />
        </FlexCenter>
      </ProfileWrapper>
    </FlexCenter>
  );
}
