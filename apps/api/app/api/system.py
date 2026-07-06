from fastapi import APIRouter

from app.services.ollama import check_connection
from app.services.ollama import installed_models

router = APIRouter()

@router.get("/system/models")
def system_models():
    models = installed_models()

    if not models:
        return []

    return models.get("models", [])


@router.get("/system")
def system():

    connected = check_connection()

    models = installed_models()

    return {
        "backend": True,
        "ollama": connected,
        "models": models,
    }