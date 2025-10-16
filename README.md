# 🧠 MeTTa RAG Application

## 📘 Overview
This project is a **RAG (Retrieval-Augmented Generation)** application built using **MeTTa documents** as the knowledge base.  
It allows users to **ask any question related to MeTTa**, and the system provides **code-only answers** in the MeTTa language.

---

## ⚙️ How It Works
- Collected and processed all official **MeTTa documentation**  
- Used those documents as the **retrieval source** for a RAG pipeline  
- Integrated a **language model** that understands MeTTa syntax and semantics  
- When a user asks a question, the app:
  - Retrieves the most relevant MeTTa docs  
  - Generates a **code-only answer** without any explanation — just pure MeTTa code

---

## 💡 Example

**Question:**
```text
How to define a simple function in MeTTa?
```

**Answer:**
```text
(= (square $x) (* $x $x))
```
## 🧩 Features

🧠 RAG-based contextual MeTTa retrieval

💬 Understands MeTTa syntax and semantics

💻 Code-only responses (no explanations)

🌐 Full-stack setup (Backend + Frontend)

⚡ Fast, accurate, and interactive user interface

🔍 Efficient document search and retrieval pipeline

🧱 Easily extensible for new datasets or knowledge bases

## 🧰 Tech Stack

- Backend: Python, FastAPI, LangChain / RAG pipeline
- Frontend: React + Tailwind CSS
- Database: Pinecone 

## 🧑‍💻 Installation
🔹 Clone the Repository
git clone https://github.com/Jaikumar2406/Metta_Chatbot.git
cd Metta_Chatbot

🔹 Backend Setup
pip install -r requirements.txt
uvicorn main:app --reload

The backend will start running on
👉 http://127.0.0.1:8000

🔹 Frontend Setup
cd client
npm install
npm start

The frontend will start at
👉 http://localhost:3000

**💬 “Ask questions. Get pure MeTTa code.”**
