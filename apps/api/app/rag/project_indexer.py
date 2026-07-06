import os
from pathlib import Path

from app.rag.chunker import chunk_text
from app.rag.chroma_service import add_document

SUPPORTED_EXTENSIONS = {
    ".py",
    ".js",
    ".ts",
    ".tsx",
    ".jsx",
    ".java",
    ".cpp",
    ".c",
    ".go",
    ".rs",
    ".md",
    ".txt",
    ".json",
    ".yaml",
    ".yml",
    ".toml",
}

IGNORE_FILES = {
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",

    "chroma.sqlite3",

    ".DS_Store",
}

IGNORE_DIRS = {
    ".git",
    ".github",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    ".ruff_cache",

    ".venv",
    "venv",
    "env",

    "node_modules",
    ".next",
    "dist",
    "build",
    "coverage",

    "vector_db",

    ".idea",
    ".vscode",

    "site-packages",

    ".turbo",

    "target",
    "bin",
    "obj",
}

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


def index_project(
    project_path: str,
    knowledge_base: str,
):
    """
    Index an entire source code project into a knowledge base.
    """

    project = Path(project_path).resolve()

    if not project.exists():
        return 0

    indexed = 0

    ignore_dirs_lower = {
        d.lower()
        for d in IGNORE_DIRS
    }

    for root, dirs, filenames in os.walk(project):

        root = Path(root)

        dirs[:] = [
            d
            for d in dirs
            if d.lower() not in ignore_dirs_lower
        ]

        for filename in filenames:
            if filename in IGNORE_FILES:
                continue

            file = root / filename

            if file.suffix.lower() not in SUPPORTED_EXTENSIONS:
                continue

            if file.stat().st_size > MAX_FILE_SIZE:
                continue

            try:

                text = file.read_text(
                    encoding="utf-8",
                    errors="ignore",
                )

                if not text.strip():
                    continue

                relative = str(
                    file.relative_to(project)
                )

                chunks = [
                    f"""FILE: {relative}

{chunk}
"""
                    for chunk in chunk_text(text)
                ]

                add_document(
                    document_id=relative,
                    chunks=chunks,
                    collection_name=knowledge_base,
                )

                indexed += 1

            except Exception:
                continue

    return indexed