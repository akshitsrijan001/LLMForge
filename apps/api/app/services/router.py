def choose_model(prompt: str, user_choice: str):
    """
    Smart model router.

    Priority:
    1. Manual selection
    2. Greetings / casual chat
    3. Coding
    4. Long reasoning
    5. Writing / summaries
    6. Default
    """

    # -----------------------
    # Manual selection
    # -----------------------
    if user_choice != "auto":
        print(f"🧠 Manual -> {user_choice}")
        return user_choice

    lower = prompt.lower().strip()

    # -----------------------
    # Greetings / Casual chat
    # -----------------------
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

    if lower in greetings:
        print("🙂 Casual Chat -> llama3.1:8b")
        return "llama3.1:8b"

    # -----------------------
    # Coding
    # -----------------------
    coding = [
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
    ]

    if any(word in lower for word in coding):
        print("💻 Coding -> qwen2.5-coder:3b")
        return "qwen2.5-coder:3b"

    # -----------------------
    # Long reasoning
    # -----------------------
    if len(prompt) > 1200:
        print("🧠 Long Prompt -> llama3.1:8b")
        return "llama3.1:8b"

    # -----------------------
    # Writing
    # -----------------------
    writing = [
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
    ]

    if any(word in lower for word in writing):
        print("✍️ Writing -> gemma3:1b")
        return "gemma3:1b"

    # -----------------------
    # Default
    # -----------------------
    print("🧠 Default -> llama3.1:8b")
    return "llama3.1:8b"