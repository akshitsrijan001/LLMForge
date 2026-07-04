import { useState } from "react";

let currentKB = "default";
const listeners = new Set<(kb: string) => void>();

export function useKnowledgeBase() {
  const [knowledgeBase, setKnowledgeBaseState] =
    useState(currentKB);

  function setKnowledgeBase(kb: string) {
    currentKB = kb;

    listeners.forEach((listener) => listener(kb));
  }

  useState(() => {
    listeners.add(setKnowledgeBaseState);
    return () => listeners.delete(setKnowledgeBaseState);
  });

  return {
    knowledgeBase,
    setKnowledgeBase,
  };
}