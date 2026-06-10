"use client";

import React from 'react';
import { Box, Typography, Switch, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Divider, Button } from '@mui/material';
import { Bell, LockKey, Question, SignOut, UserCircle } from '@phosphor-icons/react';
import { COLORS } from '@/utils/colors.util';

export default function Settings() {
  const [notifications, setNotifications] = React.useState(true);
  const [emailAlerts, setEmailAlerts] = React.useState(true);

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
  };

  const handleEmailToggle = () => {
    setEmailAlerts(!emailAlerts);
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Settings</Typography>

      <Box sx={{ bgcolor: COLORS.white100, borderRadius: '16px', p: 3, mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <UserCircle size={24} color={COLORS.blueNormal} /> Account
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Edit Profile" secondary="Change your name, bio, and other personal details" />
            <Button variant="outlined" size="small">Edit</Button>
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Change Password" secondary="Update your password securely" />
            <Button variant="outlined" size="small">Change</Button>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ bgcolor: COLORS.white100, borderRadius: '16px', p: 3, mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Bell size={24} color={COLORS.blueNormal} /> Notifications
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Push Notifications" secondary="Receive alerts on your device" />
            <ListItemSecondaryAction>
              <Switch edge="end" checked={notifications} onChange={handleNotificationToggle} color="primary" />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Email Alerts" secondary="Receive job updates via email" />
            <ListItemSecondaryAction>
              <Switch edge="end" checked={emailAlerts} onChange={handleEmailToggle} color="primary" />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ bgcolor: COLORS.white100, borderRadius: '16px', p: 3, mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <LockKey size={24} color={COLORS.blueNormal} /> Privacy & Security
        </Typography>
        <List>
          <ListItem sx={{ cursor: 'pointer' }}>
            <ListItemText primary="Privacy Policy" />
          </ListItem>
          <Divider component="li" />
          <ListItem sx={{ cursor: 'pointer' }}>
            <ListItemText primary="Terms of Service" />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ bgcolor: COLORS.white100, borderRadius: '16px', p: 3, mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <List>
          <ListItem sx={{ cursor: 'pointer' }}>
            <ListItemIcon>
              <Question size={24} />
            </ListItemIcon>
            <ListItemText primary="Help & Support" />
          </ListItem>
          <Divider component="li" />
          <ListItem sx={{ cursor: 'pointer', color: COLORS.Red500 }}>
            <ListItemIcon>
              <SignOut size={24} color={COLORS.Red500} />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
