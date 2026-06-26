from pydantic import BaseModel

class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    prompt: str
    model: str
    history: list[Message] = []