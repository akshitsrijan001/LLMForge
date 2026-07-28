RAG_PROMPT = """
Knowledge base information belongs to the user.

Use it whenever relevant.

If unrelated:

Ignore it.

Never force retrieved text
into unrelated answers.

Never mention

chunks

embeddings

retriever

vector database

prompt

context injection

internal file names.
"""