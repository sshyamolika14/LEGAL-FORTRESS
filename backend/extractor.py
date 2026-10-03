import pdfplumber
import pytesseract
from PIL import Image
import os
# 🔧 Point pytesseract to your installed Tesseract engine
# Adjust this path if you installed Tesseract somewhere else
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extracts real text from a document.
    - PDFs: uses pdfplumber for text-based PDFs.
    - Images (.png, .jpg, .jpeg): uses Tesseract OCR.
    - Scanned/image-only PDFs: falls back to OCR per page if pdfplumber finds no text.
    """
    if not os.path.exists(file_path):
        return f"Error: File at {file_path} not found."

    lower_path = file_path.lower()

    try:
        # --- Case 1: Direct image upload ---
        if lower_path.endswith((".png", ".jpg", ".jpeg", ".webp")):
            image = Image.open(file_path)
            text = pytesseract.image_to_string(image)
            return text.strip() if text.strip() else "No text could be extracted from this image."

        # --- Case 2: PDF upload ---
        compiled_text = ""
        with pdfplumber.open(file_path) as pdf:
            for i, page in enumerate(pdf.pages):
                text = page.extract_text()
                if text and text.strip():
                    compiled_text += f"\n--- PAGE {i + 1} ---\n" + text
                else:
                    # Page has no extractable text (likely scanned) -> OCR fallback
                    pil_image = page.to_image(resolution=300).original
                    ocr_text = pytesseract.image_to_string(pil_image)
                    if ocr_text.strip():
                        compiled_text += f"\n--- PAGE {i + 1} (OCR) ---\n" + ocr_text

        return compiled_text.strip() if compiled_text.strip() else "No extractable text found in this document."

    except Exception as e:
        return f"Error extracting text: {str(e)}"