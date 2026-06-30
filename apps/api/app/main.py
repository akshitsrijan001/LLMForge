from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.health import router as health_router
from app.api.system import router as system_router
from app.api.chat import router as chat_router
from app.api.upload import router as upload_router


app = FastAPI(
    title="LLMForge API",
    version="0.1.0",
)
import requests

try:
    requests.post(
        "http://127.0.0.1:11434/api/generate",
        json={
            "model": "llama3.1:8b",
            "prompt": "",
            "keep_alive": "30m",
        },
        timeout=120,
    )
    print("🔥 Llama warmed up.")
except Exception:
    print("⚠️ Could not warm Llama.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(system_router)
app.include_router(chat_router)
app.include_router(upload_router)