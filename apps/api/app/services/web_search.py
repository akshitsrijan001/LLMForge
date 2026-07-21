import requests
from urllib.parse import urlparse

from app.core.config import settings

SERPER_API_KEY = settings.SERPER_API_KEY


def _domain(url: str) -> str:
    try:
        return urlparse(url).netloc.replace("www.", "")
    except Exception:
        return ""


def search_web(
    query: str,
    trusted_domains: list[str] | None = None,
):
    headers = {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json",
    }

    web = requests.post(
        "https://google.serper.dev/search",
        headers=headers,
        json={"q": query},
        timeout=15,
    ).json()

    images = requests.post(
        "https://google.serper.dev/images",
        headers=headers,
        json={"q": query},
        timeout=15,
    ).json()

    trusted_domains = trusted_domains or []

    organic = web.get("organic", [])

    # ----------------------------
    # Rank trusted domains first
    # ----------------------------

    organic.sort(
        key=lambda x: (
            _domain(x.get("link", "")) not in trusted_domains
        )
    )

    context_parts = []

    sources = []

    # ----------------------------
    # Answer Box
    # ----------------------------

    answer = web.get("answerBox")

    if answer:

        value = (
            answer.get("answer")
            or answer.get("snippet")
            or ""
        )

        if value:

            context_parts.append(
                f"""
=========================
VERIFIED ANSWER
=========================

{value}
"""
            )

    # ----------------------------
    # Knowledge Graph
    # ----------------------------

    kg = web.get("knowledgeGraph")

    if kg:

        description = kg.get("description", "")

        title = kg.get("title", "")

        if description:

            context_parts.append(
                f"""
=========================
ENTITY
=========================

{title}

{description}
"""
            )

    # ----------------------------
    # Trusted Results
    # ----------------------------

    trusted_text = []

    for item in organic[:5]:

        title = item.get("title", "")

        snippet = item.get("snippet", "")

        link = item.get("link", "")

        trusted_text.append(
            f"""
Source: {title}

Summary:
{snippet}
"""
        )

        sources.append(
            {
                "title": title,
                "link": link,
            }
        )

    if trusted_text:

        context_parts.append(
            """
=========================
TOP SOURCES
=========================
"""
            + "\n".join(trusted_text)
        )

    # ----------------------------
    # Images
    # ----------------------------

    image_urls = []

    for img in images.get("images", [])[:6]:

        if img.get("imageUrl"):

            image_urls.append(img["imageUrl"])

    return {
        "context": "\n\n".join(context_parts),
        "images": image_urls,
        "sources": sources,
    }