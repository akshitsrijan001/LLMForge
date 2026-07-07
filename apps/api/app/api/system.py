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
@router.get("/dashboard")
def dashboard():

    models = installed_models()

    from app.knowledge_base import list_knowledge_bases

    kbs = list_knowledge_bases()

    total_chunks = sum(
        kb["chunks"]
        for kb in kbs
    )

    return {
        "models": len(models.get("models", [])),
        "knowledge_bases": len(kbs),
        "chunks": total_chunks,
        "ollama": check_connection(),
    }