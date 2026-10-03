from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from deep_translator import GoogleTranslator , MyMemoryTranslator
from extractor import extract_text_from_pdf
import ollama
import shutil
import os
import json
import time

app = FastAPI()
current_document_content = ""
VAULT_STORE: dict[str, dict] = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CURRENT_DOCUMENT_CONTEXT = {
    "text": "",
    "filename": ""
}

LANG_MAPPING = {
    "en": "en", "as": "as", "kn": "kn", "hi": "hi",
    "bn": "bn", "te": "te", "ta": "ta", "ml": "ml",
    "mr": "mr", "gu": "gu", "pa": "pa", "or": "or"
}
# MyMemoryTranslator requires region-suffixed codes, unlike GoogleTranslator's short codes.
MYMEMORY_LANG_MAP = {
    "en": "en-GB", "as": "as-IN", "kn": "kn-IN", "hi": "hi-IN",
    "bn": "bn-IN", "te": "te-IN", "ta": "ta-IN", "ml": "ml-IN",
    "mr": "mr-IN", "gu": "gu-IN", "pa": "pa-IN", "or": "or-IN",
}
# Common romanized phrases per language mapped to their English meaning.
ROMANIZED_PHRASE_MAP = {
    "as": {
        "ki koribo lagibo": "what should be done",
        "ki korim": "what should I do",
        "moi ki korim": "what should I do",
        "homoi kiman ase": "how much time is there",
        "somoy kiman ase": "how much time is there",
        "ki bipod ase": "what risks are there",
        "ki somossa ase": "what problems are there",
    },
    "hi": {
        "kya karna hai": "what should be done",
        "mujhe kya karna hai": "what should I do",
        "kitna samay hai": "how much time is there",
        "kya khatra hai": "what risks are there",
        "kya samasya hai": "what problems are there",
    },
    "bn": {
        "ki korte hobe": "what should be done",
        "ami ki korbo": "what should I do",
        "koto shomoy ache": "how much time is there",
        "ki bipod ache": "what risks are there",
    },
    "te": {
        "em cheyali": "what should be done",
        "nenu em cheyali": "what should I do",
        "entha time undi": "how much time is there",
        "em prokato undi": "what risks are there",
    },
    "ta": {
        "enna seiya vendum": "what should be done",
        "naan enna seiya vendum": "what should I do",
        "eththanai neram irukku": "how much time is there",
        "enna aabathu irukku": "what risks are there",
    },
    "ml": {
        "enthu cheyyanam": "what should be done",
        "njan enthu cheyyanam": "what should I do",
        "ethra samayam undu": "how much time is there",
    },
    "mr": {
        "kay karayla have": "what should be done",
        "mala kay karayche": "what should I do",
        "kiti vel ahe": "how much time is there",
    },
    "gu": {
        "shu karvu joiye": "what should be done",
        "mare shu karvu": "what should I do",
        "ketlo samay chhe": "how much time is there",
    },
    "pa": {
        "ki karna hai": "what should be done",
        "mainu ki karna hai": "what should I do",
        "kinna samaa hai": "how much time is there",
    },
    "or": {
        "kana kariba lagiba": "what should be done",
        "mo kana karibi": "what should I do",
        "kete samaya achhi": "how much time is there",
    },
    "kn": {
        "enu maadabeku": "what should be done",
        "naanu enu maadabeku": "what should I do",
        "estu samaya ide": "how much time is there",
    },
}


def normalize_romanized_query(text: str, lang_code: str) -> str | None:
    """Checks if the query matches a known romanized phrase for the given language."""
    phrase_map = ROMANIZED_PHRASE_MAP.get(lang_code)
    if not phrase_map:
        return None
    cleaned = text.strip().lower().rstrip("?!.")
    return phrase_map.get(cleaned)


TRANSLATION_CACHE: dict[tuple, str] = {}

def cached_translate(text: str, target_lang: str, source_lang: str = "auto", retries: int = 2) -> str:
    if not text:
        return text

    # MyMemory has a hard 500-char limit per call — chunk longer text
    if len(text) > 480:
        chunks = [text[i:i+480] for i in range(0, len(text), 480)]
        translated_chunks = [cached_translate(chunk, target_lang, source_lang, retries) for chunk in chunks]
        return "".join(translated_chunks)

    key = (text, target_lang)
    if key in TRANSLATION_CACHE:
        return TRANSLATION_CACHE[key]

    mm_source = MYMEMORY_LANG_MAP.get(source_lang, "en-GB") if source_lang != "auto" else "en-GB"
    mm_target = MYMEMORY_LANG_MAP.get(target_lang, "en-GB")

    for attempt in range(retries + 1):
        try:
            time.sleep(0.5)
            result = MyMemoryTranslator(source=mm_source, target=mm_target).translate(text)
            if result and "No support" not in result and "Server Error" not in result:
                TRANSLATION_CACHE[key] = result
                return result
        except Exception as e:
            print(f"⚠️ Translation attempt {attempt+1} failed: {str(e)}")

    print("⚠️ All translation attempts failed, using original text.")
    return text


