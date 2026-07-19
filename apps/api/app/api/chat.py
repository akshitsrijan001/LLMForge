from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from app.services.ollama import chat
from app.services.router import choose_model

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
    print("Selected Model  :", route["model"])
    print("Category        :", route["category"])
    print("Reason          :", route["reason"])
    print("Knowledge Base  :", request.knowledge_base)
    print("History Messages:", len(request.history))
    print("Uploaded Files  :", len(request.files))
    print("=" * 70)

    stream = chat(
        model=selected_model,
        prompt=request.prompt,
        history=[m.model_dump() for m in request.history[-8:]],
        files=[f.model_dump() for f in request.files],
        knowledge_base=request.knowledge_base,
        generation_settings=request.generation_settings.model_dump(),
    )

    return StreamingResponse(
        stream,
        media_type="text/plain",
    )