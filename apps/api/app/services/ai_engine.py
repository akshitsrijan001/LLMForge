from typing import Any

from app.services.planner import create_plan
from app.services.context_manager import build_context
from app.services.evidence_merger import merge_evidence
from app.services.critic import critique_response
from app.services.response_formatter import format_response
from app.services.ollama import chat
from app.services.tool_router import select_tool


class AIEngine:

    def generate(
        self,
        model: str,
        prompt: str,
        history: list,
        files: list,
        knowledge_base: str,
        generation_settings: dict,
        web_context: str = "",
    ):

        # -------------------------
        # Planning
        # -------------------------

        plan = create_plan(prompt)
        tool = select_tool(plan)

        if tool:
            return tool.execute(
                prompt=prompt,
                history=history,
                files=files,
                generation_settings=generation_settings,
            )

        print("=" * 60)
        print("🧠 AI PLAN")
        print("=" * 60)
        print(f"Task              : {plan.task}")
        print(f"Needs Web         : {plan.needs_web}")
        print(f"Needs RAG         : {plan.needs_rag}")
        print(f"Needs Code        : {plan.needs_code}")
        print(f"Needs Vision      : {plan.needs_vision}")
        print(f"Needs Image Gen   : {plan.needs_image_generation}")
        print(f"Needs Reasoning   : {plan.needs_reasoning}")
        print(f"Answer Style      : {plan.answer_style}")
        print("=" * 60)

        # -------------------------
        # Context
        # -------------------------

        context = build_context(history)

        # -------------------------
        # Evidence
        # -------------------------

        evidence = merge_evidence([])

        # -------------------------
        # Final Prompt
        # -------------------------

        llm_prompt = f"""
You are LLMForge.

Answer the user's question naturally.

If verified web search results are available, use them.

Never mention:
- web search
- provided context
- retrieved documents
- sources
- chunks
- prompt builder

Never list file names.

Never explain your reasoning.

Return ONLY the final answer.

========================
WEB SEARCH
========================

{web_context}

========================
QUESTION
========================

{prompt}
"""

        # -------------------------
        # LLM
        # -------------------------

        stream = chat(
            model=model,
            prompt=llm_prompt,
            user_query=prompt,
            history=context,
            files=files,
            knowledge_base=knowledge_base,
            generation_settings=generation_settings,
        )

        return stream