def safe_translate_batch(texts: list[str], target_lang: str, source_lang: str = "auto") -> list[str]:
    """Translates a list of texts, using cached_translate for each."""
    return [cached_translate(t, target_lang, source_lang) for t in texts]


def generate_risk_timeline_analysis(document_text: str) -> tuple[str, str]:
    """
    Uses the local Ollama model to generate a real risk summary and timeline
    summary based on the actual document content, instead of static placeholder text.
    """
    trimmed_text = get_relevant_excerpt(document_text, 1800)

    prompt = (
        "You are a legal document analyzer. Read the contract text below and respond with "
        "exactly two short sections, each 1-2 sentences, plain text, no markdown:\n\n"
        "RISK: <the single most significant risk, penalty, or liability clause found in the text>\n"
        "TIMELINE: <the most important deadline, notice period, or time-sensitive obligation found in the text>\n\n"
        "If the document doesn't clearly state a risk or timeline, say so briefly instead of guessing.\n\n"
        f"--- DOCUMENT TEXT ---\n{trimmed_text}\n--- END DOCUMENT TEXT ---"
    )

    try:
        response = ollama.chat(
            model='phi3',
            messages=[{"role": "user", "content": prompt}],
            options={"num_predict": 150, "num_ctx": 2048},
            keep_alive=-1
        )
        raw = response['message']['content']

        risk_text = "No specific risk identified."
        timeline_text = "No specific deadline identified."

        for line in raw.splitlines():
            line = line.strip()
            if line.upper().startswith("RISK:"):
                risk_text = line.split(":", 1)[1].strip()
            elif line.upper().startswith("TIMELINE:"):
                timeline_text = line.split(":", 1)[1].strip()

        return risk_text, timeline_text

    except Exception as e:
        print(f"⚠️ Risk/timeline generation failed: {str(e)}")
        return "Unable to analyze risks at this time.", "Unable to analyze timeline at this time."
def generate_summary(document_text: str, filename: str) -> str:
    """
    Uses the local Ollama model to generate a concise 3-point summary
    of the document, instead of dumping raw OCR text.
    """
    trimmed_text = get_relevant_excerpt(document_text, 3000)

    prompt = (
        "You are a legal document summarizer. Read the document text below and write a "
        "clear summary in exactly 3 short points, plain text, no markdown, no headers. "
        "Each point should be 1-2 sentences covering a distinct key aspect of the document "
        "(e.g. what the document is, the main parties/situation, and the core demand or outcome). "
        "Do not include labels like 'Point 1' — just three plain sentences or short paragraphs.\n\n"
        f"--- DOCUMENT TEXT ---\n{trimmed_text}\n--- END DOCUMENT TEXT ---"
    )

    try:
        response = ollama.chat(
            model='phi3',
            messages=[{"role": "user", "content": prompt}],
            options={"num_predict": 300, "num_ctx": 2048},
            keep_alive=-1
        )
        summary = response['message']['content'].strip()
        return f"DOCUMENT: {filename}\n\n{summary}" if summary else f"DOCUMENT: {filename}\n\nNo summary could be generated."
    except Exception as e:
        print(f"⚠️ Summary generation failed: {str(e)}")
        return f"DOCUMENT: {filename}\n\nUnable to generate summary at this time."

class LoginQuery(BaseModel):
    username: str | None = None
    email: str | None = None
    password: str


class ChatQuery(BaseModel):
    query: str
    language: str


@app.post("/auth/login")
async def secure_login_endpoint(payload: LoginQuery):
    user_identifier = payload.username or payload.email or "Unknown User"
    print(f"🔑 AUTH MATRIX: Verification request received for user '{user_identifier}'")

    if (payload.username or payload.email) and len(payload.password) >= 4:
        return JSONResponse(content={
            "status": "authenticated",
            "token": "mock_secure_vault_handshake_token_alpha_101",
            "user": user_identifier,
        })
    else:
        raise HTTPException(status_code=401, detail="Invalid secure vault matrix access credentials.")


@app.post("/analyze")
async def analyze_document(file: UploadFile = File(...), language: str = Form(...)):
    print(f"📥 INGESTION: Processing '{file.filename}' for language code '{language}'")
    os.makedirs("./temp", exist_ok=True)
    temp_path = f"./temp/{file.filename}"

    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        extracted_text = extract_text_from_pdf(temp_path)
        CURRENT_DOCUMENT_CONTEXT["text"] = extracted_text
        CURRENT_DOCUMENT_CONTEXT["filename"] = file.filename

        archive_id = f"VLT-{int(time.time())}"
        VAULT_STORE[archive_id] = {
            "text": extracted_text,
            "filename": file.filename,
        }

        base_summary_prompt = generate_summary(extracted_text, file.filename)
        risk_text, timeline_text = generate_risk_timeline_analysis(extracted_text)

        target_lang = LANG_MAPPING.get(language, "en")

        translated_summary, translated_risk, translated_timeline = safe_translate_batch(
            [base_summary_prompt, risk_text, timeline_text], target_lang
        )

        return JSONResponse(content={
            "summary": translated_summary,
            "risks": f"⚠️ {translated_risk}",
            "timeline": f"⚠️ {translated_timeline}",
            "archive_id": archive_id
        })

    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": f"Inference engine failure: {str(e)}"})
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


