from pathlib import Path
import shutil

from fastapi import APIRouter, File, Form, UploadFile
from pydantic import BaseModel

from app.rag.chunker import chunk_text
from app.rag.chroma_service import add_document
from app.rag.project_indexer import index_project
from app.services.pdf_service import extract_pdf_text

router = APIRouter()

UPLOAD_DIR = Path("app/storage/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


class ProjectRequest(BaseModel):
    path: str
    knowledge_base: str = "default"


@router.post("/upload-project")
async def upload_project(request: ProjectRequest):
    """
    Index an entire project into a knowledge base.
    """

    indexed = index_project(
        project_path=request.path,
        knowledge_base=request.knowledge_base,
    )

    return {
        "status": "success",
        "indexed_files": indexed,
    }


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    knowledge_base: str = Form("default"),
):
    """
    Upload a file and index it if supported.
    """

    filepath = UPLOAD_DIR / file.filename

    with filepath.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = ""

    if file.filename.lower().endswith(".pdf"):

        text = extract_pdf_text(str(filepath))

        if text.strip():

            chunks = chunk_text(text)

            add_document(
                document_id=file.filename,
                chunks=chunks,
                collection_name=knowledge_base,
            )

    return {
        "filename": file.filename,
        "path": str(filepath),
        "text": text,
        "status": "uploaded",
    }