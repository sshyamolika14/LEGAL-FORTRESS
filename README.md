# ⚖️ Legal Fortress

> AI-Powered Legal Document Analysis Platform for 11 Indian Languages

[![Python](https://img.shields.io/badge/Python-3.10+-blue)](https://www.python.org/) [![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/) [![FastAPI](https://img.shields.io/badge/FastAPI-green)](https://fastapi.tiangolo.com/) [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🎯 Overview

Legal Fortress is an AI-powered platform that analyzes legal documents instantly. Upload a contract, lease, or notice → receive an automated 3-point summary, risk assessment, and critical deadlines — all in your preferred language. The entire system runs locally on your machine with zero external data transfer.

**Designed for**: Legal professionals, law students, small businesses, individuals requiring document analysis without external counsel.

---

## ✨ Core Features

🔍 **Document Upload & Analysis**
- Supports PDF, PNG, JPG (native and scanned documents)
- Automated text extraction via OCR
- AI-generated summaries with contextual risk identification
- Real-time deadline extraction

📦 **Vault Archives**
- Single upload, infinite retrievals
- Instant language switching without re-upload
- Regenerated analysis in seconds

🌍 **Multilingual Support**
- 11 Indian regional languages: Assamese, Hindi, Bengali, Telugu, Tamil, Malayalam, Marathi, Gujarati, Punjabi, Odia, Kannada
- Romanized script recognition and processing

💬 **Intelligent Query Interface**
- Document-aware Q&A with Astraea AI
- Average response time: 15-20 seconds
- Full context retention across queries

🔒 **Security & Session Management**
- Local-only processing (no cloud uploads)
- Automatic session expiry with data wipe
- Encrypted vault storage

---

## 🏗️ Technical Architecture

| Component | Technology | Function |
|-----------|-----------|----------|
| **Frontend** | Next.js 14, React 18, Tailwind CSS | 11-language UI, real-time chat, responsive design |
| **Backend** | FastAPI, Pydantic | Async API, validation, high concurrency |
| **AI Engine** | Ollama (φ3 model) | Local inference, privacy-first |
| **OCR** | Tesseract, pdfplumber | Multi-format document extraction |
| **Translation** | MyMemoryTranslator | Multilingual support, cached queries |
| **Storage** | In-memory (PostgreSQL for production) | Vault management |

---

## ⚡ Performance Benchmarks

| Task | Duration | Breakdown |
|------|----------|-----------|
| 📤 Initial upload | 50-70s | OCR + dual AI inference + translation |
| 🔄 Archive reload | 30-40s | Dual AI inference + translation (OCR skipped) |
| 💬 Query response | 15-20s | Single AI inference + bidirectional translation |
| ⚡ Cached query | <1s | Dictionary lookup |

---

## 🚀 Installation

### System Requirements

✓ Python 3.10+ | ✓ Node.js 18+ | ✓ Ollama | ✓ Tesseract OCR


### Backend Deployment
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
Accessible at: `http://localhost:8000`

### Frontend Deployment
```bash
cd frontend
npm install
npm run dev
```
Accessible at: `http://localhost:3000`

### Ollama Setup (Separate Terminal)
```bash
ollama serve
ollama pull phi3
```

---

## 📡 API Reference

**POST `/analyze`** – Process new document

Request: { "file": "<PDF/image>", "language": "as|hi|bn|te|ta|ml|mr|gu|pa|or|kn" }
Response: { "summary": "...", "risks": "⚠️ ...", "timeline": "⚠️ ...", "archive_id": "VLT-..." }


**POST `/vault/regenerate`** – Reanalyze with language switch

Request: { "id": "VLT-...", "language": "hi" }
Response: { "summary": "...", "risks": "...", "timeline": "...", "archive_id": "..." }


**POST `/interrogate`** – Query current document

Request: { "query": "What's the deadline?", "language": "as" }
Response: { "response": "<AI-generated answer>" }


---

## 🔐 Privacy & Security

✅ **Local Processing**
- OCR extraction: on-device
- AI inference: on-device
- Vault storage: on-device

⚠️ **External Communication**
- Translation queries only (text-only, cached to minimize requests)
- No document content transmitted

🔄 **Data Lifecycle**
- Current session: In-memory storage
- Post-restart: Automatic data clearance
- Production: Optional database persistence

---

## 📁 Project Structure

LegalFortress/
├── backend/ (FastAPI + OCR + Ollama integration)
├── frontend/ (Next.js dashboard + chat interface)
├── .gitignore
└── README.md


---

## 🛠️ Technology Stack

**Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS  
**Backend**: FastAPI, Pydantic, Ollama integration  
**Data Processing**: Tesseract OCR, pdfplumber, MyMemoryTranslator  
**Infrastructure**: In-memory caching, async architecture  

---

## 🚢 Deployment Options

**Development**: Local machine (all services)  
**MVP**: Vercel (frontend) + Railway/Render (backend)  
**Production**: VPS + Docker + PostgreSQL + GPU-accelerated Ollama  

---

## 📄 License

MIT License – Unrestricted use, modification, and distribution permitted.

---

## 🔗 Repository

[GitHub: sshyamolika14/LEGAL-FORTRESS](https://github.com/sshyamolika14/LEGAL-FORTRESS)

Questions or contributions? Open an issue or submit a pull request.

---

<div align="center">

**Built with precision for legal accessibility** 🏛️

</div>
