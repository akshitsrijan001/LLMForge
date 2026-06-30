from fastapi import APIRouter, UploadFile, File
from pathlib import Path
import shutil

from app.services.pdf_service import extract_pdf_text
from app.rag.chunker import chunk_text
from app.rag.chroma_service import add_document

router = APIRouter()

UPLOAD_DIR = Path("app/storage/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    filepath = UPLOAD_DIR / file.filename

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = ""

    if file.filename.lower().endswith(".pdf"):
        text = extract_pdf_text(str(filepath))

    if text.strip():

        chunks = chunk_text(text)

        add_document(
            document_id=file.filename,
            chunks=chunks,
        )

        print(f"✅ Indexed {len(chunks)} chunks")

    return {
        "filename": file.filename,
        "path": str(filepath),
        "text": text,
        "status": "uploaded",
    }