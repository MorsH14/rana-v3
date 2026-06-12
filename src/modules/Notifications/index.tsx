"use client";

import { useState } from "react";
import { Bell, Briefcase, Star, User, Info } from "@phosphor-icons/react/dist/ssr";
import { notificationsData } from "@/db";
import { COLORS } from "@/utils/colors.util";
import { FlexCenter } from "@/styles/globals.styles";
import {
  NotificationsWrapper,
  NotificationsHeader,
  NotificationsTitle,
  MarkAllRead,
  NotificationList,
  NotificationItem,
  IconCircle,
  NotificationBody,
  NotificationTitleRow,
  NotificationItemTitle,
  NotificationTime,
  NotificationMessage,
  UnreadDot,
  EmptyState,
  SectionLabel,
} from "./notifications.styles";

type Notification = (typeof notificationsData)[number] & { read: boolean };

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; bg: string }> = {
  application: {
    icon: <Briefcase size={18} color={COLORS.white100} weight="fill" />,
    bg: COLORS.Blue500,
  },
  job: {
    icon: <Bell size={18} color={COLORS.white100} weight="fill" />,
    bg: COLORS.Green100,
  },
  interview: {
    icon: <Star size={18} color={COLORS.white100} weight="fill" />,
    bg: "#F59E0B",
  },
  system: {
    icon: <Info size={18} color={COLORS.white100} weight="fill" />,
    bg: COLORS.SolidGray400,
  },
};

function getConfig(type: string) {
  return TYPE_CONFIG[type] ?? TYPE_CONFIG.system;
}

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(
    notificationsData.map((n) => ({ ...n }))
  );

  const unreadItems = items.filter((n) => !n.read);
  const readItems = items.filter((n) => n.read);
  const hasUnread = unreadItems.length > 0;

  const markRead = (id: number) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  if (items.length === 0) {
    return (
      <FlexCenter>
        <NotificationsWrapper>
          <NotificationsTitle>Notifications</NotificationsTitle>
          <EmptyState>
            <Bell size={40} color={COLORS.SolidGray300} />
            <p>You&apos;re all caught up!</p>
          </EmptyState>
        </NotificationsWrapper>
      </FlexCenter>
    );
  }

  return (
    <FlexCenter>
      <NotificationsWrapper>
        <NotificationsHeader>
          <NotificationsTitle>Notifications</NotificationsTitle>
          {hasUnread && (
            <MarkAllRead onClick={markAllRead}>Mark all as read</MarkAllRead>
          )}
        </NotificationsHeader>

        {hasUnread && (
          <>
            <SectionLabel>New · {unreadItems.length}</SectionLabel>
            <NotificationList>
              {unreadItems.map((n) => {
                const { icon, bg } = getConfig(n.type);
                return (
                  <NotificationItem key={n.id} unread onClick={() => markRead(n.id)}>
                    <IconCircle bg={bg}>{icon}</IconCircle>
                    <NotificationBody>
                      <NotificationTitleRow>
                        <NotificationItemTitle unread>{n.title}</NotificationItemTitle>
                        <NotificationTime>{n.time}</NotificationTime>
                      </NotificationTitleRow>
                      <NotificationMessage>{n.message}</NotificationMessage>
                    </NotificationBody>
                    <UnreadDot />
                  </NotificationItem>
                );
              })}
            </NotificationList>
          </>
        )}

        {readItems.length > 0 && (
          <>
            <SectionLabel>{hasUnread ? "Earlier" : "All notifications"}</SectionLabel>
            <NotificationList>
              {readItems.map((n) => {
                const { icon, bg } = getConfig(n.type);
                return (
                  <NotificationItem key={n.id} onClick={() => markRead(n.id)}>
                    <IconCircle bg={bg}>{icon}</IconCircle>
                    <NotificationBody>
                      <NotificationTitleRow>
                        <NotificationItemTitle>{n.title}</NotificationItemTitle>
                        <NotificationTime>{n.time}</NotificationTime>
                      </NotificationTitleRow>
                      <NotificationMessage>{n.message}</NotificationMessage>
                    </NotificationBody>
                  </NotificationItem>
                );
              })}
            </NotificationList>
          </>
        )}
      </NotificationsWrapper>
    </FlexCenter>
  );
}
