# 🎌 Tenjin AI – Japanese Learning Platform

Tenjin AI is an intelligent, interactive Japanese learning companion featuring dynamic assessments, streak tracking, and conversational AI tutoring.

## 🚀 Key Features

* **Structured Learning**: Four distinct levels ranging from basic alphabets to common sentences.


* **Static Assessment Engine**: A high-performance quiz system pulling from a 160-question static database.


* **Gamified Dashboard**: Real-time streak tracking and random Tenjin avatar animations (dance, happy, thinking).


* **Persistent Profile**: Local storage integration to save test history, user data, and overall accuracy.



## 🛠️ Project Structure & Syntax Notation

The project follows a component-based architecture for modularity.

### 1. Assessment Syntax

The engine uses a standard JSON schema for all quiz data stored in `js/data/quiz_bank.js`:

```json
{
  "question": "String", 
  "options": ["String", "String", "String", "String"], 
  "correct_index": Integer (0-3), 
  "explanation": "String"
}

```

### 2. Core Functions

* **`gen_assessment(levelKey, container)`**: Initializes a 10-question randomized test for a specific level.


* **`full_quiz(container)`**: Pulls 5 questions from each of the 4 levels for a comprehensive 20-question challenge.


* **`TenjinDashboardView.updateStreak()`**: Automatically calculates and persists user streaks based on `localStorage` dates.



## 📦 Setup Instructions

1. **Repository Initialization**:
```bash
git init
git add .
git commit -m "Initial commit: Tenjin AI Learning Platform"

```



```

2.  **Running the Backend**:
    Execute `python server.py` to start the local Flask server[cite: 1].

3.  **Launching the Application**:
    Open your browser and navigate to `http://localhost:5000`[cite: 1]. 
    *Warning: Accessing via `file:///` will block microphone input and security features[cite: 1].*

---

*Tenjin AI - Built for high-performance, local-first learning[cite: 1].*

```
