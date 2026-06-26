from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ollama import chat

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    prompt: str
    model: str
    history: list[Message] = []


@router.post("/chat")
def chat_route(request: ChatRequest):
    response = chat(
        model=request.model,
        prompt=request.prompt,
        history=[m.model_dump() for m in request.history],
    )

    return response