@app.post("/vault/regenerate")
async def regenerate_from_vault(payload: dict):
    archive_id = payload.get("id")
    language = payload.get("language", "en")

    entry = VAULT_STORE.get(archive_id)
    if not entry:
        return JSONResponse(status_code=404, content={"detail": "Archive not found."})

    extracted_text = entry["text"]
    CURRENT_DOCUMENT_CONTEXT["text"] = extracted_text
    CURRENT_DOCUMENT_CONTEXT["filename"] = entry["filename"]

    base_summary_prompt = generate_summary(extracted_text, entry['filename'])
    risk_text, timeline_text = generate_risk_timeline_analysis(extracted_text)

    target_lang = LANG_MAPPING.get(language, "en")

    try:
        translated_summary, translated_risk, translated_timeline = safe_translate_batch(
            [base_summary_prompt, risk_text, timeline_text], target_lang
        )

        return JSONResponse(content={
            "summary": translated_summary,
            "risks": f"⚠️ {translated_risk}",
            "timeline": f"⚠️ {translated_timeline}",
            "archive_id": archive_id
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": f"Regeneration failure: {str(e)}"})
def get_relevant_excerpt(text: str, total_chars: int = 1800) -> str:
    """Takes a mix of the start and end of a document, since legal deadlines
    and demands are often stated near the end, not just the beginning."""
    if len(text) <= total_chars:
        return text
    half = total_chars // 2
    return text[:half] + "\n...\n" + text[-half:]

@app.post("/interrogate")
async def interrogate_document(payload: ChatQuery):
    user_query = payload.query.strip()
    lang_code = payload.language
    target_lang = LANG_MAPPING.get(lang_code, "en")
    document_text = get_relevant_excerpt(CURRENT_DOCUMENT_CONTEXT["text"], 480)

    if not document_text:
        msg = "No active document context found in vault. Please upload a file first."
        return JSONResponse(content={"response": cached_translate(msg, target_lang)})

    try:
        t0 = time.time()
        known_phrase = normalize_romanized_query(user_query, lang_code)
        if known_phrase:
            translated_query = known_phrase
        else:
            translated_query = cached_translate(user_query, "en", source_lang=lang_code)
        print(f"⏱ Query translation: {time.time()-t0:.2f}s")
        print(f"🔍 AI Interrogate -> Input: '{user_query}' | Parsed Meaning: '{translated_query}'")

        system_instruction = (
            "You are Astraea, an expert full-stack legal AI consultant operating inside a highly secure offline vault. "
            "Analyze the legal contract context provided below and answer the user's question accurately. "
            "Keep your output direct, clear, professional, and limited to 2-4 sentences max. "
            "If the document doesn't mention the answer, explain that politely based on the text."
            "You are a Risk Mitigation Specialist. Your job is to identify every potential trap, penalty, or disadvantage for me in this document."
            "You are a Negotiation Strategist. When I ask about a clause, suggest a 'counter-offer' or a way to rephrase the clause to better protect my interests.\n\n"
            "IMPORTANT: The user's question may be casually typed, informally romanized (e.g. Assamese, Hindi, or Bengali "
            "written in English letters), or contain minor spelling variations. Do your best to interpret the likely intent "
            "based on context and the document content, rather than refusing due to unfamiliar spelling. Only ask for "
            "clarification if the question is genuinely too vague to attempt an answer.\n\n"
            f"--- START VAULT LEGAL CONTEXT ---\n{document_text}\n--- END VAULT LEGAL CONTEXT ---"
        )

        t1 = time.time()
        response_matrix = ollama.chat(model='phi3', messages=[
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": translated_query}
        ], options={"num_predict": 150, "num_ctx": 2048}, keep_alive=-1)
        print(f"⏱ Ollama inference: {time.time()-t1:.2f}s")

        ai_reply_english = response_matrix['message']['content']

        t2 = time.time()
        final_output = cached_translate(ai_reply_english, target_lang, source_lang="en")
        print(f"⏱ Reply translation: {time.time()-t2:.2f}s")

        return JSONResponse(content={"response": final_output})

    except Exception as e:
        print(f"❌ INTERROGATE RUNTIME FAILURE: {str(e)}")
        return JSONResponse(content={"response": "// Context Parsing Exception: Local Ollama runner thread crashed or is offline."})