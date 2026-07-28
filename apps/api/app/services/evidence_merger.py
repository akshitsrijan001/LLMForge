from __future__ import annotations

from typing import Any, Dict, Iterable, List, Mapping, Optional


def merge_evidence(items: Iterable[Mapping[str, Any]]) -> List[Dict[str, Any]]:
    """Merge evidence items while preserving order and removing duplicates."""

    merged: List[Dict[str, Any]] = []
    seen: set[str] = set()

    for item in items:
        text = str(item.get("text") or item.get("content") or "").strip()
        if not text:
            continue

        key = text.lower()
        if key in seen:
            continue

        seen.add(key)
        merged.append(
            {
                "text": text,
                "source": item.get("source") or "unknown",
                "metadata": dict(item.get("metadata") or {}),
            }
        )

    return merged


def merge_evidence_with_context(
    evidence_items: Iterable[Mapping[str, Any]],
    context: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """Merge evidence and optionally prepend a context note."""

    merged = merge_evidence(evidence_items)
    if context:
        merged.insert(0, {"text": context, "source": "context", "metadata": {}})
    return merged
