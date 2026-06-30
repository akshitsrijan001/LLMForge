import fitz


def extract_pdf_text(path: str):
    doc = fitz.open(path)

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    return text