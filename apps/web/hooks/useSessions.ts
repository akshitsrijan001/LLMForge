import { useEffect, useState } from "react";
import { ChatSession } from "../types/session";
import { Message } from "../types/chat";

const STORAGE_KEY = "llmforge-sessions";

export function useSessions() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      const first = createEmptySession();

      setSessions([first]);
      setCurrentId(first.id);

      return;
    }

    const parsed: ChatSession[] = JSON.parse(saved);

    setSessions(parsed);

    if (parsed.length > 0) {
      if (parsed.length > 0) {
  setCurrentId(parsed[0]!.id);
}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sessions)
    );
  }, [sessions]);

  function createEmptySession(): ChatSession {
    return {
      id: crypto.randomUUID(),
      title: "New Chat",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
      pinned:false,
    };
  }

  function togglePin(id: string) {
  setSessions(prev =>
    prev.map(session =>
      session.id === id
        ? {
            ...session,
            pinned: !session.pinned,
          }
        : session
    )
  );
}

  function newSession() {
    const session = createEmptySession();

    setSessions((prev) => [session, ...prev]);
    setCurrentId(session.id);
  }

  function deleteSession(id: string) {
    const filtered = sessions.filter((s) => s.id !== id);

    setSessions(filtered);

    if (filtered.length > 0) {
      const first = filtered.at(0);

if (first) {
  setCurrentId(first.id);
}
    }
  }

  function renameSession(id: string, title: string) {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, title } : s
      )
    );
  }

  function updateMessages(messages: Message[]) {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === currentId
          ? {
              ...s,
              messages,
              updatedAt: Date.now(),
              title:
                s.title === "New Chat" && messages.length > 0
                  ? (messages[0]?.content ?? "New Chat").slice(0, 35)
                  : s.title,
            }
          : s
      )
    );
  }

  const current =
    sessions.find((s) => s.id === currentId) ?? null;

  function saveMessages(id: string, messages: Message[]) {
  setSessions((prev) =>
    prev.map((session) => {
      if (session.id !== id) return session;

      let title = session.title;

      const firstMessage = messages[0];

if (
  title === "New Chat" &&
  firstMessage?.role === "user"
) {
  title = firstMessage.content
    .trim()
    .slice(0, 35);
}

      return {
        ...session,
        messages,
        title,
        updatedAt: Date.now(),
      };
    })
  );
}

  return {
    sessions,
    current,
    currentId,
    setCurrentId,
    newSession,
    deleteSession,
    renameSession,
    updateMessages,
    saveMessages,
    togglePin,
  };
}