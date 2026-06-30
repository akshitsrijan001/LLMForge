from typing import List

BASE_SYSTEM_PROMPT = """
You are LLMForge, a helpful AI assistant.

General rules:
- Respond naturally to greetings.
- Be conversational.
- Only generate code when the user explicitly asks for code.
- Do not assume every question is about programming.
- If the user is chatting casually, reply casually.
- Use Markdown when helpful.

If documents are provided:
- Use them as your primary source of truth.
- Answer using the document content.
- If the answer is not in the document, clearly say so.
- Do not invent information.
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


def build_messages(
    history: List[dict],
    prompt: str,
    files: List[dict] = [],
):
    system_prompt = BASE_SYSTEM_PROMPT

    lower = prompt.lower().strip()

    greetings = {
        "hi",
        "hello",
        "hey",
        "yo",
        "sup",
        "good morning",
        "good afternoon",
        "good evening",
        "thanks",
        "thank you",
        "what's up",
        "whats up",
    }

    # Casual greeting mode
    if lower in greetings:
        messages = [
            {
                "role": "system",
                "content": (
                    "You are LLMForge, a friendly AI assistant.\n"
                    "Reply naturally.\n"
                    "Do not generate code unless the user asks for it.\n"
                    "Keep greetings short."
                ),
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

    # Coding prompt
    if any(
        word in lower
        for word in [
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
            "fix",
        ]
    ):
        system_prompt += "\n" + CODING_PROMPT

    # Web prompt
    if any(
        word in lower
        for word in [
            "react",
            "next",
            "tailwind",
            "frontend",
            "css",
            "html",
            "javascript",
            "typescript",
        ]
    ):
        system_prompt += "\n" + WEB_PROMPT

    # AI prompt
    if any(
        word in lower
        for word in [
            "llm",
            "machine learning",
            "deep learning",
            "ai",
            "neural",
            "transformer",
        ]
    ):
        system_prompt += "\n" + AI_PROMPT

    messages = [
        {
            "role": "system",
            "content": system_prompt,
        }
    ]

    messages.extend(history[-8:])

    # Uploaded documents
    if files:
        document_context = ""

        for i, file in enumerate(files, start=1):
            document_context += (
                f"\n\n===== DOCUMENT {i}: {file['name']} =====\n"
            )
            document_context += file["text"]

        messages.append(
            {
                "role": "system",
                "content": f"Uploaded Documents:\n{document_context}",
            }
        )

    # IMPORTANT: Always append the user's latest prompt
    messages.append(
        {
            "role": "user",
            "content": prompt,
        }
    )

    return messages