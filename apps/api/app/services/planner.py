from __future__ import annotations

from dataclasses import dataclass, field, asdict
from typing import Any, Dict, List


@dataclass(slots=True)
class PlanStep:
    title: str
    detail: str


@dataclass(slots=True)
class Plan:

    prompt: str

    task: str = "general"

    needs_web: bool = False

    needs_rag: bool = False

    needs_reasoning: bool = False

    needs_code: bool = False

    needs_vision: bool = False

    needs_image_generation: bool = False

    answer_style: str = "normal"

    confidence: float = 0.80

    steps: List[PlanStep] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:

        return asdict(self)


def create_plan(prompt: str) -> Plan:

    prompt = (prompt or "").strip()

    lower = prompt.lower()

    plan = Plan(prompt=prompt)

    # -----------------------------
    # Task Classification
    # -----------------------------

    if any(k in lower for k in ["code", "python", "java", "bug", "fix", "debug"]):
        plan.task = "coding"
        plan.needs_code = True
        plan.needs_reasoning = True

    elif any(k in lower for k in ["compare", "difference", "vs", "versus"]):
        plan.task = "comparison"
        plan.needs_reasoning = True

    elif any(k in lower for k in ["summarize", "summary", "overview", "brief"]):
        plan.task = "summary"

    elif any(k in lower for k in [
            "generate image",
            "create image",
            "draw",
            "illustrate",
            "make an image",
            "image of",
            "picture of",
            "photo of",
            "poster",
            "wallpaper",
            "logo",
            "portrait",
            "art of",
        ]):
                plan.task = "image_generation"
                plan.needs_image_generation = True

    

    elif any(k in lower for k in ["image", "photo", "picture", "diagram", "graph"]):
        plan.task = "vision"
        plan.needs_vision = True

    elif any(k in lower for k in ["research", "latest", "news", "today"]):
        plan.task = "research"
        plan.needs_web = True

    else:
        plan.task = "general"

        

    # -----------------------------
    # Knowledge Base
    # -----------------------------

    if any(k in lower for k in [
        "document",
        "pdf",
        "knowledge base",
        "uploaded",
        "file",
    ]):
        plan.needs_rag = True

    # -----------------------------
    # Style
    # -----------------------------

    if any(k in lower for k in ["essay", "article"]):
        plan.answer_style = "long"

    elif any(k in lower for k in ["table"]):
        plan.answer_style = "table"

    elif any(k in lower for k in ["bullet", "points"]):
        plan.answer_style = "bullet"

    # -----------------------------
    # Steps
    # -----------------------------

    plan.steps.append(
        PlanStep(
            title="Understand Request",
            detail="Identify the user's intent.",
        )
    )

    if plan.needs_web:
        plan.steps.append(
            PlanStep(
                title="Search Web",
                detail="Collect recent information.",
            )
        )

    if plan.needs_rag:
        plan.steps.append(
            PlanStep(
                title="Search Knowledge Base",
                detail="Retrieve relevant documents.",
            )
        )

    if plan.needs_reasoning:
        plan.steps.append(
            PlanStep(
                title="Reason",
                detail="Solve the problem logically.",
            )
        )

    plan.steps.append(
        PlanStep(
            title="Generate Response",
            detail="Produce the final answer.",
        )
    )

    return plan