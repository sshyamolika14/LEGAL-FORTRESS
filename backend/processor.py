from langchain_ollama import OllamaLLM
from langchain_core.prompts import PromptTemplate

# Reinforced prompt that forces script isolation
template = """
You are a multilingual legal translation expert. Your task is to analyze the following document text and write a structured legal summary.

CRITICAL MANDATE:
You must write your entire output using the native script and alphabet of the requested language: {language}.
- If the requested language is Assamese, you MUST write exclusively in the Assamese alphabet and vocabulary. Do not use Hindi words or Devanagari script.
- Do not mix languages. Do not use English words in the final output.

Document Text to analyze:
{text}

Output the complete analysis strictly inside the native script of {language}:
"""

def get_vernacular_summary(text: str, language: str) -> str:
    try:
        languages = {
            "en": "English",
            "as": "Assamese (অসমীয়া)",
            "kn": "Kannada (ಕನ್ನಡ)",
            "hi": "Hindi (हिंदी)",
            "bn": "Bengali (বাংলা)",
            "te": "Telugu (ತೆలుగు)",
            "ta": "Tamil (தமிழ்)",
            "ml": "Malayalam (മലയാളം)"
        }
        
        target_lang = languages.get(language.strip().lower(), "Assamese (অসমীয়া)")
        
        # 🧠 SWAPPING THE BRAIN: Switching from base Llama3 to Gemma2
        # Dropping temperature to 0.0 forces total execution of the prompt rules
        llm = OllamaLLM(model="gemma2", temperature=0.0)
        
        prompt = PromptTemplate(template=template, input_variables=["language", "text"])
        formatted_prompt = prompt.format(language=target_lang, text=text)
        
        response = llm.invoke(formatted_prompt)
        return response
        
    except Exception as e:
        print(f"Backend Error: {e}")
        return f"An error occurred while generating the summary: {str(e)}"