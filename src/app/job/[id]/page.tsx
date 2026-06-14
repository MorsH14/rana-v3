"use client";
import React, { useState, useMemo } from "react";
import {
  Box,
  Chip,
  Divider,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { MapPin, Briefcase, X, CheckCircle, ArrowLeft } from "@phosphor-icons/react";
import { jobData } from "@/db";
import { COLORS } from "@/utils/colors.util";
import StarRating from "@/components/StarRating";
import { useSavedJobs } from "@/utils/hooks/useSavedJobs";
import { useParams } from "next/navigation";
import {
  Font50030,
  Font50020,
  Font50016,
  MobileLightRS12,
  WebBody2MSolidGray400,
} from "@/utils/typography";
import CardBtn from "@/components/Buttons/CardBtn";
import { useRouter } from "next/navigation";

export default function JobDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { isSaved, toggle } = useSavedJobs();

  const [applyOpen, setApplyOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const job = jobData.find((j) => j.id.toString() === id);

  const bgColor = useMemo(() => {
    const colors = ["#e79c469d", "#92e7acb3", "#ce93d38d", "#8dd6ecb9", "#b597ebb8", "#c4e7469d"];
    const seed = typeof job?.id === "number"
      ? job.id
      : (job?.id ?? "").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return colors[seed % colors.length];
  }, [job?.id]);

  const initials = useMemo(() => {
    if (!job) return "";
    return job.company
      .split(" ")
      .filter((w) => w.length > 0)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [job?.company]);

  if (!job) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Font50020 style={{ color: COLORS.Red500 }}>Job not found</Font50020>
        <Box mt={1}>
          <WebBody2MSolidGray400>The job you&apos;re trying to view doesn&apos;t exist.</WebBody2MSolidGray400>
        </Box>
      </Box>
    );
  }

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setApplyOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", message: "" });
    }, 300);
  };

  return (
    <Box sx={{ maxWidth: 760, mx: "auto", px: { xs: 2, md: 4 }, py: 4, pb: { xs: 10, md: 4 } }}>

      {/* Back */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", mb: 3 }}
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
        <MobileLightRS12>Back</MobileLightRS12>
      </Box>

      {/* Header */}
      <Box
        sx={{
          borderRadius: "20px",
          p: { xs: 3, md: 4 },
          background: bgColor,
          mb: 3,
          position: "relative",
        }}
      >
        {/* Company initials avatar — top right */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 20, md: 28 },
            right: { xs: 20, md: 28 },
            width: { xs: 52, md: 64 },
            height: { xs: 52, md: 64 },
            borderRadius: "50%",
            background: "rgba(255,255,255,0.82)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, sans-serif",
            fontSize: { xs: 16, md: 20 },
            fontWeight: 700,
            color: "rgba(0,0,0,0.7)",
            letterSpacing: "-0.5px",
            flexShrink: 0,
          }}
        >
          {initials}
        </Box>

        <Box pr={{ xs: "68px", md: "84px" }}>
          <Font50030>{job.role}</Font50030>
          <Box mt={1} display="flex" alignItems="center" gap={1}>
            <Briefcase size={16} />
            <Font50016>{job.company}</Font50016>
          </Box>
          <Box mt={0.5} display="flex" alignItems="center" gap={1}>
            <MapPin size={16} />
            <MobileLightRS12>{job.location}</MobileLightRS12>
          </Box>

          {job.rating !== undefined && (
            <Box mt={1.5}>
              <StarRating rating={job.rating} reviewCount={job.reviewCount} size={16} />
            </Box>
          )}

          <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
            {job.chips?.map((chip) => (
              <Chip
                key={chip}
                label={chip}
                sx={{
                  fontSize: "11px",
                  bgcolor: "rgba(255,255,255,0.7)",
                  fontWeight: 500,
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Salary */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: COLORS.NeutralSolid25,
          borderRadius: "14px",
          px: 3,
          py: 2,
          mb: 3,
        }}
      >
        <Box>
          <WebBody2MSolidGray400>Salary</WebBody2MSolidGray400>
          <Box mt={0.5}>
            <Font50020 style={{ color: COLORS.blueNormal }}>{job.salary}</Font50020>
          </Box>
        </Box>
        <Box textAlign="right">
          <WebBody2MSolidGray400>Posted</WebBody2MSolidGray400>
          <Box mt={0.5}>
            <MobileLightRS12>{job.date}</MobileLightRS12>
          </Box>
        </Box>
      </Box>

      {/* Description */}
      <Box mb={3}>
        <Font50016 style={{ display: "block", marginBottom: "10px" }}>About this role</Font50016>
        <Divider sx={{ mb: 2 }} />
        <WebBody2MSolidGray400 style={{ lineHeight: 1.8 }}>{job.description}</WebBody2MSolidGray400>
      </Box>

      {/* Skills */}
      <Box mb={4}>
        <Font50016 style={{ display: "block", marginBottom: "10px" }}>Skills required</Font50016>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {job.chips?.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              variant="outlined"
              sx={{ fontSize: "12px", borderRadius: "20px" }}
            />
          ))}
        </Stack>
      </Box>

      {/* Actions */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Box
          sx={{
            border: `1.5px solid ${isSaved(job.id) ? COLORS.blueNormal : COLORS.black100}`,
            borderRadius: "40px",
            px: 3,
            py: 1,
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            color: isSaved(job.id) ? COLORS.blueNormal : COLORS.black100,
            transition: "all 0.2s",
          }}
          onClick={() => toggle(job.id)}
        >
          {isSaved(job.id) ? "Saved ✓" : "Save"}
        </Box>
        <CardBtn label="Apply Now" onClick={() => setApplyOpen(true)} />
      </Stack>

      {/* Apply Modal */}
      <Dialog
        open={applyOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: "20px", p: 1 } }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Font50020>{submitted ? "Application Sent!" : `Apply for ${job.role}`}</Font50020>
          <IconButton onClick={handleClose} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {submitted ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <CheckCircle size={64} color={COLORS.Green100} weight="fill" />
              <Box mt={2}>
                <Font50016 style={{ display: "block" }}>Your application has been submitted.</Font50016>
              </Box>
              <Box mt={1}>
                <WebBody2MSolidGray400>
                  {job.company} will review your profile and get back to you soon.
                </WebBody2MSolidGray400>
              </Box>
              <Box mt={3}>
                <CardBtn label="Done" onClick={handleClose} />
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
              <WebBody2MSolidGray400>
                Applying to <strong>{job.role}</strong> at <strong>{job.company}</strong>
              </WebBody2MSolidGray400>

              <TextField
                label="Full Name"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                fullWidth
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />

              <TextField
                label="Phone Number"
                placeholder="e.g. 08012345678"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                fullWidth
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />

              <TextField
                label="Cover Message"
                placeholder="Tell them why you're the right fit..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                fullWidth
                multiline
                rows={4}
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                <CardBtn
                  label="Submit Application"
                  onClick={handleSubmit}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
