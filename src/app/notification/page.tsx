"use client";

import React from 'react';
import { Box, Typography, Stack, Avatar } from '@mui/material';
import { notificationsData } from '@/db';
import { COLORS } from '@/utils/colors.util';
import { Bell, Briefcase, Info, User } from '@phosphor-icons/react';

export default function NotificationPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <Briefcase size={20} color={COLORS.white100} />;
      case 'job':
        return <Bell size={20} color={COLORS.white100} />;
      case 'interview':
        return <User size={20} color={COLORS.white100} />;
      default:
        return <Info size={20} color={COLORS.white100} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'application':
        return COLORS.blueNormal;
      case 'job':
        return COLORS.Green100;
      case 'interview':
        return COLORS.yellow100;
      default:
        return COLORS.gray300;
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Notifications</Typography>

      <Stack spacing={2}>
        {notificationsData.map((notification) => (
          <Box
            key={notification.id}
            sx={{
              display: 'flex',
              alignItems: 'start',
              p: 2,
              bgcolor: notification.read ? COLORS.white100 : COLORS.NeutralSolid25,
              borderRadius: '12px',
              borderLeft: !notification.read ? `4px solid ${COLORS.blueNormal}` : 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <Avatar sx={{ bgcolor: getBgColor(notification.type), mr: 2 }}>
              {getIcon(notification.type)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="subtitle1" fontWeight="bold">{notification.title}</Typography>
                <Typography variant="caption" color="text.secondary">{notification.time}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">{notification.message}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}