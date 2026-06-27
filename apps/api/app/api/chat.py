from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ollama import chat
from app.services.router import choose_model

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    prompt: str
    model: str = "auto"
    history: list[Message] = []


@router.post("/chat")
def chat_route(request: ChatRequest):

    selected_model = choose_model(
        request.prompt,
        request.model,
    )

    response = chat(
        model=selected_model,
        prompt=request.prompt,
        history=[m.model_dump() for m in request.history[-8:]],
    )

    return response