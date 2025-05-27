"use client";

import Link from "next/link";
import { Badge, Box, Stack } from "@mui/material";
import { Check, Coins, Gear, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import {
  ProfileHeaderContainer,
  ProfileHeader,
  ProfileHeaderTitle,
  ProfileHeaderBase,
  ProfileBotton,
  SettingsFlexContainer,
} from "./styles";
import { Font10016, Font10016Gray100, Font50020, Font70022 } from "@/utils/typography";
import Image from "next/image";
import { COLORS } from "@/utils/colors.util";
import JobCardProfile from "@/components/Card/jobCardProfile";
import Rewiews from "@/components/Reviews";

const ProfilePage = () => {
  

  return (
    <ProfileHeaderContainer>
      {/* Header Section */}
      <ProfileHeader>
        <ProfileHeaderTitle>
          <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0 ' }}>
            <Badge
              color="secondary"
              badgeContent={<Check size={10} weight="bold" />}
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "8px",
                  height: "12px",
                  width: "12px",
                  transform: "translate(-10%, 320%)",
                  background: "#4cabeb",
                },
              }}
            >
              <Image
                src="/assets/images/logo.jpeg"
                alt="logo"
                width={50}
                height={50}
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              {/* <ProfileImageUploader size={50} /> */}
            </Badge>
          </Stack>

          <Font50020> Alade Olamide</Font50020>

          <Box alignItems={'center'}>
            <Font10016Gray100>
              <WhatsappLogo size={18} color={COLORS.black200}/> <b />
              +2349038662876
            </Font10016Gray100>
          </Box>

          <SettingsFlexContainer>
            <Link href="/settings">
              <ProfileBotton>
                <Gear size={14} />
                Settings
              </ProfileBotton>
            </Link>
            <Link href="/edit">
              <ProfileBotton>
                <Gear size={14} />
                Edit Profile
              </ProfileBotton>
            </Link>
          </SettingsFlexContainer>
        </ProfileHeaderTitle>

        <ProfileHeaderBase>
          <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: '10px 0' }}>
            <Coins size={30} color={COLORS.yellow100} weight="fill" />
          </Stack>
          <Font70022>
            100 COIN
          </Font70022>
          <Font10016>
            Your coin reduces every time someone clicks to show contact details
          </Font10016>
        </ProfileHeaderBase>
      </ProfileHeader>
      <JobCardProfile/>
      <Rewiews/>
    </ProfileHeaderContainer>
  );
};
export { ProfilePage };
