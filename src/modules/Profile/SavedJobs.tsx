"use client";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ArrowsDownUp, BookmarkSimple, Trash } from "@phosphor-icons/react/dist/ssr";
import { AccordionWrapper } from "./styles";
import {
  WebBody2B,
  WebBody2M,
  WebCC2Gray300,
  WebCC2Gray700,
} from "@/utils/typography";
import { COLORS } from "@/utils/colors.util";
import { useRouter } from "next/navigation";
import CardBtn from "@/components/Buttons/CardBtn";
import { useSavedJobs } from "@/utils/hooks/useSavedJobs";
import { fetchListingsByIds } from "@/lib/listings";
import type { PostedJob } from "@/types";
import StarRating from "@/components/StarRating";

export default function SavedJobs() {
  const { savedIds, toggle } = useSavedJobs();
  const router = useRouter();
  const [savedListings, setSavedListings] = useState<PostedJob[]>([]);

  useEffect(() => {
    if (savedIds.length === 0) { setSavedListings([]); return; }
    fetchListingsByIds(savedIds).then(setSavedListings);
  }, [savedIds.join(",")]);

  return (
    <AccordionWrapper>
      <Accordion sx={{ boxShadow: "none" }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ArrowsDownUp />}
          sx={{ borderBottom: `1px solid ${COLORS.NeutralSolid50}` }}
        >
          <WebBody2B>SAVED JOBS ({savedListings.length})</WebBody2B>
        </AccordionSummary>

        <AccordionDetails sx={{ px: 0 }}>
          {savedListings.length === 0 ? (
            <Box py={3} textAlign="center">
              <BookmarkSimple size={36} color={COLORS.SolidGray300} />
              <Box mt={1}>
                <WebCC2Gray300>
                  No saved jobs yet. Tap the bookmark on any listing to save it here.
                </WebCC2Gray300>
              </Box>
            </Box>
          ) : (
            savedListings.map((job) => (
              <Box
                key={String(job.id)}
                sx={{
                  border: `1px solid ${COLORS.NeutralSolid50}`,
                  borderRadius: "12px",
                  p: "12px",
                  mb: 2,
                  mt: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box flex={1} minWidth={0}>
                  <WebBody2M
                    style={{
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {job.role}
                  </WebBody2M>
                  <Box mt={0.5}>
                    <WebCC2Gray700>{job.company}</WebCC2Gray700>
                  </Box>
                  <Box mt={0.5} display="flex" alignItems="center" gap={1} flexWrap="wrap">
                    <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.blueNormal }}>
                      {job.salary}
                    </span>
                    <WebCC2Gray300>· {job.location}</WebCC2Gray300>
                  </Box>
                  {job.rating !== undefined && (
                    <Box mt={0.5}>
                      <StarRating rating={job.rating} reviewCount={job.reviewCount} size={10} />
                    </Box>
                  )}
                </Box>

                <Box display="flex" flexDirection="column" gap={1} alignItems="center">
                  <CardBtn label="View" onClick={() => router.push(`/job/${job.id}`)} />
                  <Box sx={{ cursor: "pointer" }} onClick={() => toggle(job.id)}>
                    <Trash size={15} color={COLORS.Red500} />
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </AccordionDetails>
      </Accordion>
    </AccordionWrapper>
  );
}
