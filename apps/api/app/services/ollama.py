import json
import requests

from app.services.prompt_builder import build_messages
from app.services.dspy_service import optimize_prompt
from app.core.config import settings


def check_connection():
    try:
        response = requests.get(f"{settings.OLLAMA_URL}/api/tags")
        return response.status_code == 200
    except Exception:
        return False


def installed_models():
    try:
        response = requests.get(f"{settings.OLLAMA_URL}/api/tags")
        return response.json()
    except Exception:
        return None


SYSTEM_PROMPT = """
You are LLMForge, an expert AI software engineer and technical assistant.

Rules:
- Give accurate and practical answers.
- Think step by step before answering.
- Explain concepts before writing code.
- Use GitHub Flavored Markdown.
- Wrap every code example inside fenced Markdown code blocks.
- Always specify the programming language.
- Prefer concise answers unless the user asks for more detail.
- Follow clean coding practices.
"""


def chat(
    model: str,
    prompt: str,
    history: list,
    files: list = [],
    generation_settings: dict | None = None,
):

    coding_keywords = [
        "python",
        "java",
        "react",
        "next",
        "fastapi",
        "bug",
        "debug",
        "error",
        "fix",
        "code",
        "algorithm",
        "typescript",
        "javascript",
        "html",
        "css",
        "sql",
    ]

    # DSPy optimization
    if any(word in prompt.lower() for word in coding_keywords):
        try:
            print("🧠 DSPy Optimizing...")
            optimized_prompt = optimize_prompt(prompt, model)
        except Exception as e:
            print("⚠️ DSPy Failed:", e)
            optimized_prompt = prompt
    else:
        optimized_prompt = prompt

    print("Original :", prompt)
    print("Optimized:", optimized_prompt)

    messages = build_messages(
        history,
        optimized_prompt,
        files,
    )

    # -----------------------------
    # RAG Retrieval
    # -----------------------------
    context = ""

    try:
        from app.rag.retriever import retrieve

        docs = retrieve(prompt)

        if docs:
            context = "\n\n".join(docs)

    except Exception as e:
        print("Retriever:", e)

    if context:

        rag_prompt = f"""
You are answering using information retrieved from the user's knowledge base.

If the answer exists in the context below,
answer ONLY using that information.

If the context does not contain the answer,
say you don't know.

======== CONTEXT ========

{context}

=========================
"""

    messages.insert(
        1,
        {
            "role": "system",
            "content": rag_prompt,
        },
    )

    # -----------------------------
    # Generation Settings
    # -----------------------------
    gen_settings = generation_settings or {}

    temperature = gen_settings.get("temperature", 0.4)
    top_p = gen_settings.get("topP", 0.95)
    num_ctx = gen_settings.get("context", 4096)

    print("========== SETTINGS ==========")
    print("Temperature:", temperature)
    print("Top P:", top_p)
    print("Context:", num_ctx)
    print("==============================")

    try:

        print(f"🤖 Model: {model}")
        print(f"📝 Prompt length: {len(prompt)}")
        print(f"💬 History messages: {len(history)}")
        print(f"📄 Uploaded files: {len(files)}")

        response = requests.post(
            f"{settings.OLLAMA_URL}/api/chat",
            json={
                "model": model,
                "messages": messages,
                "stream": True,
                "keep_alive": "30m",
                "options": {
                    "temperature": temperature,
                    "top_p": top_p,
                    "num_ctx": num_ctx,
                    "num_predict": 512,
                },
            },
            stream=True,
            timeout=300,
        )

        response.raise_for_status()

        for line in response.iter_lines(decode_unicode=True):

            if not line:
                continue

            chunk = json.loads(line)

            if chunk.get("done"):
                break

            if "message" in chunk:

                text = chunk["message"].get("content", "")

                if text:
                    yield text

        print("✅ Response completed.")

    except requests.Timeout:
        yield "⚠️ Model timed out."

    except Exception as e:
        print(e)
        yield f"⚠️ Error: {e}"