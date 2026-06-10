"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { MapPin, Briefcase } from "@phosphor-icons/react";
import { jobData } from "@/db";


interface JobDetailsPageProps {
  params: { id: string };
}

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = params;

  // Find job by id (assuming your dummy DB has an id field as string or number)
  const job = jobData.find((job) => job.id.toString() === id);

  if (!job) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6" color="error">
          Job not found 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The job you’re trying to view doesn’t exist.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 2,
        py: 5,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#121212" : "#f9f9f9",
      }}
    >
      <Card
        sx={{
          width: "90%",
          maxWidth: "800px",
          borderRadius: 4,
          boxShadow: 4,
          p: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
        }}
      >
        <CardContent>
          {/* Job Title & Company */}
          <Typography variant="h5" fontWeight={700}>
            {job.role}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {job.company}
          </Typography>

          {/* Job Info */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <MapPin size={18} weight="fill" color="#1976d2" />
              <Typography variant="body2">{job.location}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <Briefcase size={18} weight="fill" color="#1976d2" />
              <Typography variant="body2">{job.company}</Typography>
            </Box>

          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Job Description */}
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
            {job.description}
          </Typography>

          {/* Skills */}
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
            Required Skills:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {job.chips?.map((chip: string) => (
              <Chip key={chip} label={chip} color="primary" variant="outlined" />
            ))}
          </Stack>

          {/* Salary */}
          {job.salary && (
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ mt: 2, color: "primary.main" }}
            >
              {job.salary}
            </Typography>
          )}
        </CardContent>

        <Divider sx={{ my: 2 }} />

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" px={2} pb={2}>
          <Button variant="outlined" color="primary" sx={{ textTransform: "none" }}>
            Save
          </Button>
          <Button variant="contained" color="primary" sx={{ textTransform: "none" }}>
            Contact
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
