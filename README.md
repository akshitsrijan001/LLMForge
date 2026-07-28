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



- Dashboard
<img width="946" height="443" alt="image" src="https://github.com/user-attachments/assets/e8875296-0c69-4f3d-bdfa-cc0813793150" />
<img width="943" height="262" alt="image" src="https://github.com/user-attachments/assets/183e7c74-634c-4eb0-b17d-ab668a3455b4" />


- Chat Workspace
<img width="938" height="440" alt="image" src="https://github.com/user-attachments/assets/356ca463-1f8f-4c2d-9a6b-8e93b01969e9" />

- Knowledge Base
  <img width="944" height="429" alt="image" src="https://github.com/user-attachments/assets/3ca1dd39-1be3-4f50-94b3-9d54bfe2df10" />

- Models
  <img width="945" height="345" alt="image" src="https://github.com/user-attachments/assets/398c2a7b-8f29-48d1-9e23-11ef72750c9a" />

- Settings
  <img width="950" height="434" alt="image" src="https://github.com/user-attachments/assets/516cdd87-00b1-405d-8f0c-904121632c5f" />

- Playground
  <img width="329" height="289" alt="image" src="https://github.com/user-attachments/assets/e87b12ba-18b0-4464-a3d6-89e25166e7ee" />

- Guide
  <img width="946" height="401" alt="image" src="https://github.com/user-attachments/assets/b3b51bd0-b2d9-4a88-bacd-76f85dfdccea" />


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
