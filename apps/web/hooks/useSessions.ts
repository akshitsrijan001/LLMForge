import { useEffect, useState } from "react";
import { ChatSession } from "../types/session";
import { Message } from "../types/chat";

const STORAGE_KEY = "llmforge-sessions";
const ACTIVE_SESSION_KEY = "llmforge-active-session";

export function useSessions() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentId, setCurrentId] = useState("");

  function createEmptySession(): ChatSession {
    return {
      id: crypto.randomUUID(),
      title: "New Chat",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
      pinned: false,
    };
  }

  useEffect(() => {
    const savedSessions = localStorage.getItem(STORAGE_KEY);
    const savedCurrent = localStorage.getItem(ACTIVE_SESSION_KEY);

    if (!savedSessions) {
      const first = createEmptySession();

localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([first])
);

localStorage.setItem(
    ACTIVE_SESSION_KEY,
    first.id
);

setSessions([first]);
setCurrentId(first.id);
      return;
    }

    const parsed: ChatSession[] = JSON.parse(savedSessions);

    setSessions(parsed);

    if (
      savedCurrent &&
      parsed.some((session) => session.id === savedCurrent)
    ) {
      setCurrentId(savedCurrent);
    } else if (parsed.length > 0) {
      setCurrentId(parsed[0]!.id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sessions)
    );
  }, [sessions]);

  useEffect(() => {
    if (currentId) {
      localStorage.setItem(
        ACTIVE_SESSION_KEY,
        currentId
      );
    }
  }, [currentId]);

  function newSession() {
    const session = createEmptySession();

    setSessions((prev) => [session, ...prev]);
    setCurrentId(session.id);
  }

  function deleteSession(id: string) {
    const filtered = sessions.filter(
      (session) => session.id !== id
    );

    if (filtered.length === 0) {
      const session = createEmptySession();

      setSessions([session]);
      setCurrentId(session.id);
      return;
    }

    setSessions(filtered);

    if (currentId === id) {
      setCurrentId(filtered[0]!.id);
    }
  }

  function renameSession(id: string, title: string) {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id
          ? {
              ...session,
              title,
            }
          : session
      )
    );
  }

  function togglePin(id: string) {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id
          ? {
              ...session,
              pinned: !session.pinned,
            }
          : session
      )
    );
  }

  function saveMessages(id: string, messages: Message[]) {
  console.log("SAVE CALLED", id, messages);

  setSessions((prev) => {
    console.log("PREV SESSIONS", prev);

    const updated = prev.map((session) => {
      if (session.id !== id) return session;

      let title = session.title;

      const firstMessage = messages[0];

      if (
        title === "New Chat" &&
        firstMessage?.role === "user"
      ) {
        title = firstMessage.content.trim().slice(0, 35);
      }

      return {
        ...session,
        messages,
        title,
        updatedAt: Date.now(),
      };
    });

    console.log("UPDATED", updated);

    return updated;
  });
}

  const current =
    sessions.find(
      (session) => session.id === currentId
    ) ?? null;

  return {
    sessions,
    current,
    currentId,
    setCurrentId,
    newSession,
    deleteSession,
    renameSession,
    togglePin,
    saveMessages,
  };
}