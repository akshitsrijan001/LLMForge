import json
import traceback

import requests

from app.core.config import settings
from app.services.prompt_builder import build_messages

REQUEST_TIMEOUT = (10, 300)


def check_connection():
    try:
        response = requests.get(
            f"{settings.OLLAMA_URL}/api/tags",
            timeout=10,
        )
        return response.status_code == 200
    except Exception:
        return False


def installed_models():
    try:
        response = requests.get(
            f"{settings.OLLAMA_URL}/api/tags",
            timeout=10,
        )
        return response.json()
    except Exception:
        return None


def chat(
    model: str,
    prompt: str,
    history: list,
    files: list | None = None,
    knowledge_base: str = "default",
    generation_settings: dict | None = None,
):
    if files is None:
        files = []

    generation_settings = generation_settings or {}

    messages = build_messages(
        history=history,
        prompt=prompt,
        files=files,
    )

    context = ""
    sources = []

    try:
        from app.rag.retriever import retrieve

        docs, sources = retrieve(
            question=prompt,
            collection_name=knowledge_base,
        )

        if docs:
            context = "\n\n".join(
                f"""FILE: {source['document']}
CHUNK: {source['chunk']}

{doc}"""
                for doc, source in zip(docs, sources)
            )

    except Exception:
        traceback.print_exc()

    if context:

        rag_prompt = f"""
# KNOWLEDGE BASE

The following information was retrieved from the user's indexed project.

Answer ONLY using this information.

Rules:

- Do NOT use outside knowledge.
- If the answer exists in the context, answer directly.
- If the answer cannot be found, reply exactly:

I could not find that information in the indexed knowledge base.

---------------- CONTEXT ----------------

{context}

-----------------------------------------
"""

        messages.insert(
            1,
            {
                "role": "system",
                "content": rag_prompt,
            },
        )

    temperature = generation_settings.get("temperature", 0.4)
    top_p = generation_settings.get("topP", 0.95)
    num_ctx = generation_settings.get("context", 4096)

    try:

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
            timeout=REQUEST_TIMEOUT,
        )

        response.raise_for_status()

        for line in response.iter_lines(decode_unicode=True):

            if not line:
                continue

            try:
                chunk = json.loads(line)
            except json.JSONDecodeError:
                continue

            if chunk.get("done", False):
                break

            text = chunk.get("message", {}).get("content", "")

            if text:
                yield text

        if sources:

            yield "\n\n---\n\n"
            yield "### Sources\n\n"

            shown = set()

            for source in sources:

                key = (
                    source["document"],
                    source["chunk"],
                )

                if key in shown:
                    continue

                shown.add(key)

                yield (
                    f"📄 **{source['document']}** "
                    f"(Chunk {source['chunk']})\n\n"
                )

    except requests.Timeout:
        yield "⚠️ Ollama request timed out."

    except Exception:
        traceback.print_exc()
        yield "⚠️ An unexpected error occurred while generating the response."