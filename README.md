# ResuNova 🚀
### The Precision AI Interview Architect

**ResuNova** is a premium, AI-powered interview preparation platform built to transform how candidates prepare for high-stakes technical and behavioral interviews. By leveraging **Google Gemini 1.5 Flash**, ResuNova performs an "agentic analysis" of your resume against specific job descriptions to provide a hyper-tailored success strategy.

---

## 🌟 Key Pillars

### 1. Agentic Analysis 🧠
Unlike generic tools, ResuNova doesn't just look for keywords. It decodes the *intent* behind job descriptions and matches it with your *experience density*. It identifies exactly where you shine and where you have bridgeable skill gaps.

### 2. High-Fidelity HUD (UI/UX) 🎨
The interface is engineered with a **Glassmorphism** aesthetic, featuring:
- Physics-based motion transitions.
- Liquid-reactive backgrounds.
- High-contrast, accessibility-first typography (Outfit & Inter).
- Immersive HUD-style dashboard.

### 3. Strategic Matching 🎯
An automated scoring engine that calculates your "Alignment Index." It provides a data-backed confidence score before you ever step into the interview room.

---

## ✨ Core Features

- **🚀 Resume Intelligence**: Instant parsing of PDF/DOCX resumes to extract tech stacks and impact metrics.
- **🛠️ Technical Blueprint**: Curated technical questions generated specifically for the job's required stack (e.g., React, Node, System Design).
- **🎭 Behavioral Framework**: Situation-based questions (STAR method ready) that highlight leadership and ownership.
- **📅 7-Day Readiness Pathway**: A day-by-day study roadmap that ensures maximum knowledge retention.
- **📊 Skill Gap Mapping**: Visual identification of missing competencies with severity color-coding (High/Mid/Low).
- **📄 Programmatic Resume Generation**: (Upcoming) One-click PDF resume reconstruction tailored to the specific role.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Framer Motion, Lucide-React, SCSS (Glassmorphism) |
| **Backend** | Node.js, Express.js (v5), Multer, PDF-Parse |
| **AI Intelligence** | Google GenAI (Gemini 1.5 Flash), Zod (Strict Schema Logic) |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Authentication** | JWT, HTTP-Only Cookies, Bcryptjs |

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/vanshDalal521/ResuNova.git
cd ResuNova
```

### 2. Backend Configuration
- **Path**: `cd Backend`
- **Install**: `npm install`
- **Environment**: Create a `.env` file:
  ```env
  MONGO_URI=your_mongodb_atlas_uri
  JWT_SECRET=your_jwt_signing_key
  GOOGLE_GENAI_API_KEY=your_gemini_api_key
  FRONTEND_URL=http://localhost:5175
  NODE_ENV=development
  ```
- **Run**: `npm run dev`

### 3. Frontend Configuration
- **Path**: `cd Frontend`
- **Install**: `npm install`
- **Environment**: Create a `.env` file:
  ```env
  VITE_API_BASE_URL=http://localhost:3000
  ```
- **Run**: `npm run dev -- --port 5175`

---

## 📂 Project Architecture

```
ResuNova/
├── Backend/                 # Express API & Engine
│   ├── src/
│   │   ├── controllers/    # Route controllers (Auth, Interview)
│   │   ├── models/         # MongoDB Schemas
│   │   ├── routes/         # API Endpoint definitions
│   │   ├── services/       # AI logic & GenAI Orchestration
│   │   └── middlewares/    # Auth, Error, & File handling
│   └── server.js           # Server initialization
├── Frontend/                # React HUD
│   ├── src/
│   │   ├── features/       # Modular features (Profile, Reports)
│   │   ├── style/          # Design System & SCSS Tokens
│   │   ├── components/     # High-reuse UI components
│   │   └── main.jsx        # App entry and Routing
│   └── index.html          # Metadata & Title
└── README.md                # Detailed Documentation
```

---

## 🤝 The Team
- **Vansh Dalal**: Backend Architecture & AI Core Engineering.
- **Ayush Kumar**: Frontend Lead & Design System Architect.

---

## 🛡️ License
Distributed under the **ISC License**. See `package.json` for details.

---
**ResuNova** — *Architecting your career path with AI precision.*
