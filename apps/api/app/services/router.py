def choose_model(prompt: str, user_choice: str):

    # -----------------------------
    # Manual selection
    # -----------------------------
    if user_choice != "auto":
        print(f"🧠 Manual Model → {user_choice}")
        return user_choice

    prompt = prompt.lower()

    # -----------------------------
    # Fast everyday tasks
    # -----------------------------
    if any(word in prompt for word in [
        "summarize",
        "summary",
        "translate",
        "email",
        "grammar",
        "rewrite",
        "improve writing",
        "explain simply",
        "short answer",
        "hello",
        "hi",
        "thanks",
    ]):
        print("⚡ Auto Router → gemma3:1b")
        return "gemma3:1b"

    # -----------------------------
    # Coding & debugging
    # -----------------------------
    if any(word in prompt for word in [
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
    ]):
        print("💻 Auto Router → qwen2.5-coder:3b")
        return "qwen2.5-coder:3b"

    # -----------------------------
    # Long / complex prompts
    # -----------------------------
    if len(prompt) > 1500:
        print("🚀 Auto Router → llama3.1:8b")
        return "llama3.1:8b"

    # -----------------------------
    # Default
    # -----------------------------
    print("⚡ Auto Router → gemma3:1b")
    return "gemma3:1b"