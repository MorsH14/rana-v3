"use client";

import styled from "@emotion/styled";
import { COLORS } from "@/utils/colors.util";

export const NotificationsWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 48px auto;
  padding: 0 16px;
`;

export const NotificationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const NotificationsTitle = styled.h1`
  font-family: Inter, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: ${COLORS.NeutralSolidGray900};
  margin: 0;
`;

export const MarkAllRead = styled.button`
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: ${COLORS.Blue500};
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.15s;

  &:hover {
    background: ${COLORS.NeutralSolid25};
  }
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NotificationItem = styled.div<{ unread?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background: ${({ unread }) => (unread ? COLORS.NeutralSolid25 : COLORS.white100)};
  border-radius: 12px;
  border: 1px solid ${COLORS.NeutralSolid50};
  border-left: ${({ unread }) => (unread ? `3px solid ${COLORS.Blue500}` : `1px solid ${COLORS.NeutralSolid50}`)};
  cursor: pointer;
  transition: box-shadow 0.15s, transform 0.15s;

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.07);
    transform: translateY(-1px);
  }
`;

export const IconCircle = styled.div<{ bg: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const NotificationBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NotificationTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
`;

export const NotificationItemTitle = styled.span<{ unread?: boolean }>`
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: ${({ unread }) => (unread ? 600 : 500)};
  color: ${COLORS.NeutralSolidGray900};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NotificationTime = styled.span`
  font-family: Inter, sans-serif;
  font-size: 11px;
  color: ${COLORS.SolidGray300};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const NotificationMessage = styled.p`
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: ${COLORS.SolidGray400};
  line-height: 1.5;
  margin: 0;
`;

export const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${COLORS.Blue500};
  flex-shrink: 0;
  margin-top: 6px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 64px 24px;
  color: ${COLORS.SolidGray400};

  p {
    font-family: Inter, sans-serif;
    font-size: 14px;
    margin-top: 12px;
  }
`;

export const SectionLabel = styled.div`
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${COLORS.SolidGray300};
  margin: 20px 0 8px;
`;
