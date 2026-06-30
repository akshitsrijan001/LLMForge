import chromadb

from app.rag.embeddings import embed

client = chromadb.PersistentClient(path="vector_db")

collection = client.get_or_create_collection(
    name="documents"
)


def add_document(
    document_id: str,
    chunks: list[str],
):
    embeddings = embed(chunks)

    ids = [
        f"{document_id}_{i}"
        for i in range(len(chunks))
    ]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings.tolist(),
        metadatas=[
            {
                "document": document_id,
                "chunk": i,
            }
            for i in range(len(chunks))
        ],
    )