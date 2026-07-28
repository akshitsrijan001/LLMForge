# 🚀 LLMForge

> A modern AI workspace for running local Large Language Models with Retrieval-Augmented Generation (RAG), knowledge management, and a premium developer experience.

LLMForge is an AI development workspace built with **Next.js**, **FastAPI**, **Ollama**, and **ChromaDB**. It enables developers to chat with local LLMs, manage knowledge bases, configure AI infrastructure, and build Retrieval-Augmented Generation (RAG) workflows through a clean, modern interface.

---

# ✨ Features

## 💬 AI Chat

- Multi-session chat interface
- Markdown & code rendering
- Streaming-ready architecture
- Conversation history
- Responsive UI

---

## 🧠 Knowledge Base

- Multiple Knowledge Bases
- Local project indexing
- ChromaDB vector storage
- Semantic document retrieval
- RAG-ready architecture

---

## 🤖 Model Management

- View installed Ollama models
- Model information dashboard
- Local model configuration

---

## ⚙️ Settings Workspace

Configure your local AI environment.

- Ollama Server URL
- Embedding Model
- ChromaDB Storage
- Inference Settings
- Persistent configuration
- LocalStorage support

---

## 📖 Workspace Guide

Built-in guide for:

- Workspace overview
- Setup instructions
- Navigation
- Getting started

---

## 🎨 UI

- Modern black & orange theme
- Glassmorphism-inspired design
- Responsive layout
- Smooth animations
- Dashboard analytics

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
- Python
- Ollama
- ChromaDB
- Sentence Transformers

---

# 📂 Project Structure

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
│       ├── types
│       └── public
│
├── uploads
├── vector_db
├── knowledge_bases
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

Backend:

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

Frontend:

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
      ┌────────┼─────────┐
      ▼        ▼         ▼
   Ollama   ChromaDB   Knowledge Base
      │        │
      └────┬───┘
           ▼
    AI Response
```

---

# 📸 Screenshots

Screenshots will be added in the next release.

Planned screenshots:

- Dashboard
- Chat Workspace
- Knowledge Base
- Models
- Settings
- Guide

---

# 🛣️ Roadmap

## ✅ Completed

- AI Chat Workspace
- Knowledge Base Management
- Project Indexing
- Model Management
- Settings Workspace
- Modern Dashboard
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

# 📄 License

MIT License

---

# 👨‍💻 Author

**Srijan Akshit**

GitHub: https://github.com/akshitsrijan001

---

⭐ If you found this project useful, consider starring the repository.
