# app/services/router.py

from typing import Dict

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
    "bye",
    "goodbye",
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
    "git",
    "github",
}

WRITING_KEYWORDS = {
    "email",
    "essay",
    "rewrite",
    "grammar",
    "translate",
    "summarize",
    "summary",
    "paragraph",
    "improve writing",
    "cover letter",
    "resume",
}

AI_KEYWORDS = {
    "llm",
    "rag",
    "embedding",
    "transformer",
    "attention",
    "deep learning",
    "machine learning",
    "artificial intelligence",
    "neural network",
    "langchain",
    "dspy",
    "vector database",
}

MATH_KEYWORDS = {
    "calculate",
    "equation",
    "matrix",
    "probability",
    "statistics",
    "solve",
    "integral",
    "derivative",
    "algebra",
    "geometry",
}

BRAINSTORM_KEYWORDS = {
    "idea",
    "ideas",
    "startup",
    "business",
    "hackathon",
    "project",
    "architecture",
    "design",
    "roadmap",
    "plan",
    "brainstorm",
}


def _route(model: str, reason: str, category: str) -> Dict[str, str]:
    return {
        "model": model,
        "reason": reason,
        "category": category,
    }


def choose_model(prompt: str, user_choice: str) -> Dict[str, str]:
    """
    Smart Router

    Priority:
    1. Manual selection
    2. Greetings
    3. Coding
    4. AI / ML
    5. Math
    6. Writing
    7. Brainstorming
    8. Long reasoning
    9. Default
    """

    if user_choice != "auto":
        return _route(
            user_choice,
            "User manually selected model",
            "manual",
        )

    lower = prompt.lower().strip()

    # Greetings
    if lower in GREETINGS:
        return _route(
            "gemma3:1b",
            "Greeting detected",
            "conversation",
        )

    # Coding
    if any(keyword in lower for keyword in CODING_KEYWORDS):
        return _route(
            "qwen2.5-coder:3b",
            "Coding task detected",
            "coding",
        )

    # AI / ML
    if any(keyword in lower for keyword in AI_KEYWORDS):
        return _route(
            "llama3.1:8b",
            "AI/ML topic detected",
            "ai",
        )

    # Math / Logic
    if (
        any(keyword in lower for keyword in MATH_KEYWORDS)
        or any(char.isdigit() for char in prompt)
    ):
        return _route(
            "llama3.1:8b",
            "Mathematical reasoning detected",
            "reasoning",
        )

    # Writing
    if any(keyword in lower for keyword in WRITING_KEYWORDS):
        return _route(
            "mistral:7b",
            "Writing task detected",
            "writing",
        )

    # Brainstorming
    if any(keyword in lower for keyword in BRAINSTORM_KEYWORDS):
        return _route(
            "llama3.1:8b",
            "Creative brainstorming detected",
            "creative",
        )

    # Very long prompts
    if len(prompt) > 1500:
        return _route(
            "llama3.1:8b",
            "Long context detected",
            "reasoning",
        )

    # Default
    return _route(
        "gemma3:1b",
        "General conversation",
        "general",
    )