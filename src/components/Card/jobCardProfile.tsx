import React, { useMemo } from 'react'
import { JobListHeader, JobLogo, JobProfileContainer, JobProfileContainerList, JobProfileHeader, JobProfileList, Skill, SkillSet } from './style';
import { Font10016, Font50016Blue100, Font70016, Font70022 } from '@/utils/typography';
import { BookOpenText } from '@phosphor-icons/react/dist/ssr';
import { jobProfiles } from '@/db';
import ToggleSwitch from '../Switch/switch';
import { Box } from '@mui/material';

export default function JobCardProfile() {
   const randomBgColorCombo = useMemo(
      () => ["#e79c46bc", "#92e7acd8", "#ce93d3b0", "#8dd6ece1"],
      []
    );
  return (
    <>
            <JobProfileContainer>
              <JobProfileHeader>
                <Font70022>
                  Job Profile (2)
                </Font70022>
                  <Box sx={{cursor: 'pointer'}}>
                  <Font50016Blue100>
                    + New
                  </Font50016Blue100>
                  </Box>
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
      
                      <Font70016>
                        {profile.title}
                      </Font70016>

                      <br />
      
                      <Box mb={'5px'}>
                      <Font10016>
                        {profile.description}
                      </Font10016>
                      </Box>
      
                      <br />
                      <Font70022>
                        Skill Set
                      </Font70022>
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
    </>
  )
}
