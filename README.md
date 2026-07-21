# 🚀 LLMForge

> Build, compare, and enhance AI conversations with local LLMs, web search, and knowledge bases.

LLMForge is an AI workspace that combines local Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), web search, and document-based knowledge retrieval into a single modern interface.

Designed with a ChatGPT/Gemini-inspired experience, LLMForge enables users to chat with multiple models, upload documents, search the web, and build custom knowledge bases.

---

## ✨ Features

### 🤖 Multi-Model Chat
- Support for local Ollama models
- Easily switch between different LLMs
- Streaming responses

### 🌐 Intelligent Web Search
- Live web search integration
- Intent-aware query routing
- Trusted source prioritization
- Rich search context

### 📚 Knowledge Bases (RAG)
- Upload PDFs, TXT, and Markdown files
- Semantic search using ChromaDB
- Context-aware document retrieval
- Multiple knowledge bases

### 💬 Modern AI Workspace
- ChatGPT/Gemini-inspired interface
- Conversation history
- Session management
- Responsive UI

### ⚡ Developer Friendly
- FastAPI backend
- Next.js frontend
- Modular architecture
- Easily extendable

---

# 🏗️ Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend
- FastAPI
- Ollama
- ChromaDB
- Sentence Transformers

## AI
- Local LLMs (Ollama)
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Prompt Engineering

---

# 📁 Project Structure

```
LLMForge/
│
├── apps/
│   ├── api/          # FastAPI backend
│   └── web/          # Next.js frontend
│
├── knowledge_bases/
├── uploads/
├── vector_db/
└── README.md
```

---

# 🚀 Getting Started

## Clone

```bash
git clone https://github.com/akshitsrijan001/LLMForge.git
cd LLMForge
```

---

## Backend

```bash
cd apps/api

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

## Frontend

```bash
cd apps/web

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🧠 How It Works

```
User
      │
      ▼
Query Classifier
      │
      ├──────────────┐
      ▼              ▼
Web Search       Knowledge Base
      │              │
      └──────┬───────┘
             ▼
      Prompt Builder
             ▼
         Ollama LLM
             ▼
       Streaming Response
```

---

# 📸 Screenshots

> Add screenshots of:
- Workspace
- Chat Interface
- Knowledge Base
- Search Results

---

# 🎯 Roadmap

- [x] Local LLM Support
- [x] Multi-session Chat
- [x] Knowledge Base (RAG)
- [x] Web Search
- [x] Streaming Responses
- [x] Model Switching
- [ ] Rich Search Cards
- [ ] Image Search
- [ ] Citations
- [ ] Agent Workflow
- [ ] Voice Interaction

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📄 License

MIT License

---

# 👨‍💻 Author

**Srijan Akshit**

- GitHub: https://github.com/akshitsrijan001

---

## ⭐ If you found this project useful, consider giving it a star!
