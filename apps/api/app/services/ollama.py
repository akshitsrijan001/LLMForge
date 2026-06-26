import requests

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


def chat(model: str, prompt: str, history: list):
    response = requests.post(
        f"{settings.OLLAMA_URL}/api/chat",
        json={
            "model": model,
            "messages": history,
            "stream": False,
        },
    )

    data = response.json()

    return {
        "response": data["message"]["content"]
    }