from fastapi import APIRouter

from app.knowledge_base import (
    list_knowledge_bases,
    create_knowledge_base,
    delete_knowledge_base,
)

router = APIRouter()


@router.get("/knowledge-bases")
def get_kbs():
    return list_knowledge_bases()


@router.post("/knowledge-bases/{name}")
def create(name: str):
    create_knowledge_base(name)
    return {"status": "created"}


@router.delete("/knowledge-bases/{name}")
def remove(name: str):
    delete_knowledge_base(name)
    return {"status": "deleted"}