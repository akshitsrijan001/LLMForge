from app.rag.chroma_service import search
from app.rag.embeddings import embed

# Chroma returns distance (lower is better).
MAX_DISTANCE = 1.5


def retrieve(
    question: str,
    collection_name: str = "default",
    top_k: int = 8,
):
    """
    Retrieve the most relevant chunks from a knowledge base.
    Returns:
        docs: List[str]
        metadata: List[dict]
    """

    question_embedding = embed([question])[0]

    try:
        results = search(
            question_embedding=question_embedding,
            collection_name=collection_name,
            top_k=top_k,
        )
    except Exception:
        return [], []

    returned_docs = results.get("documents", [[]])[0]
    returned_meta = results.get("metadatas", [[]])[0]
    returned_distances = results.get("distances", [[]])[0]

    if not returned_docs:
        return [], []

    docs = []
    metadata = []
    seen = set()

    for doc, meta, distance in zip(
        returned_docs,
        returned_meta,
        returned_distances,
    ):

        if distance > MAX_DISTANCE:
            continue

        key = (
            meta.get("document"),
            meta.get("chunk"),
        )

        if key in seen:
            continue

        seen.add(key)
        docs.append(doc)
        metadata.append(meta)

    return docs, metadata