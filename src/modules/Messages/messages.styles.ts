"use client";

import styled from "@emotion/styled";
import { COLORS } from "@/utils/colors.util";

export const MessagesLayout = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  overflow: hidden;

  @media screen and (max-width: 768px) {
    /* subtract top header (0, no header) + bottom footer (60px) */
    height: calc(100svh - 60px);
  }
`;

/* ── Conversation list panel ── */
export const ConvoListPanel = styled.div<{ hidden?: boolean }>`
  width: 340px;
  flex-shrink: 0;
  border-right: 1px solid ${COLORS.NeutralSolid50};
  display: flex;
  flex-direction: column;
  background: white;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
    display: ${({ hidden }) => (hidden ? "none" : "flex")};
  }
`;

export const ConvoListHeader = styled.div`
  padding: 20px 16px 12px;
  border-bottom: 1px solid ${COLORS.NeutralSolid50};

  @media screen and (max-width: 768px) {
    padding: 16px 16px 12px;
  }
`;

export const ConvoListTitle = styled.h2`
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  margin: 0;
`;

export const ConvoList = styled.div`
  overflow-y: auto;
  flex: 1;
`;

export const ConvoItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  background: ${({ active }) => (active ? COLORS.NeutralSolid25 : "white")};
  border-left: 3px solid ${({ active }) => (active ? COLORS.NeutralSolidGray900 : "transparent")};
  transition: background 0.12s;

  &:hover {
    background: ${COLORS.NeutralSolid25};
  }
`;

export const ConvoAvatar = styled.div<{ bg: string }>`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  flex-shrink: 0;
`;

export const ConvoMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ConvoTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
`;

export const ConvoName = styled.span<{ unread?: boolean }>`
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: ${({ unread }) => (unread ? 700 : 500)};
  color: ${COLORS.NeutralSolidGray900};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
`;

export const ConvoTime = styled.span`
  font-family: Inter, sans-serif;
  font-size: 11px;
  color: ${COLORS.SolidGray300};
  white-space: nowrap;
`;

export const ConvoPreview = styled.div<{ unread?: boolean }>`
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: ${({ unread }) => (unread ? COLORS.NeutralSolidGray900 : COLORS.SolidGray400)};
  font-weight: ${({ unread }) => (unread ? 500 : 400)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UnreadBadge = styled.div`
  min-width: 20px;
  height: 20px;
  border-radius: 99px;
  background: ${COLORS.NeutralSolidGray900};
  color: white;
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  flex-shrink: 0;
`;

/* ── Chat panel ── */
export const ChatPanel = styled.div<{ hidden?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${COLORS.NeutralSolid0};

  @media screen and (max-width: 768px) {
    display: ${({ hidden }) => (hidden ? "none" : "flex")};
    width: 100%;
  }
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: white;
  border-bottom: 1px solid ${COLORS.NeutralSolid50};
  flex-shrink: 0;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${COLORS.SolidGray700};
  padding: 4px;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const ChatHeaderInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChatHeaderName = styled.div`
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
`;

export const ChatHeaderSub = styled.div`
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: ${COLORS.SolidGray400};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MessageGroup = styled.div<{ mine?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ mine }) => (mine ? "flex-end" : "flex-start")};
  gap: 2px;
  max-width: 72%;
  align-self: ${({ mine }) => (mine ? "flex-end" : "flex-start")};
`;

export const Bubble = styled.div<{ mine?: boolean }>`
  padding: 10px 14px;
  border-radius: ${({ mine }) =>
    mine ? "18px 18px 4px 18px" : "18px 18px 18px 4px"};
  background: ${({ mine }) => (mine ? COLORS.NeutralSolidGray900 : "white")};
  color: ${({ mine }) => (mine ? "white" : COLORS.NeutralSolidGray900)};
  font-family: Inter, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: ${({ mine }) => (mine ? "none" : "0 1px 4px rgba(0,0,0,0.06)")};
  border: ${({ mine }) => (mine ? "none" : `1px solid ${COLORS.NeutralSolid50}`)};
  word-break: break-word;
`;

export const BubbleTime = styled.div`
  font-family: Inter, sans-serif;
  font-size: 10px;
  color: ${COLORS.SolidGray300};
  padding: 0 4px;
`;

export const ChatInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: white;
  border-top: 1px solid ${COLORS.NeutralSolid50};
  flex-shrink: 0;
`;

export const MessageInput = styled.input`
  flex: 1;
  height: 46px;
  border: 1.5px solid ${COLORS.NeutralSolid50};
  border-radius: 99px;
  padding: 0 18px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  outline: none;
  background: ${COLORS.NeutralSolid0};
  color: ${COLORS.NeutralSolidGray900};
  transition: border-color 0.15s;

  &::placeholder {
    color: ${COLORS.SolidGray300};
  }

  &:focus {
    border-color: ${COLORS.NeutralSolidGray900};
    background: white;
  }
`;

export const SendButton = styled.button<{ canSend?: boolean }>`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: ${({ canSend }) => (canSend ? COLORS.NeutralSolidGray900 : COLORS.NeutralSolid50)};
  color: ${({ canSend }) => (canSend ? "white" : COLORS.SolidGray300)};
  cursor: ${({ canSend }) => (canSend ? "pointer" : "default")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
`;

/* ── Empty state ── */
export const EmptyChat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
  padding: 40px;
  color: ${COLORS.SolidGray400};

  p {
    font-family: Inter, sans-serif;
    font-size: 14px;
    margin: 0;
  }
`;
