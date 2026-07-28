from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Any, Dict, List, Mapping, Optional


@dataclass(slots=True)
class CriticResult:
    score: int
    feedback: str
    passed: bool

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


def critique_response(
    prompt: str,
    answer: str,
    evidence: Optional[List[Mapping[str, Any]]] = None,
) -> CriticResult:
    """Return a lightweight quality assessment for a generated response."""

    normalized_prompt = (prompt or "").strip().lower()
    normalized_answer = (answer or "").strip()
    evidence_count = len(evidence or [])

    score = 60

    if normalized_answer:
        score += 20
    if evidence_count > 0:
        score += 10
    if any(keyword in normalized_prompt for keyword in ["compare", "analyze", "debug", "solve", "reason"]):
        score += 10

    if score >= 80:
        feedback = "The response is well-formed and supported by available evidence."
        passed = True
    elif score >= 65:
        feedback = "The response is acceptable, but it could be more specific or better supported."
        passed = True
    else:
        feedback = "The response is too sparse and should be expanded with more detail or evidence."
        passed = False

    return CriticResult(score=min(score, 100), feedback=feedback, passed=passed)
