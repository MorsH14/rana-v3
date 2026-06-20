"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ChatCircleDots, PaperPlaneRight } from "@phosphor-icons/react/dist/ssr";
import { getSession } from "@/lib/auth";
import {
  fetchConversations,
  fetchMessages,
  markMessagesRead,
  sendMessage as sendMsg,
  subscribeToMessages,
  type UIConversation,
  type UIMessage,
} from "@/lib/messages";
import {
  MessagesLayout,
  ConvoListPanel,
  ConvoListHeader,
  ConvoListTitle,
  ConvoList,
  ConvoItem,
  ConvoAvatar,
  ConvoMeta,
  ConvoTopRow,
  ConvoName,
  ConvoTime,
  ConvoPreview,
  UnreadBadge,
  ChatPanel,
  ChatHeader,
  BackButton,
  ChatHeaderInfo,
  ChatHeaderName,
  ChatHeaderSub,
  ChatMessages,
  MessageGroup,
  Bubble,
  BubbleTime,
  ChatInputRow,
  MessageInput,
  SendButton,
  EmptyChat,
} from "./messages.styles";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<UIConversation[]>([]);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    getSession().then(async (session) => {
      if (!session) return;
      setUserId(session.user.id);
      const convos = await fetchConversations(session.user.id);
      setConversations(convos);
    });
  }, []);

  useEffect(() => () => { unsubRef.current?.(); }, []);

  const openConvo = useCallback(
    async (id: string) => {
      if (!userId) return;
      setActiveId(id);
      setDraft("");
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
      );

      const msgs = await fetchMessages(id, userId);
      setMessages(msgs);
      await markMessagesRead(id, userId);

      unsubRef.current?.();
      unsubRef.current = subscribeToMessages(
        id,
        (newMsg) => {
          setMessages((prev) => {
            if (newMsg.senderId === "me") {
              const idx = prev.findIndex(
                (m) => m.id.startsWith("optimistic-") && m.text === newMsg.text
              );
              if (idx !== -1) {
                const updated = [...prev];
                updated[idx] = newMsg;
                return updated;
              }
            }
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          setConversations((prev) =>
            prev.map((c) =>
              c.id === id ? { ...c, lastMessage: newMsg.text, lastTime: newMsg.time } : c
            )
          );
        },
        userId
      );
    },
    [userId]
  );

  const sendMessage = useCallback(async () => {
    if (!draft.trim() || !activeId || !userId) return;
    const text = draft.trim();
    const now = new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });

    const optimisticId = `optimistic-${Date.now()}`;
    setMessages((prev) => [...prev, { id: optimisticId, senderId: "me", text, time: now }]);
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, lastMessage: text, lastTime: now } : c))
    );
    setDraft("");
    inputRef.current?.focus();

    await sendMsg(activeId, userId, text);
  }, [draft, activeId, userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const activeConvo = conversations.find((c) => c.id === activeId) ?? null;
  const isMobileChat = activeId !== null;

  return (
    <MessagesLayout>
      {/* ── Conversation list ── */}
      <ConvoListPanel hidden={isMobileChat}>
        <ConvoListHeader>
          <ConvoListTitle>Messages</ConvoListTitle>
        </ConvoListHeader>
        <ConvoList>
          {conversations.length === 0 ? (
            <EmptyChat style={{ padding: "48px 20px" }}>
              <ChatCircleDots size={40} weight="thin" />
              <p>No conversations yet</p>
            </EmptyChat>
          ) : (
            conversations.map((convo) => (
              <ConvoItem
                key={convo.id}
                active={activeId === convo.id}
                onClick={() => openConvo(convo.id)}
              >
                <ConvoAvatar bg={convo.avatarColor}>{convo.initials}</ConvoAvatar>
                <ConvoMeta>
                  <ConvoTopRow>
                    <ConvoName unread={convo.unread > 0}>{convo.name}</ConvoName>
                    <ConvoTime>{convo.lastTime}</ConvoTime>
                  </ConvoTopRow>
                  <ConvoPreview unread={convo.unread > 0}>{convo.lastMessage}</ConvoPreview>
                </ConvoMeta>
                {convo.unread > 0 && <UnreadBadge>{convo.unread}</UnreadBadge>}
              </ConvoItem>
            ))
          )}
        </ConvoList>
      </ConvoListPanel>

      {/* ── Chat panel ── */}
      <ChatPanel hidden={!isMobileChat}>
        {activeConvo ? (
          <>
            <ChatHeader>
              <BackButton onClick={() => setActiveId(null)}>
                <ArrowLeft size={20} weight="bold" />
              </BackButton>
              <ConvoAvatar bg={activeConvo.avatarColor} style={{ width: 38, height: 38, fontSize: 12 }}>
                {activeConvo.initials}
              </ConvoAvatar>
              <ChatHeaderInfo>
                <ChatHeaderName>{activeConvo.name}</ChatHeaderName>
                <ChatHeaderSub>Re: {activeConvo.jobTitle}</ChatHeaderSub>
              </ChatHeaderInfo>
            </ChatHeader>

            <ChatMessages>
              {messages.map((msg) => {
                const mine = msg.senderId === "me";
                return (
                  <MessageGroup key={msg.id} mine={mine}>
                    <Bubble mine={mine}>{msg.text}</Bubble>
                    <BubbleTime>{msg.time}</BubbleTime>
                  </MessageGroup>
                );
              })}
              <div ref={bottomRef} />
            </ChatMessages>

            <ChatInputRow>
              <MessageInput
                ref={inputRef}
                placeholder="Type a message..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <SendButton canSend={draft.trim().length > 0} onClick={sendMessage}>
                <PaperPlaneRight size={18} weight="fill" />
              </SendButton>
            </ChatInputRow>
          </>
        ) : (
          <EmptyChat>
            <ChatCircleDots size={52} weight="thin" />
            <p>Select a conversation to start chatting</p>
          </EmptyChat>
        )}
      </ChatPanel>
    </MessagesLayout>
  );
}
