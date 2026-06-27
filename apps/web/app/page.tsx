"use client";

import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import Hero from "../components/chat/Hero";
import QuickActions from "../components/chat/QuickActions";
import RightSidebar from "../components/layout/RightSidebar";

import { useChat } from "../hooks/useChat";

export default function Home() {

  const { messages, ask, loading } = useChat();

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
      <Sidebar />

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

        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-10 pt-20">

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
        </div>

        <ChatInput
          ask={ask}
          loading={loading}
          model={selectedModel}
        />

      </div>

      <RightSidebar />
    </main>
  );
}