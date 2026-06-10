"use client";
import React, { useState } from "react";
import { FlexCenter } from "@/styles/globals.styles";
import { ProfileWrapper, VerifiedWrapper } from "./styles";
import MainAvatar from "@/components/Avatar/Avatar";
import { WebCaption1MSolid300, WebHeadingH4Gray900 } from "@/utils/typography";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Box } from "@mui/material";
import JobListTable from "@/components/Tables";
import SavedFilterDropdown from "./Accordion";
import DrawerBasic from "@/components/Drawer/Drawer";
import ProfileEdit from "./ProfileEdit";
import { initialUserData } from "@/db";
import IconButton from "@/components/Buttons/Button";
import { Gear, Pen, WhatsappLogo } from "@phosphor-icons/react";


export default function ProfilePage() {
  const [user, setUser] = useState(initialUserData);

  return (
    <FlexCenter>
      <ProfileWrapper>
        <FlexCenter>
          <MainAvatar size={120} imageUrl={user.profileImage} name={user.name} />
          <Box display={"flex"} mt={"12px"} justifyContent={'center'} alignItems={'center'} gap={'5px'}>
            <WebHeadingH4Gray900>{user.name}</WebHeadingH4Gray900>
            {user.verified && (
              <VerifiedWrapper>
                <CheckCircle color="white" size={20} />
              </VerifiedWrapper>
            )}
          </Box>

          <Box mt={"6px"} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'5px'}>
            <WhatsappLogo/>
            <WebCaption1MSolid300>{user.phone}</WebCaption1MSolid300>
          </Box>
          <Box mt={"12px"} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'20px'}>

            <IconButton icon={<Gear/>} children="Settings"/>
            
            <DrawerBasic
              label={<IconButton icon={<Pen/>} children="Edit"/>}
            >
              <ProfileEdit user={user} setUser={setUser} />
            </DrawerBasic>
          </Box>

          <JobListTable />
          {/* <SavedFilterDropdown /> */}
        </FlexCenter>
      </ProfileWrapper>
    </FlexCenter>
  );
}
