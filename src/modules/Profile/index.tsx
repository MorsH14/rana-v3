"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Badge, Box, Stack, Typography } from "@mui/material";
import { Check, Coins, Gear, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import { BookOpenText } from '@phosphor-icons/react/dist/ssr';
import {
  ProfileHeaderContainer,
  ProfileHeader,
  ProfileHeaderTitle,
  ProfileHeaderBase,
  ProfileBotton,
  JobProfileContainer,
  JobProfileHeader,
  JobProfileContainerList,
  JobProfileList,
  JobListHeader,
  JobLogo,
  SkillSet,
  Skill,
  ReviewsContainer,
  ReactionsContainer,
  ReactionContainer,
  EmogyContainer,
  MyEmogy,
  ReviewsMainContainer,
  MainReview,
  ReviewAuthor,
  ReactionImg,
  TypographyComment,
  SettingsFlexContainer,
} from "./styles";
import { jobProfiles, reactionsData, reviewsData } from "./db";
import ToggleSwitch from "@/components/Switch/switch";
import { Font10016Gray100, Font50020 } from "@/utils/typography";
import Image from "next/image";

const ProfilePage = () => {
  const randomBgColorCombo = useMemo(
    () => ["#e79c46bc", "#92e7acd8", "#ce93d3b0", "#8dd6ece1"],
    []
  );

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
                  minWidth: "12px",
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

            </Badge>
          </Stack>

          <Font50020> Alade Olamide</Font50020>

          <Box alignItems={'center'}>
            <Font10016Gray100>
              <WhatsappLogo size={16} /> <b />
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
            <Coins size={30} color="gold" weight="fill" />
          </Stack>
          <Typography variant="h3" fontSize={22} fontWeight="bold">
            100 COIN
          </Typography>
          <Typography variant="h6" fontSize={12} marginTop={1}>
            Your coin reduces every time someone <br /> clicks to show contact details
          </Typography>
        </ProfileHeaderBase>
      </ProfileHeader>

      {/* Job Profile Section */}
      <JobProfileContainer>
        <JobProfileHeader>
          <Typography variant="h2" fontSize={30} fontWeight="bold">
            Job Profile (2)
          </Typography>
          <Link href="/jobprofile">
            <Typography variant="h2" fontSize={18} fontWeight="bold" color="#3a2df5b0">
              + New
            </Typography>
          </Link>
        </JobProfileHeader>

        <JobProfileContainerList>
          {jobProfiles.map((profile, index) => {
            const bgColor = randomBgColorCombo[index % randomBgColorCombo.length];

            return (
              <JobProfileList key={index} style={{ backgroundColor: bgColor }}>
                <JobListHeader>
                  <JobLogo>
                    <BookOpenText size={40} />
                  </JobLogo>
                  <ToggleSwitch />
                </JobListHeader>

                <Typography variant="h4" fontSize={18} fontWeight="bold" paddingBottom={1}>
                  {profile.title}
                </Typography>

                <Typography variant="h6" fontSize={12} width={280} marginBottom={3} maxWidth={'90%'}>
                  {profile.description}
                </Typography>

                <Typography variant="h2" fontSize={12} marginBottom={2}>
                  Skill Set
                </Typography>
                <SkillSet>
                  {profile.skills.map((skill, id) => (
                    <Skill key={id}>{skill}</Skill>
                  ))}
                </SkillSet>
              </JobProfileList>
            );
          })}
        </JobProfileContainerList>
      </JobProfileContainer>

      {/* Reviews Section */}
      <ReviewsContainer>
        <Typography variant="h3" fontSize={32} fontWeight="bold">
          Reviews
        </Typography>

        <ReactionsContainer>
          <ReactionContainer>
            <Typography variant="h3" fontSize={25} fontWeight="bold">
              Reactions
            </Typography>
            <EmogyContainer>
              {reactionsData.map((reaction, index) => (
                <MyEmogy key={index}>
                  {reaction.emoji} {reaction.count}
                </MyEmogy>
              ))}
            </EmogyContainer>
          </ReactionContainer>

          <ReviewsMainContainer>
            <Typography variant="h5" fontSize={30}>
              Reviews ({reviewsData.length})
            </Typography>
            {reviewsData.map((review, index) => (
              <MainReview key={index}>
                <ReviewAuthor>
                  <ReactionImg src={review.imgSrc} alt="Author" />
                  <Typography variant="h5" fontSize={16} fontWeight="bold">
                    {review.author}
                  </Typography>
                </ReviewAuthor>
                <TypographyComment>
                  <Typography
                    variant="h6"
                    fontSize={14}
                    color="gray"
                    marginTop={1}
                    sx={{
                      width: "90%",
                      background: "whitesmoke",
                      borderRadius: "20px",
                      minHeight: "20px",
                      padding: "10px",
                    }}
                  >
                    {review.comment}
                  </Typography>
                </TypographyComment>
              </MainReview>
            ))}
          </ReviewsMainContainer>
        </ReactionsContainer>
      </ReviewsContainer>
    </ProfileHeaderContainer>
  );
};
export { ProfilePage };
