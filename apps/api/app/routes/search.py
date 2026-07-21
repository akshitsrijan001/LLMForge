from fastapi import APIRouter
from pydantic import BaseModel

from app.services.query_classifier import needs_web_search
from app.services.web_search import search_web

router = APIRouter()


class SearchRequest(BaseModel):
    query: str


@router.post("/search")
def search(request: SearchRequest):

    if not needs_web_search(request.query):
        return {
            "images": [],
            "sources": [],
        }

    result = search_web(request.query)

    return {
        "context": result["context"],
        "images": result["images"],
        "sources": result["sources"],
    }