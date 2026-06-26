"use client";

import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  return (
    <div className="mt-10 max-w-5xl mx-auto space-y-6">

      <MessageBubble
        role="user"
        content="Can you help me design a FastAPI architecture using Redis and WebSockets?"
      />

      <MessageBubble
        role="assistant"
        content={`Absolutely!

Redis Pub/Sub combined with FastAPI WebSockets is an excellent architecture for low-latency AI applications.

### Suggested Stack

• FastAPI
• Redis
• WebSockets
• PostgreSQL

This architecture scales horizontally and supports real-time updates.`}
      />

    </div>
  );
}