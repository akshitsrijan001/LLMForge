"use client";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import Hero from "../components/chat/Hero";
import QuickActions from "../components/chat/QuickActions";
import { useChat } from "../hooks/useChat";
import RightSidebar from "../components/layout/RightSidebar";

export default function Home() {
  const { messages, ask, loading, } = useChat();
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


<div className="flex-1 overflow-auto">
  <div className="max-w-6xl mx-auto px-10 pt-20">
    {messages.length === 0 && (
  <>
    <Hero />
    <QuickActions />
  </>
)}

    <ChatWindow
  messages={messages}
  loading={loading}
/>



</div>
</div>
<ChatInput ask={ask} />
        

        

        
      </div>
    </main>
  );
}