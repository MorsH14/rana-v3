"use client";

import Link from "next/link";
import { Bell, Briefcase, Star, Info, ArrowRight, X } from "@phosphor-icons/react/dist/ssr";
import { notificationsData } from "@/db";
import { COLORS } from "@/utils/colors.util";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import { useState } from "react";
import { FlexCenter } from "@/styles/globals.styles";
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

type Notification = (typeof notificationsData)[number] & { read: boolean };

const TYPE_CONFIG: Record<
  string,
  { icon: React.ReactNode; bg: string; actionLabel: string; actionHref: string }
> = {
  application: {
    icon: <Briefcase size={18} color={COLORS.white100} weight="fill" />,
    bg: COLORS.Blue500,
    actionLabel: "Open Messages",
    actionHref: "/Messages",
  },
  job: {
    icon: <Bell size={18} color={COLORS.white100} weight="fill" />,
    bg: COLORS.Green100,
    actionLabel: "Browse listings",
    actionHref: "/",
  },
  interview: {
    icon: <Star size={18} color={COLORS.white100} weight="fill" />,
    bg: "#F59E0B",
    actionLabel: "View profile",
    actionHref: "/profile",
  },
  system: {
    icon: <Info size={18} color={COLORS.white100} weight="fill" />,
    bg: COLORS.SolidGray400,
    actionLabel: "Update profile",
    actionHref: "/profile",
  },
};

function getConfig(type: string) {
  return TYPE_CONFIG[type] ?? TYPE_CONFIG.system;
}

export default function NotificationsPage() {
  const [items, setItems] = useLocalStorage<Notification[]>(
    "rana-notifications",
    notificationsData.map((n) => ({ ...n }))
  );
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const unreadItems = items.filter((n) => !n.read);
  const readItems = items.filter((n) => n.read);
  const hasUnread = unreadItems.length > 0;

  const handleTap = (id: number) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const dismiss = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setItems((prev) => prev.filter((n) => n.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    setExpandedId(null);
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

  const renderItem = (n: Notification) => {
    const { icon, bg, actionLabel, actionHref } = getConfig(n.type);
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
            <Link href={actionHref} passHref legacyBehavior>
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
            <MarkAllRead onClick={markAllRead}>Mark all as read</MarkAllRead>
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
