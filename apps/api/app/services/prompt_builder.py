from typing import List

BASE_SYSTEM_PROMPT = """
You are LLMForge, an expert AI software engineer.

General Rules:
- Think step by step.
- Give accurate answers.
- Explain before writing code.
- Prefer concise responses unless asked otherwise.
- Use GitHub Flavored Markdown.
- Wrap all code inside fenced code blocks.
- Always specify the language.
"""

CODING_PROMPT = """
When writing code:
- Follow clean architecture.
- Use meaningful names.
- Write production-ready code.
- Consider scalability.
- Consider security.
- Consider performance.
"""

WEB_PROMPT = """
When working with web development:
- Prefer React, Next.js and TypeScript.
- Follow modern frontend practices.
- Build responsive UIs.
"""

AI_PROMPT = """
When discussing AI:
- Explain concepts clearly.
- Use practical examples.
- Mention tradeoffs where appropriate.
"""


def build_messages(history: List[dict], prompt: str):
    system_prompt = BASE_SYSTEM_PROMPT

    lower = prompt.lower()

    if any(word in lower for word in [
        "python",
        "java",
        "cpp",
        "c++",
        "fastapi",
        "api",
        "algorithm",
        "code",
        "bug",
        "debug",
    ]):
        system_prompt += "\n" + CODING_PROMPT

    if any(word in lower for word in [
        "react",
        "next",
        "tailwind",
        "frontend",
        "css",
        "html",
        "javascript",
        "typescript",
    ]):
        system_prompt += "\n" + WEB_PROMPT

    if any(word in lower for word in [
        "llm",
        "machine learning",
        "deep learning",
        "ai",
        "neural",
        "transformer",
    ]):
        system_prompt += "\n" + AI_PROMPT

    messages = [
        {
            "role": "system",
            "content": system_prompt,
        }
    ]

    messages.extend(history[-8:])

    messages.append(
        {
            "role": "user",
            "content": prompt,
        }
    )

    return messages