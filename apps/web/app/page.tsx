"use client";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import Hero from "../components/chat/Hero";
import QuickActions from "../components/chat/QuickActions";

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

<div className="flex-1 overflow-auto p-10">

    <Hero />

    <QuickActions />

    <ChatWindow />

</div>

<ChatInput />
        

        

        
      </div>
    </main>
  );
}