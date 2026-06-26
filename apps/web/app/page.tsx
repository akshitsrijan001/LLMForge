"use client";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

export default function Home() {
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
        <Header />

        <ChatWindow />

        <ChatInput />
      </div>
    </main>
  );
}