# 🚀 LLMForge

> An AI Workspace for Local LLMs featuring DSPy Prompt Optimization, RAG, Knowledge Retrieval, Streaming Chat, and Multi-Model Routing.

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black)
![Ollama](https://img.shields.io/badge/Ollama-Local%20LLMs-green)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector%20Store-purple)
![DSPy](https://img.shields.io/badge/DSPy-Prompt%20Optimization-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📖 Overview

LLMForge is a modern AI workspace that allows users to interact with local Large Language Models while augmenting responses using Retrieval-Augmented Generation (RAG), DSPy prompt optimization, semantic document search, and an intuitive chat interface.

Unlike traditional chatbots, LLMForge combines local inference, document intelligence, and prompt optimization into one seamless experience.

---

# ✨ Features

## 🤖 AI Chat

- Streaming responses
- Markdown rendering
- Syntax highlighted code blocks
- Copy message & code support
- Stop generation
- Multi-turn conversation

---

## 🧠 DSPy Prompt Optimization

Automatically optimizes technical prompts before sending them to the language model.

Supports prompts involving:

- Python
- Java
- JavaScript
- TypeScript
- React
- Next.js
- HTML/CSS
- SQL
- Algorithms
- Debugging
- Software Engineering

---

## 📚 Retrieval-Augmented Generation (RAG)

Upload documents and chat with them using semantic search.

Current capabilities include:

- PDF parsing
- Automatic chunking
- SentenceTransformer embeddings
- ChromaDB vector storage
- Semantic retrieval
- Context injection into prompts

---

## 📄 Document Support

- PDF Upload
- Automatic Text Extraction
- Vector Indexing
- Semantic Search
- Multi-turn document conversations

---

## ⚡ Local LLM Support

Powered entirely by Ollama.

Supports models such as:

- Llama 3.1
- Gemma 3
- Mistral
- DeepSeek
- Any Ollama-compatible model

---

## 🔀 Intelligent Model Routing

Automatically selects the best model depending on the prompt.

Examples:

- Coding → Llama
- General Chat → Gemma
- Custom routing supported

---

## ⚙️ Adjustable Generation Settings

Real-time controls for:

- Temperature
- Top-P
- Context Window

---

## 💬 Chat Experience

- Persistent sessions
- Chat history
- Rename conversations
- Delete chats
- Pin important chats
- Streaming UI

---

# 🏗️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Markdown
- Lucide Icons

### Backend

- FastAPI
- Python
- Ollama API
- DSPy

### AI & Retrieval

- Sentence Transformers
- ChromaDB
- PyPDF
- Semantic Search

---

# 📂 Project Structure

```
apps/

├── api/
│   ├── app/
│   │   ├── chat/
│   │   ├── rag/
│   │   ├── services/
│   │   ├── storage/
│   │   ├── utils/
│   │   └── main.py
│
└── web/
    ├── app/
    ├── components/
    ├── hooks/
    ├── services/
    ├── public/
    └── styles/
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

source .venv/bin/activate
# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd apps/web

npm install

npm run dev
```

---

## Ollama

Install Ollama and pull your preferred models.

Example:

```bash
ollama pull llama3.1:8b

ollama pull gemma3:1b
```

---

# 📸 Screenshots

Coming soon..

---

# 🛣️ Roadmap

### ✅ Completed

- Streaming Chat
- Markdown Rendering
- Syntax Highlighting
- DSPy Prompt Optimization
- Multi-Model Routing
- PDF Upload
- PDF Parsing
- ChromaDB Integration
- Semantic Retrieval
- RAG Pipeline
- Session Persistence

### 🚧 In Progress

- Knowledge Bases
- Source Citations
- Multi-document Search
- Agent Framework
- Workspace Management
- Antigravity UI Enhancements

### 🔮 Planned

- Web Search
- Voice Chat
- Image Understanding
- Multi-Agent Workflows
- Plugin System
- Team Collaboration
- Cloud Sync
- Model Benchmark Dashboard

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Srijan Akshit**

GitHub:
https://github.com/akshitsrijan001

LinkedIn:
https://www.linkedin.com/in/srijan-akshit-3b6397374/

---

⭐ If you found this project useful, consider giving it a star!
