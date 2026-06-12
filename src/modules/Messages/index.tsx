"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChatCircleDots, PaperPlaneRight } from "@phosphor-icons/react/dist/ssr";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import { messagesData, type Conversation, type ChatMessage } from "@/db";
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
  const [conversations, setConversations] = useLocalStorage<Conversation[]>(
    "rana-conversations",
    messagesData
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeConvo = conversations.find((c) => c.id === activeId) ?? null;
  const isMobileChat = activeId !== null;

  const openConvo = (id: string) => {
    setActiveId(id);
    setDraft("");
    // mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const sendMessage = () => {
    if (!draft.trim() || !activeId) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      text: draft.trim(),
      time: new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text, lastTime: newMsg.time }
          : c
      )
    );
    setDraft("");
    inputRef.current?.focus();
  };

  // scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvo?.messages.length]);

  return (
    <MessagesLayout>
      {/* ── Conversation list ── */}
      <ConvoListPanel hidden={isMobileChat}>
        <ConvoListHeader>
          <ConvoListTitle>Messages</ConvoListTitle>
        </ConvoListHeader>
        <ConvoList>
          {conversations.map((convo) => (
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
          ))}
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
              {activeConvo.messages.map((msg) => {
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
