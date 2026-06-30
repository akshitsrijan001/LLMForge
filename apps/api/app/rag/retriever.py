from app.rag.embeddings import embed
from app.rag.chroma_service import collection


def retrieve(question: str, top_k: int = 5):

    print("🔥 RETRIEVER CALLED")
    print("Question:", question)

    query_embedding = embed([question])[0]

    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=top_k,
    )

    print("RESULTS:", results)

    return results["documents"][0]