from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

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
    history: list[Message] = []
    files: list[UploadedFile] = []
    generation_settings: GenerationSettings = GenerationSettings()


@router.post("/chat")
def chat_route(request: ChatRequest):
    print("✅ USING CHAT.PY")

    selected_model = choose_model(
        request.prompt,
        request.model,
    )

    print(f"📌 Frontend requested : {request.model}")
    print(f"🤖 Using model        : {selected_model}")

    stream = chat(
        model=selected_model,
        prompt=request.prompt,
        history=[m.model_dump() for m in request.history[-8:]],
        files=[f.model_dump() for f in request.files],
        generation_settings=request.generation_settings.model_dump(),
    )

    return StreamingResponse(
        stream,
        media_type="text/plain",
    )