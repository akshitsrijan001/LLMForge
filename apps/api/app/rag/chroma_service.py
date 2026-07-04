from pathlib import Path

import chromadb

from app.rag.embeddings import embed

# ---------------------------------------------------------------------
# Chroma Configuration
# ---------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[4]
DB_PATH = BASE_DIR / "vector_db"

client = chromadb.PersistentClient(
    path=str(DB_PATH)
)


def get_collection(collection_name: str):
    """
    Get or create a Chroma collection.
    """
    return client.get_or_create_collection(
        name=collection_name
    )


def add_document(
    document_id: str,
    chunks: list[str],
    collection_name: str,
):
    """
    Add a document to the specified knowledge base.
    Duplicate chunks are skipped automatically.
    """

    if not chunks:
        return

    collection = get_collection(collection_name)

    embeddings = embed(chunks)

    ids = [
        f"{document_id}_{i}"
        for i in range(len(chunks))
    ]

    existing_ids = set(collection.get()["ids"])

    new_ids = []
    new_docs = []
    new_embeddings = []
    new_metadata = []

    for idx, chunk in enumerate(chunks):

        if ids[idx] in existing_ids:
            continue

        new_ids.append(ids[idx])

        new_docs.append(
            f"""FILE: {document_id}

CONTENT:
{chunk}
"""
        )

        new_embeddings.append(
            embeddings[idx].tolist()
        )

        new_metadata.append(
            {
                "document": document_id,
                "chunk": idx,
            }
        )

    if not new_ids:
        return

    collection.add(
        ids=new_ids,
        documents=new_docs,
        embeddings=new_embeddings,
        metadatas=new_metadata,
    )


def search(
    question_embedding,
    collection_name: str,
    top_k: int = 8,
):
    """
    Search a knowledge base using an embedding.
    """

    collection = get_collection(collection_name)

    return collection.query(
        query_embeddings=[
            question_embedding.tolist()
        ],
        n_results=top_k,
        include=[
            "documents",
            "metadatas",
            "distances",
        ],
    )


def collection_size(collection_name: str) -> int:
    """
    Return the number of indexed chunks.
    """

    return get_collection(collection_name).count()