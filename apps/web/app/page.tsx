"use client";

import { useState, useCallback } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import Hero from "../components/chat/Hero";
import QuickActions from "../components/chat/QuickActions";
import RightSidebar from "../components/layout/RightSidebar";

import { useSessions } from "../hooks/useSessions";
import { useChat } from "../hooks/useChat";

export default function Home() {
  const {
    sessions,
    current,
    currentId,
    setCurrentId,
    newSession,
    deleteSession,
    renameSession,
    saveMessages,
    togglePin,
  } = useSessions();

  const handleMessagesChange = useCallback(
    (newMessages: any[]) => {
      if (current) {
        saveMessages(current.id, newMessages);
      }
    },
    [current, saveMessages]
  );

  const {
    messages,
    ask,
    stop,
    loading,
  } = useChat(
    current?.messages ?? [],
    handleMessagesChange
  );

  const [selectedModel, setSelectedModel] = useState("auto");

  return (
    <main
      style={{
        display: "flex",
        height: "100vh",
        background: "#0B1020",
        color: "white",
      }}
    >
      <Sidebar
        sessions={sessions}
        currentId={currentId}
        setCurrentId={setCurrentId}
        newSession={newSession}
        deleteSession={deleteSession}
        renameSession={renameSession}
        togglePin={togglePin}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header
          model={selectedModel}
          setModel={setSelectedModel}
        />

        <div className="flex-1 flex flex-col px-10 pt-20">
          {messages.length === 0 && (
            <>
              <Hero />

              <QuickActions
                onAction={(prompt) =>
                  ask(prompt, selectedModel)
                }
              />
            </>
          )}

          

          <ChatWindow
            messages={messages}
            loading={loading}
          />
        </div>

        <ChatInput
          ask={ask}
          stop={stop}
          loading={loading}
          model={selectedModel}
        />
      </div>

      <RightSidebar />
    </main>
  );
}