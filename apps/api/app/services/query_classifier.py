import re


# ----------------------------
# Intent Keywords
# ----------------------------

INTENT_PATTERNS = {
    "image": [
        r"\bimage\b",
        r"\bimages\b",
        r"\bphoto\b",
        r"\bpicture\b",
        r"\bwallpaper\b",
        r"\blogo\b",
    ],
    "news": [
        r"\bnews\b",
        r"\blatest\b",
        r"\brecent\b",
        r"\bbreaking\b",
        r"\bupdate\b",
    ],
    "weather": [
        r"\bweather\b",
        r"\bforecast\b",
        r"\btemperature\b",
        r"\brain\b",
        r"\bsnow\b",
    ],
    "finance": [
        r"\bbitcoin\b",
        r"\bbtc\b",
        r"\bethereum\b",
        r"\beth\b",
        r"\bcrypto\b",
        r"\bstock\b",
        r"\bshare price\b",
        r"\bmarket\b",
        r"\bnasdaq\b",
        r"\bnifty\b",
        r"\bsensex\b",
        r"\bprice\b",
    ],
    "sports": [
        r"\bmatch\b",
        r"\bscore\b",
        r"\bfixture\b",
        r"\bstanding\b",
        r"\bleague\b",
        r"\bworld cup\b",
        r"\bfifa\b",
        r"\buefa\b",
        r"\bipl\b",
    ],
}


# ----------------------------
# Trusted Domains
# ----------------------------

TRUSTED_DOMAINS = {
    "finance": [
        "coinmarketcap.com",
        "coindesk.com",
        "reuters.com",
    ],
    "sports": [
        "fifa.com",
        "uefa.com",
        "espn.com",
    ],
    "weather": [
        "weather.com",
        "accuweather.com",
    ],
    "news": [
        "reuters.com",
        "apnews.com",
        "bbc.com",
    ],
    "image": [],
}


def classify(prompt: str):

    p = prompt.lower()

    for intent, patterns in INTENT_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, p):
                return intent

    return "knowledge"


# ----------------------------
# Query Rewriter
# ----------------------------

def rewrite_query(prompt: str, intent: str):

    q = prompt.strip()

    lower = q.lower()

    if intent == "finance":

        lower = lower.replace("btc", "Bitcoin")
        lower = lower.replace("eth", "Ethereum")

        if "price" not in lower:
            lower += " current price"

        return lower

    if intent == "weather":

        if "current" not in lower:
            lower = "current " + lower

        return lower

    if intent == "news":

        if "latest" not in lower:
            lower = "latest " + lower

        return lower

    if intent == "image":

        if "official" not in lower:
            lower += " official images"

        return lower

    return q


# ----------------------------
# Main Router
# ----------------------------

def detect_intent(prompt: str):

    intent = classify(prompt)

    needs_web = intent != "knowledge"

    return {
        "intent": intent,
        "needs_web": needs_web,
        "confidence": 0.95 if needs_web else 0.99,
        "query": rewrite_query(prompt, intent),
        "trusted_domains": TRUSTED_DOMAINS.get(intent, []),
    }


def needs_web_search(prompt: str):
    return detect_intent(prompt)["needs_web"]