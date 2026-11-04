<div align="center">

# 🚀 InterviewPilot
### Multilingual AI Placement Readiness Copilot & Real-Time Mock Interview Simulator
#### *Powered by Gnani.ai Voice Models (Prisma ASR & Timbre TTS)*

[![Gnani.ai Powered](https://img.shields.io/badge/AI_Voice-Gnani.ai_Prisma_%26_Timbre-7c3aed?style=for-the-badge&logo=soundcharts&logoColor=white)](https://gnani.ai)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk Auth](https://img.shields.io/badge/Auth-Clerk_Production-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-Supabase_PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

**Powered by Gnani.ai Foundation Voice Models (Prisma ASR & Timbre TTS)**

[🌐 Live Demo](https://interview-pilot-delta-sage.vercel.app) • [📖 Architecture](#-system-architecture) • [✨ Key Features](#-key-features) • [🛠️ Tech Stack](#-tech-stack) • [🚀 Quick Start](#-local-development-setup)

</div>

---

## 📌 Problem Statement

Engineering graduates and college students face significant hurdles transitioning from classroom theory to hiring floors:
1. **Resume Disconnect**: Students list buzzwords without understanding real-world architectural implications, leading to instant rejections when probed by senior engineers.
2. **High-Stakes Mock Interview Scarcity**: Human mock interviews with experienced tech recruiters cost hundreds of dollars, lack consistent rubrics, and provide subjective, non-actionable feedback.
3. **No Unified Placement Readiness Metric**: Students submit applications blindly with no quantifiable data on whether their codebases, ATS resume formatting, DSA capabilities, and behavioral communication meet industry hiring benchmarks.

**InterviewPilot** bridges this gap as an end-to-end autonomous Placement Readiness Copilot. It ingests student resumes, evaluates full-stack profiles across 7 dimensions, conducts live spoken multi-stage adaptive technical interviews with anti-cheat vision proctoring, executes live code, and generates instant actionable diagnostic feedback.

---

## ✨ Key Features

### 1. 📄 Multi-Format Resume Intelligence & Auto-Extraction
- **Zero-Friction Upload**: Accepts both `.pdf` and `.docx` (Microsoft Word) resumes up to 5 MB with drag-and-drop support.
- **In-Memory Streaming Parsers**: Parses documents securely in-memory using `pdfjs-dist` and `mammoth` without saving unprotected files to disk.
- **AI-Powered Data Extractor**: Automatically structures unstructured resume text into:
  - **Technical Skills Cloud**: Languages, frameworks, databases, cloud, and DevOps tags.
  - **Highlighted Projects & Architecture**: Problem summaries, system architectures, tech stacks, and repo/live links.
  - **Achievements & Certifications**: Hackathon wins, cloud certifications (AWS/GCP), and competitive rankings.
  - **Profile Links**: Auto-extracts and verifies candidate GitHub, LeetCode, and LinkedIn handles.

### 2. 🎙️ Accent-Aware Indic Voice Engine (Powered by Gnani.ai)
- **Gnani.ai Prisma ASR Integration**:
  - Purpose-built for Indian engineering students: effortlessly handles regional English accents, cadences, and Hinglish technical terminology without dropping technical vocabulary.
  - Sub-100ms ultra-low transcription latency.
- **Gnani.ai Timbre TTS Synthesis**:
  - High-fidelity Indic conversational voices (`Nalini`, `Arun`) delivering natural human-like cadence, pauses, and interview question pacing.
  - Server-side LRU audio caching with immutable headers for instant playback.
- **4-Stage Dynamic Interview Pipeline**:
  1. **Stage 1 — Introduction & Background**: Icebreaker exploring background and target specialization.
  2. **Stage 2 — Technical Architecture & Resume Probing**: Dynamically generates challenging deep-dive questions based on the candidate's exact resume projects and claimed libraries.
  3. **Stage 3 — Live Coding & Algorithmic Problem Solving**: In-browser Monaco code editor with live test-case validation across C++, Java, Python, JavaScript, TypeScript, and Go.
  4. **Stage 4 — Behavioral & Situational**: Structured scenario questions evaluating teamwork, ownership, and conflict resolution using the STAR method.
- **Fail-Safe Triple-Tier Fallback**:
  - Primary: **Gnani.ai Prisma & Timbre**
  - Secondary Cloud Fallback: Groq Whisper & OpenAI TTS
  - Edge Local Fallback: Browser Native Web Speech API ($0 cost, 0ms latency) ensuring zero interruption during interviews.

### 3. 👁️ TensorFlow.js Anti-Cheat & Vision Proctoring
- **Client-Side Computer Vision**: Uses `@tensorflow/tfjs` and the lightweight `BlazeFace` model running 100% on the client's GPU.
- **Continuous Integrity Tracking**:
  - Flags candidate absence / out-of-frame occurrences.
  - Detects multiple faces in the camera viewport.
  - Monitors and logs unauthorized browser tab switching during coding rounds.
- **Integrity Log**: Transparently recorded in candidate reports and the administrative dashboard.

### 4. 📊 7-Dimensional Placement Readiness Scoring Engine
Calculates a holistic readiness score (0–100) mapped to placement tiers:
* 🔴 **Not Ready** (0–49) • 🟡 **Almost Ready** (50–74) • 🟢 **Placement Ready** (75–100)

$$\text{Readiness Score} = 0.25(R) + 0.25(P) + 0.20(I) + 0.10(G) + 0.10(L) + 0.05(K) + 0.05(A)$$

| Component | Weight | Metric Evaluated |
| :--- | :---: | :--- |
| **Resume (R)** | **25%** | ATS readability, action verbs, quantified metrics, clarity |
| **Projects (P)** | **25%** | Production deployment, system complexity, modularity |
| **Interview (I)** | **20%** | Technical knowledge, algorithmic problem solving, verbal clarity |
| **GitHub (G)** | **10%** | Commit consistency, repository documentation, repo cleaniness |
| **LeetCode (L)** | **10%** | Solved problem counts, algorithmic breadth, contest rating |
| **LinkedIn (K)** | **5%** | Profile completeness, headline, about summary |
| **Achievements (A)** | **5%** | Hackathons, competitive milestones, industry certifications |

### 5. 📝 Comprehensive Candidate Diagnostic Report
- **Granular Skill Radar**: 5-axis scoring (Technical Knowledge, Problem Solving, Communication, Code Optimization, Modularity).
- **Graceful Early-Exit Handling**: Candidates who leave during early stages receive an *Incomplete Session* report rather than demoralizing false zeroes.
- **Detailed Transcripts with Timestamps**: Line-by-line review showing the AI's question, candidate's spoken transcript, model answers, and constructive critique.
- **Personalized Action Roadmap**: Top 5 highest-ROI fixes to boost readiness score before real campus placement drives.

### 6. 💼 Placement & Opportunity Matcher
- Direct job portal connecting candidates to targeted internship and full-time engineering openings.
- Filters openings based on required skills and candidate readiness score thresholds.
- Application pipeline tracking: *Saved* $\rightarrow$ *Applied* $\rightarrow$ *Shortlisted* $\rightarrow$ *Interview* $\rightarrow$ *Offer*.

### 7. 🛡️ Institutional & Placement Cell Administration Suite
- **Student Roster & Cohort Analytics**: Real-time overview of college placement readiness across departments.
- **Custom Question Bank**: Create and organize questions with starter templates, test cases, and expected rubrics.
- **Custom Role Studio**: Configure dynamic interviewers (e.g. *Startup Pragmatist*, *Enterprise Architect*, *FAANG Bar Raiser*).
- **Proctoring Logs**: Review cheater warnings, tab switches, and integrity violations.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client["Frontend Client (Next.js 16 + React 19)"]
        A[Candidate / Student] -->|Uploads PDF/DOCX| B[Resume Intake & Dropzone]
        A -->|Microphone Audio / Video| C[Interactive Interview Lobby]
        C --> D[Monaco Code Editor + Compiler]
        C --> E[TensorFlow.js BlazeFace Proctor]
        C --> F[Hybrid STT: Cloud + Web Speech]
    end

    subgraph EdgeMiddleware["Edge Proxy & Auth (Vercel)"]
        B & C --> G[Next.js 16 Proxy Router]
        G <--> H[Clerk Production Auth + Google OAuth 2.0]
    end

    subgraph BackendAPI["Next.js Route Handlers (Serverless / Render)"]
        G --> I[Resume Parser: pdfjs-dist + mammoth]
        I --> J[AI Resume Extractor]
        G --> K[Interview Session Engine]
        K --> L[Multi-LLM Router: Groq / DeepSeek / OpenRouter]
        K --> GN_STT["🎙️ Gnani.ai Prisma ASR v2.5 (STT)"]
        K --> GN_TTS["🔊 Gnani.ai Timbre v2.5 (TTS)"]
        G --> M[Code Runner: JDoodle / Judge0 API]
        G --> N[Diagnostic Report Generator]
    end

    subgraph DataStore["Persistence Layer"]
        H & BackendAPI <--> O[(Supabase PostgreSQL + Prisma ORM)]
    end

    subgraph Output["Candidate Delivery"]
        N --> P[Placement Readiness Scorecard & Report]
        P --> Q[Targeted Campus Job Opportunities]
    end
```

---

## 🔄 Interview Pipeline Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor Candidate
    participant Lobby as Interview Lobby
    participant Camera as TensorFlow.js BlazeFace
    participant Voice as Hybrid STT / TTS
    participant AI as AI Recruiter (Groq / DeepSeek)
    participant IDE as Monaco Editor + Judge0
    participant Report as Evaluation Engine

    Candidate->>Lobby: Select Role & Language (e.g. Full Stack Developer)
    Lobby->>Camera: Initialize Face & Tab Monitor
    Lobby->>Voice: Unlock Browser Speech Engine

    rect rgb(24, 24, 27)
        Note over Candidate,AI: Stage 1: Introduction & Background
        AI->>Voice: Spoken icebreaker question
        Voice->>Candidate: Plays synthesized audio
        Candidate->>Voice: Spoken response
        Voice->>AI: Transcribed speech
    end

    rect rgb(24, 24, 27)
        Note over Candidate,AI: Stage 2: Resume Deep-Dive & Architecture
        AI->>AI: Probe candidate's uploaded projects & claimed skills
        AI->>Voice: Asks architectural trade-off question
        Candidate->>Voice: Explains tech stack & database decisions
    end

    rect rgb(24, 24, 27)
        Note over Candidate,IDE: Stage 3: Live Coding & Algorithm Execution
        AI->>IDE: Generates DSA problem & test cases
        Candidate->>IDE: Types code (Python, JS, C++, Java, Go)
        Candidate->>IDE: Clicks 'Run Code'
        IDE->>IDE: Executes test suites & displays stdout/stderr
    end

    rect rgb(24, 24, 27)
        Note over Candidate,AI: Stage 4: Behavioral & STAR Methodology
        AI->>Voice: Posits situational leadership / conflict question
        Candidate->>Voice: Explains response
    end

    Candidate->>Report: End Interview / Submit
    Report->>Report: Evaluates 5 dimensions & proctoring flags
    Report->>Candidate: Delivers Diagnostic Placement Report & Score
```

---

## 🛠️ Tech Stack

| Domain | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16.2.10 (Turbopack)** | React Server Components, App Router, Edge Middleware (`proxy.ts`) |
| **Frontend UI** | **React 19.2.4 + TailwindCSS v4** | Modern, responsive, glassmorphic dark-mode user interface |
| **Component Kit** | **Shadcn UI + Radix UI + Lucide Icons** | Accessible UI primitives, dialogs, badges, and icon system |
| **Authentication** | **Clerk Authentication (Production)** | Secure Google OAuth 2.0 via Google Cloud Platform + email auth |
| **Database** | **PostgreSQL (Supabase)** | Relational storage with connection pooling and SSL encryption |
| **ORM** | **Prisma ORM 6.19.3** | Type-safe schema models, relations, migrations, and queries |
| **AI Inference** | **Groq + DeepSeek + OpenRouter** | Ultra-low latency Llama-3/Qwen LLMs with multi-provider failover |
| **Document Parsers** | **`pdfjs-dist` + `mammoth`** | Safe in-memory parsing of `.pdf` and `.docx` resumes |
| **Speech Engine** | **Web Speech API + Cloud Whisper** | Real-time dual-mode speech synthesis (TTS) & transcription (STT) |
| **Anti-Cheat Vision** | **TensorFlow.js + BlazeFace** | In-browser client-side face presence and multi-face detection |
| **Code Execution** | **Monaco Editor + JDoodle / Judge0** | In-browser code editing and multi-language compilation sandboxes |
| **Hosting & CI/CD** | **Vercel** | Global edge network with automatic preview and production deployments |

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (v10+), `pnpm`, or `yarn`
- **Git**

### 2. Clone Repository
```bash
git clone https://github.com/KeerthiKumarR/Interview_Pilot.git
cd Interview_Pilot
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` (or `.env.local`) file in the project root:

```env
# ─── Gnani.ai Voice Engine (Prisma ASR & Timbre TTS) ───
GNANI_API_KEY=your_gnani_api_key
GNANI_PRISMA_MODEL=prisma-v2.5
GNANI_TIMBRE_MODEL=timbre-v2.5

# ─── LLM Reasoning Engine (OpenAI-Compatible) ───
DEFAULT_AI_PROVIDER=ai
AI_API_KEY=your_ai_api_key
AI_API_URL=https://api.groq.com/openai/v1
AI_MODEL=qwen/qwen3.8-27b

# ─── Clerk Authentication ───
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/dashboard

# ─── Database (PostgreSQL / Supabase) ───
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"

# ─── Code Execution Compiler (Optional) ───
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_judge0_key
```

### 5. Initialize Database
Generate Prisma client artifacts and synchronize schema models:
```bash
npx prisma generate
npx prisma db push
```

### 6. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start exploring InterviewPilot.

---

## 🧪 Testing & Production Build

Verify TypeScript compliance and build an optimized production bundle:

```bash
# Type check and production build
npm run build

# Start local production server
npm run start
```

---

## 👤 Author

Developed with passion by **Keerthi Kumar**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
<sub>Crafted with ❤️ by Keerthi Kumar • Empowering the next generation of software engineers.</sub>
</div>
