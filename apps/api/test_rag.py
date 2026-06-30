from app.rag.chunker import chunk_text
from app.rag.chroma_service import add_document
from app.rag.retriever import retrieve

text = """
LLMForge is an AI platform.

It supports multiple models.

It supports DSPy.

It supports local inference.

It supports document retrieval.
"""

chunks = chunk_text(text)

add_document(
    "demo",
    chunks,
)

results = retrieve(
    "Does LLMForge support DSPy?"
)

print()

print("Retrieved:")

for r in results:
    print("-" * 40)
    print(r)