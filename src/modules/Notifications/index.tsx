"use client";

import Link from "next/link";
import { Bell, Briefcase, Star, Info, ArrowRight, X } from "@phosphor-icons/react/dist/ssr";
import { COLORS } from "@/utils/colors.util";
import { useEffect, useState } from "react";
import { FlexCenter } from "@/styles/globals.styles";
import { getSession } from "@/lib/auth";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  dismissNotification,
  type UINotification,
} from "@/lib/notifications";
import {
  NotificationsWrapper,
  NotificationsHeader,
  NotificationsTitle,
  MarkAllRead,
  NotificationList,
  NotificationItem,
  NotificationTop,
  IconCircle,
  NotificationBody,
  NotificationTitleRow,
  NotificationItemTitle,
  NotificationTime,
  NotificationMessage,
  UnreadDot,
  ExpandedArea,
  ActionBtn,
  DismissBtn,
  EmptyState,
  SectionLabel,
} from "./notifications.styles";

const TYPE_CONFIG: Record<
  string,
  { icon: React.ReactNode; bg: string; actionLabel: string; fallbackHref: string }
> = {
  application: {
    icon: <Briefcase size={18} color={COLORS.white100} weight="fill" />,
    bg: COLORS.Blue500,
    actionLabel: "Open Messages",
    fallbackHref: "/messages",
  },
  job: {
    icon: <Bell size={18} color={COLORS.white100} weight="fill" />,
    bg: COLORS.Green100,
    actionLabel: "Browse listings",
    fallbackHref: "/",
  },
  interview: {
    icon: <Star size={18} color={COLORS.white100} weight="fill" />,
    bg: "#F59E0B",
    actionLabel: "View profile",
    fallbackHref: "/profile",
  },
  system: {
    icon: <Info size={18} color={COLORS.white100} weight="fill" />,
    bg: COLORS.SolidGray400,
    actionLabel: "Update profile",
    fallbackHref: "/profile",
  },
};

function getConfig(type: string) {
  return TYPE_CONFIG[type] ?? TYPE_CONFIG.system;
}

export default function NotificationsPage() {
  const [items, setItems] = useState<UINotification[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getSession().then(async (session) => {
      if (!session) return;
      setUserId(session.user.id);
      const notifs = await fetchNotifications(session.user.id);
      setItems(notifs);
    });
  }, []);

  const unreadItems = items.filter((n) => !n.read);
  const readItems = items.filter((n) => n.read);
  const hasUnread = unreadItems.length > 0;

  const handleTap = async (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setExpandedId((prev) => (prev === id ? null : id));
    await markNotificationRead(id);
  };

  const dismiss = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setItems((prev) => prev.filter((n) => n.id !== id));
    if (expandedId === id) setExpandedId(null);
    await dismissNotification(id);
  };

  const handleMarkAllRead = async () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    setExpandedId(null);
    if (userId) await markAllNotificationsRead(userId);
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

  const renderItem = (n: UINotification) => {
    const { icon, bg, actionLabel, fallbackHref } = getConfig(n.type);
    const href = n.action_href ?? fallbackHref;
    const isExpanded = expandedId === n.id;

    return (
      <NotificationItem key={n.id} unread={!n.read} onClick={() => handleTap(n.id)}>
        <NotificationTop>
          <IconCircle bg={bg}>{icon}</IconCircle>
          <NotificationBody>
            <NotificationTitleRow>
              <NotificationItemTitle unread={!n.read}>{n.title}</NotificationItemTitle>
              <NotificationTime>{n.time}</NotificationTime>
            </NotificationTitleRow>
            <NotificationMessage expanded={isExpanded}>{n.message}</NotificationMessage>
          </NotificationBody>
          {!n.read && <UnreadDot />}
        </NotificationTop>

        {isExpanded && (
          <ExpandedArea onClick={(e) => e.stopPropagation()}>
            <Link href={href} passHref legacyBehavior>
              <ActionBtn>
                {actionLabel} <ArrowRight size={12} weight="bold" />
              </ActionBtn>
            </Link>
            <DismissBtn onClick={(e) => dismiss(e, n.id)}>
              <X size={11} style={{ verticalAlign: "middle" }} /> Dismiss
            </DismissBtn>
          </ExpandedArea>
        )}
      </NotificationItem>
    );
  };

  return (
    <FlexCenter>
      <NotificationsWrapper>
        <NotificationsHeader>
          <NotificationsTitle>Notifications</NotificationsTitle>
          {hasUnread && (
            <MarkAllRead onClick={handleMarkAllRead}>Mark all as read</MarkAllRead>
          )}
        </NotificationsHeader>

        {hasUnread && (
          <>
            <SectionLabel>New · {unreadItems.length}</SectionLabel>
            <NotificationList>{unreadItems.map(renderItem)}</NotificationList>
          </>
        )}

        {readItems.length > 0 && (
          <>
            <SectionLabel>{hasUnread ? "Earlier" : "All notifications"}</SectionLabel>
            <NotificationList>{readItems.map(renderItem)}</NotificationList>
          </>
        )}
      </NotificationsWrapper>
    </FlexCenter>
  );
}
