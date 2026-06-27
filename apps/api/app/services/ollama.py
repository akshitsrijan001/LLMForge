import requests
from app.services.prompt_builder import build_messages
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
- Use headings and bullet lists where appropriate.
- Wrap every code example inside fenced Markdown code blocks.
- Always specify the programming language.
- Prefer concise answers unless the user asks for more detail.
- Follow clean coding practices and modern development standards.
"""


def chat(model: str, prompt: str, history: list):
    messages = build_messages(history, prompt)

    try:
        print(f"🤖 Model: {model}")
        print(f"📝 Prompt length: {len(prompt)} chars")
        print(f"💬 History messages: {len(history[-8:])}")
        print("🚀 Sending request to Ollama...")

        response = requests.post(
    f"{settings.OLLAMA_URL}/api/chat",
    json={
        "model": model,
        "messages": messages,
        "stream": False,
        "keep_alive": "30m",

        "options": {
            "temperature": 0.4,
            "top_p": 0.95,
            "num_ctx": 4096,
            "num_predict": 512,
        },
    },
    timeout=300,
)

        response.raise_for_status()

        data = response.json()

        print("✅ Response received.")

        return {
            "response": data["message"]["content"]
        }

    except requests.Timeout:
        return {
            "response": "⚠️ The model took too long to respond."
        }

    except Exception as e:
        print(e)
        return {
            "response": f"⚠️ Error: {e}"
        }