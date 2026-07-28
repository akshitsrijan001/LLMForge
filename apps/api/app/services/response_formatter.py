import re


def format_response(text: str) -> str:
    """
    Final cleanup before streaming to frontend.
    """

    if not text:
        return ""

    text = text.strip()

    text = re.sub(r"\n{3,}", "\n\n", text)

    text = text.replace("•", "-")

    return text