import { ATagUnderline, FlexCenter } from '@/styles/globals.styles';
import React from 'react';
import { ProfileWrapper, VerifiedWrapper } from './styles';
import ProfileImage from "@/../public/assets/images/logo.jpeg";
import MainAvatar from '@/components/Avatar/Avatar';
import { WebCaption1MSolid300, WebHeadingH4Gray900 } from '@/utils/typography';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { Box } from '@mui/material';
import JobListTable from '@/components/Tables';
import SavedFilterDropdown from './Accordion';
import DrawerBasic from '@/components/Drawer/Drawer';
import ProfileEdit from './ProfileEdit';

function ProfilePage() {
  return (
    <FlexCenter>
      <ProfileWrapper>
        <FlexCenter>
          <MainAvatar size={120} imageUrl={ProfileImage.src} name="Aemy Sharp" />
          <Box display={'flex'} mt={'12px'}>
            <WebHeadingH4Gray900>Ayodele Oluwaseyi </WebHeadingH4Gray900>
            <VerifiedWrapper>
              <CheckCircle color='white' size={20} />
            </VerifiedWrapper>
          </Box>
          <Box my={'6px'}>
            <WebCaption1MSolid300>Ayodelewaseyi@gmail.com</WebCaption1MSolid300>
          </Box>
          <WebCaption1MSolid300>08047748383</WebCaption1MSolid300>
          <Box mt={'12px'}>
            <DrawerBasic label={<ATagUnderline>View details</ATagUnderline>} headerText='Profile'>
              <ProfileEdit />
            </DrawerBasic>
          </Box>
          <JobListTable />
          <SavedFilterDropdown />
        </FlexCenter>
      </ProfileWrapper>
    </FlexCenter>
  );
}

export { ProfilePage };
