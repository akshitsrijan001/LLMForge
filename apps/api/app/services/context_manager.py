from typing import List, Dict

MAX_HISTORY = 12


def build_context(history: List[Dict]) -> List[Dict]:
    """
    Build conversation context before sending it to the model.

    Responsibilities:
    - Remove empty messages
    - Keep only recent history
    - Preserve role ordering
    """

    cleaned = []

    for message in history:

        role = message.get("role")
        content = message.get("content", "").strip()

        if not content:
            continue

        cleaned.append(
            {
                "role": role,
                "content": content,
            }
        )

    return cleaned[-MAX_HISTORY:]