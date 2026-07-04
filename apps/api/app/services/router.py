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
    "javascript",
    "typescript",
    "react",
    "next",
    "node",
    "html",
    "css",
    "tailwind",
    "sql",
    "database",
    "fastapi",
    "django",
    "flask",
    "api",
    "bug",
    "debug",
    "fix",
    "error",
    "stack trace",
    "exception",
    "algorithm",
    "leetcode",
    "code",
    "function",
    "class",
    "cpp",
    "c++",
}

WRITING_KEYWORDS = {
    "summarize",
    "summary",
    "rewrite",
    "grammar",
    "email",
    "essay",
    "paragraph",
    "translate",
    "improve",
    "explain simply",
}


def choose_model(prompt: str, user_choice: str) -> str:
    """
    Smart model router.

    Priority:
    1. Manual selection
    2. Greetings
    3. Coding
    4. Long reasoning
    5. Writing
    6. Default
    """

    if user_choice != "auto":
        return user_choice

    lower = prompt.lower().strip()

    # Casual conversation
    if lower in GREETINGS:
        return "gemma3:1b"

    # Coding
    if any(keyword in lower for keyword in CODING_KEYWORDS):
        return "qwen2.5-coder:3b"

    # Long reasoning
    if len(prompt) > 1200:
        return "qwen2.5-coder:3b"

    # Writing
    if any(keyword in lower for keyword in WRITING_KEYWORDS):
        return "gemma3:1b"

    # Default
    return "gemma3:1b"