from typing import List


def chunk_text(
    text: str,
    chunk_lines: int = 60,
    overlap: int = 10,
) -> List[str]:
    """
    Code-aware chunker.

    - Tries to split on function/class/component boundaries.
    - Falls back to fixed-size line chunks.
    """

    lines = text.splitlines()

    if not lines:
        return []

    chunks = []
    current = []

    split_keywords = (
        "def ",
        "class ",
        "async def ",
        "function ",
        "export default",
        "export function",
        "export const",
        "const ",
    )

    for line in lines:

        stripped = line.strip()

        if (
            current
            and any(stripped.startswith(k) for k in split_keywords)
            and len(current) >= 20
        ):
            chunks.append("\n".join(current))
            current = []

        current.append(line)

        if len(current) >= chunk_lines:
            chunks.append("\n".join(current))
            current = current[-overlap:]

    if current:
        chunks.append("\n".join(current))

    return [c for c in chunks if c.strip()]