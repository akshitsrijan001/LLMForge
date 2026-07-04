# 🚀 LLMForge

> An extensible AI workspace for local LLMs, Retrieval-Augmented Generation (RAG), prompt engineering, and AI agent development.

---

## ✨ Overview

LLMForge is a modern AI development environment designed to simplify building applications with Large Language Models. It combines local model management, knowledge bases, playground experimentation, and configurable AI settings into a single workspace.

The project emphasizes modularity, developer experience, and offline-first workflows while integrating seamlessly with local inference engines such as Ollama.

---

# 🌟 Current Features

## 💬 AI Chat Workspace

- Multi-session conversations
- Conversation history
- Markdown rendering
- Syntax highlighted code blocks
- File attachments
- Message persistence
- Streaming-ready architecture

---

## ⚙️ Settings Workspace

Manage your AI environment through an interactive settings interface.

### Core Infrastructure

- Ollama Instance URL
- Embedding Model Selection
- ChromaDB Storage Path

### Configuration

- React Context powered settings
- LocalStorage persistence
- Automatic settings restoration
- Responsive dashboard layout

---

## 🧠 Local AI Integration

Designed to support:

- Ollama
- Local LLMs
- Embedding Models
- ChromaDB
- FastAPI Backend

---

## 🏗️ Architecture

Frontend

- Next.js 16
- React 19
- Tailwind CSS
- TypeScript

Backend

- FastAPI
- Python

AI Stack

- Ollama
- ChromaDB
- DSPy (planned)

---

# 📂 Project Structure

```
apps/
 ├── web/
 │   ├── app/
 │   ├── components/
 │   ├── hooks/
 │   ├── services/
 │   └── types/
 │
 └── backend/
      ├── api/
      ├── rag/
      ├── services/
      └── models/
```

---

# 🚧 Roadmap

## Completed

- ✅ Modern chat interface
- ✅ Workspace routing
- ✅ Session management
- ✅ Settings workspace
- ✅ React Settings Context
- ✅ Persistent configuration
- ✅ Responsive UI foundation

---

## In Progress

- 🔄 Inference Configuration
- 🔄 Interface Preferences
- 🔄 Ollama Connection Testing

---

## Planned

- 📄 Knowledge Base Management
- 🌐 Website Ingestion
- 📁 Folder Upload
- 📚 PDF Processing
- 🧠 Embedding Generation
- 🗂️ ChromaDB Integration
- 🔍 Semantic Search
- 🤖 Agent Builder
- 🧪 Playground
- 📊 Model Benchmarking
- ⚡ DSPy Optimization
- 🔌 Plugin System

---

# 🛠️ Running

## Frontend

```bash
cd apps/web
npm install
npm run dev
```

## Backend

```bash
cd backend
uvicorn app.main:app --reload
```

---

# 🎯 Vision

LLMForge aims to become an all-in-one local AI development platform where developers can:

- Build AI applications
- Manage multiple LLMs
- Create RAG pipelines
- Test prompts
- Benchmark models
- Develop intelligent agents

within one unified workspace.

---

## 📜 License

MIT License
