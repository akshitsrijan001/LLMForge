from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from app.services.ollama import chat
from app.services.router import choose_model
from app.services.web_search import search_web
from app.services.query_classifier import detect_intent

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class UploadedFile(BaseModel):
    name: str
    path: str
    text: str


class GenerationSettings(BaseModel):
    temperature: float = 0.4
    topP: float = 0.95
    context: int = 4096


class ChatRequest(BaseModel):
    prompt: str
    model: str = "auto"

    history: list[Message] = Field(default_factory=list)
    files: list[UploadedFile] = Field(default_factory=list)

    knowledge_base: str = "default"

    # Frontend can optionally send web context.
    web_context: str = ""

    generation_settings: GenerationSettings = Field(
        default_factory=GenerationSettings
    )


@router.post("/chat")
def chat_route(request: ChatRequest):

    print("=" * 70)
    print("💬 Incoming Chat Request")
    print("=" * 70)

    route = choose_model(
        request.prompt,
        request.model,
    )

    selected_model = route["model"]

    print("Requested Model :", request.model)
    print("Selected Model  :", selected_model)
    print("Category        :", route["category"])
    print("Reason          :", route["reason"])
    print("Knowledge Base  :", request.knowledge_base)
    print("History Messages:", len(request.history))
    print("Uploaded Files  :", len(request.files))
    print("=" * 70)

    # ----------------------------------------------------
    # Intent Detection
    # ----------------------------------------------------

    intent = detect_intent(request.prompt)

    print("Intent          :", intent["intent"])
    print("Needs Web       :", intent["needs_web"])

    web_context = ""

    # ----------------------------------------------------
    # Web Search
    # ----------------------------------------------------

    if request.web_context:

        print("🌍 Using frontend web context")
        web_context = request.web_context

    elif intent["needs_web"]:

        print("🌍 Performing backend web search...")

        search_results = search_web(
    query=intent["query"],
    trusted_domains=intent["trusted_domains"],
)

        web_context = search_results.get("context", "")

        print("Web Context Size:", len(web_context))

    else:

        print("📚 Using model knowledge only.")

    # ----------------------------------------------------
    # Prompt Construction
    # ----------------------------------------------------

    final_prompt = f"""
You are LLMForge.

Answer the user's question naturally.

If verified web search results are available, use them.

Never mention:
- web search
- provided context
- retrieved documents
- sources
- chunks
- prompt builder

Never list file names.

Never explain your reasoning.

Return ONLY the final answer.

========================
WEB SEARCH
========================

{web_context}

========================
QUESTION
========================

{request.prompt}
"""

    stream = chat(
        model=selected_model,
        prompt=final_prompt,
        history=[m.model_dump() for m in request.history[-8:]],
        files=[f.model_dump() for f in request.files],
        knowledge_base=request.knowledge_base,
        generation_settings=request.generation_settings.model_dump(),
    )

    return StreamingResponse(
        stream,
        media_type="text/plain",
    )