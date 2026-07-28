# 🚀 LLMForge

> A modern AI workspace for running, managing, and augmenting local Large Language Models with Retrieval-Augmented Generation (RAG).

LLMForge is a full-stack AI workspace that provides a clean, developer-focused interface for interacting with local LLMs powered by Ollama. It combines multi-model chat, Retrieval-Augmented Generation (RAG), project indexing, and knowledge base management into a single modern platform inspired by ChatGPT while remaining fully local and privacy-friendly.

---

# ✨ Features

## 💬 AI Chat Workspace

- Chat with local LLMs through Ollama
- Clean ChatGPT-inspired interface
- Streaming responses
- Session-based conversations
- Responsive workspace

---

## 🧠 Knowledge Base (RAG)

- Create multiple knowledge bases
- Index local projects into ChromaDB
- Semantic document retrieval
- Context-aware AI responses
- Project folder indexing

---

## 🤖 Model Management

- View installed Ollama models
- Model metadata dashboard
- One-click model selection
- Local inference configuration

---

## ⚙️ Workspace Settings

Configure your local AI environment including:

- Ollama server configuration
- Embedding model selection
- ChromaDB storage path
- Inference defaults
- Workspace preferences

---

## 📖 Interactive Guide

- Built-in onboarding guide
- Quick start instructions
- Workspace navigation
- Configuration help

---

## 🎨 Modern UI

- Premium black & orange theme
- Glassmorphism-inspired interface
- Responsive layouts
- Dashboard analytics
- Smooth animations with Framer Motion

---

# 🏗️ Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend

- FastAPI
- Ollama
- ChromaDB
- Sentence Transformers

## AI

- Local LLMs
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Embeddings

---

# 📁 Project Structure

```text
LLMForge
│
├── apps
│   ├── api
│   │   ├── routes
│   │   ├── services
│   │   └── models
│   │
│   └── web
│       ├── app
│       ├── components
│       ├── hooks
│       ├── services
│       └── lib
│
├── uploads
├── knowledge_bases
├── vector_db
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/akshitsrijan001/LLMForge.git

cd LLMForge
```

---

## Backend Setup

```bash
cd apps/api

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd apps/web

npm install

npm run dev
```

Frontend

```
http://localhost:3000
```

---

# 🧠 Architecture

```text
                User
                  │
                  ▼
        Next.js Frontend
                  │
                  ▼
           FastAPI Backend
                  │
      ┌───────────┼───────────┐
      ▼           ▼           ▼
   Ollama      ChromaDB    Knowledge Base
      │           │
      └──────┬────┘
             ▼
     Streaming Response
```

---

# 📸 Screenshots

Screenshots will be added soon.

Planned previews:

- Dashboard
- AI Chat
- Knowledge Base
- Models
- Settings
- Guide

---

# 🎯 Roadmap

## ✅ Completed

- Local LLM Support
- Multi-model Workspace
- RAG Knowledge Bases
- Project Indexing
- Model Management
- Workspace Settings
- Responsive UI

## 🚧 Planned

- Agent Workflows
- Pipeline Builder
- Prompt Templates
- Telemetry Dashboard
- Plugin Support
- MCP Integration
- Voice Interface

---

# 🤝 Contributing

Contributions, ideas, and feature requests are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

# 📄 License

MIT License

---

# 👨‍💻 Author

**Srijan Akshit**

GitHub: https://github.com/akshitsrijan001

---

## ⭐ If you like LLMForge, consider giving the repository a star!
