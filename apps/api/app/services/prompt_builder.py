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

GREETINGS = {
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

CODING_KEYWORDS = {
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
}

WEB_KEYWORDS = {
    "react",
    "next",
    "tailwind",
    "frontend",
    "css",
    "html",
    "javascript",
    "typescript",
}

AI_KEYWORDS = {
    "llm",
    "machine learning",
    "deep learning",
    "ai",
    "neural",
    "transformer",
}


def build_messages(
    history: List[dict],
    prompt: str,
    files: List[dict] | None = None,
    web_context: str = "",
    rag_context: str = "",
):
    if files is None:
        files = []

    lower = prompt.lower().strip()

    if lower in GREETINGS:
        return [
            {
                "role": "system",
                "content": (
                    "You are LLMForge, a friendly AI assistant.\n"
                    "Reply naturally.\n"
                    "Do not generate code unless the user asks for it.\n"
                    "Keep greetings short."
                ),
            },
            *history[-8:],
            {
                "role": "user",
                "content": prompt,
            },
        ]

    system_prompt = BASE_SYSTEM_PROMPT

    if web_context:
        system_prompt += f"\n\n### Web Search Context\n{web_context}"

    if rag_context:
        system_prompt += f"\n\n### Knowledge Base Context\n{rag_context}"

    if any(word in lower for word in CODING_KEYWORDS):
        system_prompt += "\n" + CODING_PROMPT

    if any(word in lower for word in WEB_KEYWORDS):
        system_prompt += "\n" + WEB_PROMPT

    if any(word in lower for word in AI_KEYWORDS):
        system_prompt += "\n" + AI_PROMPT

    messages = [
        {
            "role": "system",
            "content": system_prompt,
        }
    ]

    messages.extend(history[-8:])

    if files:

        document_context = "\n\n".join(
            f"===== DOCUMENT {i}: {file['name']} =====\n{file['text']}"
            for i, file in enumerate(files, start=1)
        )

        messages.append(
            {
                "role": "system",
                "content": f"Uploaded Documents:\n\n{document_context}",
            }
        )

    messages.append(
        {
            "role": "user",
            "content": prompt,
        }
    )

    return messages