from fastapi import APIRouter

from app.services.ollama import check_connection
from app.services.ollama import installed_models

router = APIRouter()


@router.get("/system")
def system():

    connected = check_connection()

    models = installed_models()

    return {
        "backend": True,
        "ollama": connected,
        "models": models,
    }