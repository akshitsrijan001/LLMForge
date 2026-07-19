import { useCallback, useEffect, useState } from "react";

let currentKB = "default";
const listeners = new Set<(kb: string) => void>();

export function useKnowledgeBase() {
  const [knowledgeBase, setKnowledgeBaseState] =
    useState(currentKB);

  const setKnowledgeBase = useCallback((kb: string) => {
    currentKB = kb;

    listeners.forEach((listener) => listener(kb));
  }, []);

  useEffect(() => {
    listeners.add(setKnowledgeBaseState);
    return () => {
      listeners.delete(setKnowledgeBaseState);
    };
  }, []);

  return {
    knowledgeBase,
    setKnowledgeBase,
  };
}
