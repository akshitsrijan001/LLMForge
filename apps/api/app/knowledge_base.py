from pathlib import Path

import chromadb

# ------------------------------------------------------------
# Chroma Database
# ------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[3]
DB_PATH = BASE_DIR / "vector_db"

print("=" * 70)
print("📚 KNOWLEDGE BASE PATH:", DB_PATH)
print("=" * 70)

client = chromadb.PersistentClient(
    path=str(DB_PATH)
)


def list_knowledge_bases():
    collections = client.list_collections()

    result = []

    print("Knowledge Bases:")

    for collection in collections:
        print(" -", collection.name)

        result.append(
            {
                "name": collection.name,
                "chunks": collection.count(),
            }
        )

    return result


def create_knowledge_base(name: str):
    client.get_or_create_collection(name=name)
    print(f"✅ Created knowledge base: {name}")


def delete_knowledge_base(name: str):

    if name == "default":
        print("⚠️ Cannot delete default knowledge base.")
        return

    client.delete_collection(name)
    print(f"🗑 Deleted knowledge base: {name}")