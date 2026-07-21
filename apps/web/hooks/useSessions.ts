import { useEffect, useState } from "react";
import { ChatSession } from "../types/session";
import {
  createSession as createSessionApi,
  getSessions,
  deleteSession as deleteSessionApi,
} from "../services/api.service";

export function useSessions() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {
    const backendSessions = await getSessions();

    if (backendSessions.length === 0) {
      await newSession();
      return;
    }

    const formatted: ChatSession[] = backendSessions.map((s: any) => ({
      id: s.id,
      title: s.title,
      createdAt: new Date(s.created_at).getTime(),
      updatedAt: new Date(s.updated_at).getTime(),
      pinned: false,
    }));

    setSessions(formatted);
    setCurrentId(formatted[0]?.id ?? "");
  }

  async function newSession() {
    const created = await createSessionApi();

    const session: ChatSession = {
      id: created.id,
      title: "New Chat",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      pinned: false,
    };

    setSessions((prev) => [session, ...prev]);
    setCurrentId(session.id);
  }

  async function deleteSession(id: string) {
    await deleteSessionApi(id);

    const updated = sessions.filter((s) => s.id !== id);

    setSessions(updated);

    if (currentId === id) {
      setCurrentId(updated[0]?.id ?? "");
    }
  }

  function renameSession(id: string, title: string) {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              title,
            }
          : s
      )
    );
  }

  function togglePin(id: string) {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              pinned: !s.pinned,
            }
          : s
      )
    );
  }

  const current =
    sessions.find((s) => s.id === currentId) ?? null;

  return {
    sessions,
    current,
    currentId,
    setCurrentId,
    newSession,
    deleteSession,
    renameSession,
    togglePin,
  };
}